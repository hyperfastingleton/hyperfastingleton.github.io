
// produces 'zone-labels.json' geojson file containing points for zone labels
// export the zones from mapbox dataset which gives you a features.geojson file used as the input.
// there's something up with the encoding, so copy and paste into a file called features-pasted.json

// assumes node v8 or higher. run with:
// node zone-labels.js

const fs = require('mz/fs')
const polylabel = require('polylabel')

async function main() {
        
    console.log('Go!')

    let zonesJson = await fs.readFile('features-pasted.json', 'utf8')
    let zones = JSON.parse(zonesJson)

    let labels = zones.features.map(f => {
        let polygon = f.geometry.coordinates
        let point = polylabel(polygon)
        console.log(point)
        return {
            type: 'Feature',
            properties: f.properties,
            geometry: {
                type: 'Point',
                coordinates: point
            }
        }
    })

    let output = {
        type: 'FeatureCollection',
        features: labels
    }

    console.log(output)
    fs.writeFile('zone-labels.json', JSON.stringify(output))

    console.log('Done!')
}

main()
