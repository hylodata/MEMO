mapboxgl.accessToken = 'pk.eyJ1IjoiZ2JieSIsImEiOiJjbDRnMnhpcWowOTZ0M2ltYmVidmFlYzUyIn0.YMvE-Zv6jfxhACw69xOvLQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/gbby/cm8azkjqf003c01rxdyxofu26',
    center: [90.3900326, 23.754335],
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

    map.addSource('bangladesh', {
        'type': 'geojson',
        'data': './data/mapbox/bangladesh.geojson'
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

    map.addLayer({
        'id': 'NetRa2000',
        'type': 'fill',
        'source': 'bangladesh',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "NetRa2000"], // Using equal count quantile with 7 breaks
                "#7F3B08",  // Dark Brown (≤ -282)
                -282, "#B35806",  // Burnt Orange (-282 to -0.85)
                -0.85, "#E08214",  // Orange (-0.85 to -0.30)
                -0.30, "#FDB863",  // Light Orange (-0.30 to -0.16)
                -0.16, "#EDEDBC",  // Light Neutral (-0.16 to 0.00)
                0.00, "#B2ABD2",  // Light Purple (0.00 to 0.05)
                0.05, "#5E3C99"   // Dark Purple (≥ 0.05)
            ],
            'fill-opacity': 0.75
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