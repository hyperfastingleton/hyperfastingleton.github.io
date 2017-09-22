
// makes the google earth file into a web-friendly geojson file
// assumes node v8 or higher. run with:
// node webify.js "Ingleton 5.2.kmz"

const _ = require('lodash')
const fs = require('mz/fs')
const unzip = require('unzip')
const mkdirp = require('mkdirp')
const xmldom = require('xmldom')
const togeojson = require('@mapbox/togeojson')
const geojsonvalidation = require('geojson-validation')

async function main() {

    let source = process.argv[2]

    // extract the version from the filename
    let version = /([\d\.]+)\.kmz$/.exec(source)[1]
    console.log(`Assuming version '${version}' of the map`)

    // unzip the google earth .kmz file to extract the .kml xml document
    await unzipAsync(source, 'extracted')

    // convert the kml to geojson
    let kml = await fs.readFile('extracted/doc.kml', 'utf8')
    let kmlDom = new xmldom.DOMParser().parseFromString(kml)
    let geojson = togeojson.kml(kmlDom)

    // count the total features
    console.log(`Processing ${geojson.features.length} features from ${source}`)
    
    let features = _(geojson.features)

    // match a single word starting IG for chambers/cabinets
    let chambers = features.filter(f => f.properties.name.match(/^IG\w*$/)).value()
    await writeLayer('chambers', version, chambers)

    // core routes have width=4
    let coreRoutes = features.filter(f => f.properties['stroke-width'] === 4).value()
    await writeLayer('coreroutes', version, coreRoutes)

    // spur routes have width=2
    let spurRoutes = features.filter(f => f.properties['stroke-width'] === 2).value()
    await writeLayer('spurroutes', version, spurRoutes)

    // points that aren't chambers/cabinets are addresses (properties)
    let addresses = features.filter(f => f.geometry.type === 'Point')
        .difference(chambers)
        .filter(f => f.properties.Short_Name) // remove any properties with no Short_Name
        .value()
    await writeLayer('addresses', version, addresses)
    console.log(`Wrote ${addresses.length} addresses.`)

    console.log('Done!')
}


async function writeLayer(name, version, features) {
    let geojson = makeGeojsonDocument(features)
    validateGeojson(geojson)
    mkdirp('output')
    await fs.writeFile(`output/${name}.v${version}.geo.json`, JSON.stringify(geojson), 'utf8')    
}

/// Given an array of features, make a geojson doc.
function makeGeojsonDocument(features) {

    let redactedFeatures = features.map(f => ({
        type: f.type,
        geometry: f.geometry,
        properties: {
            name: (f.properties.Short_Name || '').replace(/,\s*$/, "") // remove trailing comma
        },
        //properties: f.properties, // uncomment to debug 
        }))
    
    return { type: 'FeatureCollection', features: redactedFeatures }
}

function validateGeojson(o) {
    geojsonvalidation.valid(o, (valid, errors) => {
        if (!valid) {
            console.log(errors)
            throw 'Invalid geojson.'
        }    
    })
}

async function unzipAsync(input, output) {
    let s = fs
        .createReadStream(input)
        .pipe(unzip.Extract({ path: output }))

    return new Promise((resolve, reject) => {
        s.on('close', resolve)
        s.on('error', reject)
    })
}

main()
