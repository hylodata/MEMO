mapboxgl.accessToken = 'pk.eyJ1IjoiZ2JieSIsImEiOiJjbDRnMnhpcWowOTZ0M2ltYmVidmFlYzUyIn0.YMvE-Zv6jfxhACw69xOvLQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/gbby/clhb7frzz021n01pa1scr6r2e',
    center: [8.134336, 8.867609],
    zoom: 6,
    preserveDrawingBuffer: true,
    projection: 'globe'
});

// Initialize Draw Control
const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
        polygon: true,
        line_string: true,
        point: true,
        trash: true
    }
});

// Map#addControl takes an optional second argument to set the position of the control.
// If no position is specified the control defaults to `top-right`. See the docs
// for more details: https://docs.mapbox.com/mapbox-gl-js/api/#map#addcontrol

map.addControl(draw, 'top-left');

map.addControl(new MapboxExportControl.MapboxExportControl({
    PageSize: MapboxExportControl.Size.A4,
    PageOrientation: MapboxExportControl.PageOrientation.Landscape,
    Format: MapboxExportControl.Format.PNG,
    DPI: MapboxExportControl.DPI[300],
    Crosshair: true,
    PrintableArea: true,
    Local: 'en',
    accessToken: mapboxgl.accessToken
}), 'top-left');

// Wait until the map has finished loading.
map.on('load', () => {

    // Load geojson data sources
    map.addSource('adm0', {
        'type': 'geojson',
        'data': './data/mapbox/adm0.geojson'
    });

    map.addSource('adm1', {
        'type': 'geojson',
        'data': './data/mapbox/adm1.geojson'
    });

    map.addSource('adm2', {
        'type': 'geojson',
        'data': './data/mapbox/adm2.geojson'
    });

    map.addSource('Nigeria_test', {
        'type': 'geojson',
        'data': './data/mapbox/nigeria_test.geojson'
    });

    map.addSource('Nigeria_migration', {
        'type': 'geojson',
        'data': './data/mapbox/Nigera_migration.geojson'
    });

    // ADD LAYERS

    // adm0
    map.addLayer({
        'id': 'adm0',
        'type': 'line',
        'source': 'adm0',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-color': '#336',
            'line-width': 2
        },
        filter: ["==", "admin0Name", "Nigeria"]
    });

    map.addLayer({
        'id': 'adm0_fill',
        'type': 'fill',
        'source': 'adm0', // reference the data source
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5
        },
        filter: ["==", "admin0Name", "Nigeria"]

    });    

    // adm1
    map.addLayer({
        'id': 'adm1',
        'type': 'line',
        'source': 'adm1',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-color': '#000',
            'line-width': 2
        },
        filter: ["==", "admin0Name", "Nigeria"]
    });

    map.addLayer({
        'id': 'adm1_fill',
        'type': 'fill',
        'source': 'adm1', // reference the data source
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': '#0080ff', // blue color fill
            'fill-opacity': 0.5
        },
        filter: ["==", "admin0Name", "Nigeria"]

    });

    // adm2
    map.addLayer({
        'id': 'adm2',
        'type': 'line',
        'source': 'adm2',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-color': '#000',
            'line-width': 2
        },
        filter: ["==", "admin0Name", "Nigeria"]
    });

    map.addLayer({
        'id': 'adm2_fill',
        'type': 'fill',
        'source': 'adm2', // reference the data source
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': '#25A063', // green color fill
            'fill-opacity': 0.5
        },
        filter: ["==", "admin0Name", "Nigeria"]
    });  

    // Net Migration 2000s
    // Hex string: ['#b35806','#f1a340','#fee0b6','#f7f7f7','#d8daeb','#998ec3','#542788']
    map.addLayer({
        'id': 'NM 2000',
        'type': 'fill',
        'source': 'Nigeria_test',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': {
                property: 'NetMigr200',
                stops: [
                    [-26131, '#b35806'],
                    [-570.33, '#f1a340'],
                    [0, '#fee0b6'],
                    [460.50, '#f7f7f7'],
                    [1476, '#d8daeb'],
                    [3866.50, '#998ec3'],
                    [262201, '#542788']
                ]
            },
            'fill-opacity': 0.95
        }
    });

    // Net Migration 2000s
    map.addLayer({
        'id': 'NM 2015',
        'type': 'fill',
        'source': 'Nigeria_test',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': {
                property: 'NetMigr2_1',
                stops: [
                    [-42434, '#b35806'],
                    [-2393.50, '#f1a340'],
                    [-499.33, '#fee0b6'],
                    [0, '#f7f7f7'],
                    [367.33, '#d8daeb'],
                    [1409.67, '#998ec3'],
                    [216667, '#542788']
                ]
            },
            'fill-opacity': 0.95
        }
    });

    // MLDS 2005
    map.addLayer({
        'id': 'MLDS 2005',
        'type': 'fill',
        'source': 'Nigeria_test',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': {
                property: 'Nigeria_MLDS_Yrs25km_MLDSRate2005',
                stops: [
                    [-0.33651, "#feedde"],
                    [-0.116, '#fdd0a2'],
                    [-0.05818, '#fdae6b'],
                    [-0.01087, '#fd8d3c'],
                    [0.03989, '#f16913'],
                    [0.09784, '#d94801'],
                    [0.64773, '#8c2d04']
                ]
            },
            'fill-opacity': 0.95
        }
    });

    // MLDS 2010
    map.addLayer({
        'id': 'MLDS 2010',
        'type': 'fill',
        'source': 'Nigeria_test',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': {
                property: 'Nigeria_MLDS_Yrs25km_MLDSRate2010',
                stops: [
                    [-0.43825, "#feedde"],
                    [-0.14286, '#fdd0a2'],
                    [-0.07128, '#fdae6b'],
                    [-0.03079, '#fd8d3c'],
                    [0.00054, '#f16913'],
                    [0.04896, '#d94801'],
                    [0.33, '#8c2d04']
                ]
            },
            'fill-opacity': 0.95
        }
    });    

});

// Function to update drawn features into a source
function updateDrawnFeatures() {
    const data = draw.getAll();
    if (!map.getSource('drawn-features')) {
        map.addSource('drawn-features', {
            type: 'geojson',
            data: data
        });

        map.addLayer({
            id: 'drawn-fill',
            type: 'fill',
            source: 'drawn-features',
            paint: {
                'fill-color': '#ff0000',
                'fill-opacity': 0.5
            }
        });

        map.addLayer({
            id: 'drawn-line',
            type: 'line',
            source: 'drawn-features',
            paint: {
                'line-color': '#000',
                'line-width': 2
            }
        });
    } else {
        map.getSource('drawn-features').setData(data);
    }
}

// Listen for draw.create, draw.update, and draw.delete to update the source
map.on('draw.create', updateDrawnFeatures);
map.on('draw.update', updateDrawnFeatures);
map.on('draw.delete', updateDrawnFeatures);

// Add an export button to ensure features are captured
/* const exportBtn = document.createElement('button');
exportBtn.innerText = 'Export Map';
exportBtn.style.position = 'absolute';
exportBtn.style.top = '10px';
exportBtn.style.right = '10px';
exportBtn.style.padding = '10px';
exportBtn.style.background = 'white';
exportBtn.style.border = '1px solid black';
exportBtn.style.cursor = 'pointer'; */

exportBtn.onclick = () => {
    updateDrawnFeatures(); // Ensure drawn features are updated before exporting
    setTimeout(() => {
        document.querySelector('.mapboxgl-ctrl-export').click(); // Trigger the export button
    }, 1000); // Delay to allow rendering updates
};

document.body.appendChild(exportBtn);