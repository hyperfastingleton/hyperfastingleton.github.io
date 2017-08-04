
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

    // unzip the google earth .kmz file to extract the .kml xml document
    await unzipAsync(source, 'extracted')

    // convert the kml to geojson
    let kml = await fs.readFile('extracted/doc.kml', 'utf8')
    let kmlDom = new xmldom.DOMParser().parseFromString(kml)
    let geojson = togeojson.kml(kmlDom)

    // count the total features
    console.log(`Processing ${geojson.features.length} features from ${source}`)
    
    // var students = [{name: 'Abby', score: 84},
    //             {name: 'Eddy', score: 58},
    //             {name: 'Teddy', score: 58},
    //             {name: 'Jack', score: 69}];

    // let q1 = _(students)
    //     .groupBy(s => s.score)
    //     .mapValues(g => g.length)
    //     .value()
    // console.log(q1)

    // let groups = _(geojson.features)
    //     .groupBy(f => f.geometry.type)
    //     .mapValues(g => g.length)
    //     .value()
    // console.log(groups)

    let features = _(geojson.features)

    // let cabinets = features.filter(f => f.properties.name.match(/^\w*HE\d?$/)).value() // match 'IGHE' or 'IGHE2'
    // await writeLayer('cabinets', cabinets)

    // match a single word starting IG for chambers and cabinets
    let chambers = features.filter(f => f.properties.name.match(/^IG\w*$/)).value()
    await writeLayer('chambers', chambers)

    // core routes have width=4
    let coreRoutes = features.filter(f => f.properties['stroke-width'] === 4).value()
    await writeLayer('coreroutes', coreRoutes)

    // core routes have width=4
    let spurRoutes = features.filter(f => f.properties['stroke-width'] === 2).value()
    await writeLayer('spurroutes', spurRoutes)

    // points that aren't chambers are addresses (properties)
    let addresses = features.filter(f => f.geometry.type === 'Point').difference(chambers).value()
    await writeLayer('addresses', addresses)

    console.log('Done!')
}


async function writeLayer(name, features) {
    let geojson = makeGeojsonDocument(features)
    validateGeojson(geojson)
    mkdirp('output')
    await fs.writeFile(`output/${name}.geo.json`, JSON.stringify(geojson), 'utf8')    
}

/// Given an array of features, make a geojson doc.
function makeGeojsonDocument(features) {

    let redactedFeatures = _(features).map(f => ({
        type: f.type,
        geometry: f.geometry,
        properties: { name: f.properties.Short_Name }, // b4rnName: f.properties.name
        //properties: f.properties, // uncomment to debug 
        })).value()
    
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
