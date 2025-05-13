mapboxgl.accessToken = 'pk.eyJ1IjoiZ2JieSIsImEiOiJjbDRnMnhpcWowOTZ0M2ltYmVidmFlYzUyIn0.YMvE-Zv6jfxhACw69xOvLQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/gbby/clhb7frzz021n01pa1scr6r2e',
    center: [-89.735568, 15.673697],
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

    map.addSource('guatemala', {
        'type': 'geojson',
        'data': './data/mapbox/guatemala.geojson'
    });    

    map.addSource('central_america', {
        'type': 'geojson',
        'data': './data/mapbox/central_america.geojson'
    });

    map.addSource('central_america_mgwr', {
        'type': 'geojson',
        'data': './data/mapbox/central_america_mgwr.geojson'
    });
    
    map.addSource('central_america_mgwr_2', {
        'type': 'geojson',
        'data': './data/mapbox/central_america_mgwr_2.geojson'
    });     

    map.addSource('central_america_mgwr_2_circle', {
        'type': 'geojson',
        'data': './data/mapbox/central_america_mgwr_2_circle.geojson'
    });    

    map.addSource('guatemala_glc', {
        'type': 'geojson',
        'data': './data/mapbox/guatemala_glc.geojson'
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


    // DATA LAYERS

    // Net Migration
    map.addLayer({
        'id': 'NetRa2010',
        'type': 'fill',
        'source': 'guatemala',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "NetRa2010"], // Using equal count quantile with 7 breaks
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

    map.addLayer({
        'id': 'NETMg2010',
        'type': 'fill',
        'source': 'central_america',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "NETMg2010"], // Using equal count quantile with 7 breaks
                "#7F3B08",  // Dark Brown (≤ -282)
                -3828.31, "#B35806",  // Burnt Orange (-282 to -0.85)
                -1157.12, "#E08214",  // Orange (-0.85 to -0.30)
                -234.16, "#FDB863",  // Light Orange (-0.30 to -0.16)
                112.99, "#EDEDBC",  // Light Neutral (-0.16 to 0.00)
                789.70, "#B2ABD2",  // Light Purple (0.00 to 0.05)
                2431.84, "#5E3C99"   // Dark Purple (≥ 0.05)
            ],
            'fill-opacity': 0.75
        }
    });

    // Precipitation
    map.addLayer({
        'id': 'PRECAv2010',
        'type': 'fill',
        'source': 'central_america',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "PRECAv2010"], // Using equal count quantile with 7 breaks
                "#FFFFD9",  // ≤ -0.2 (Light Yellow)
                1389.87, "#EDF8B1",  // Pale Yellow-Green
                1716.33, "#C7E9B4",  // Light Green
                1900.69, "#7FCDBB",  // Teal-Green
                2110.81, "#41B6C4",   // Teal-Blue
                2584.34, "#1D91C0",   // Blue
                4049.14, "#225EA8"    // ≥ 0.22 (Dark Blue) 
            ],
            'fill-opacity': 0.75
        }
    });
    
    // Ground cover
    map.addLayer({
        'id': 'guatemala_glc',
        'type': 'fill',
        'source': 'guatemala_glc',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "VALUE"], // Using equal count quantile with 7 breaks
                "#62b9e0",  // water
                10, "#e1c10a",  // cropland
                20, "#117c00",  // forest
                30, "#bd995d",  // grassland
            ],
            'fill-opacity': 0.75
        }
    });    
    
    // Modelling
    map.addLayer({
        'id': 'S_C_RURSU2',
        'type': 'circle',
        'source': 'central_america_mgwr',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-radius': {
                stops: [[1, 3], [5, 8], [10, 30], [15, 60]]
            },
            'circle-color': [
                "step",
                ["get", "S_C_RURSU2"], // Using equal count quantile with 7 breaks
                "#000004",  // 
                0.06072, "#2d115f",  // 
                0.13795, "#721f81",  // 
                0.23182, "#b6377a",  // 
                0.39712, "#f1605d",   // 
                0.66933, "#feaf78",   //
                3.91409, "#fcfdbf"    // 
            ],
            'circle-opacity': 1
        }
    }); 
    
/*     map.addLayer({
        'id': 'mgwr_2_rslt_param_URBSu2010',
        'type': 'fill',
        'source': 'central_america_mgwr_2',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "mgwr_2_rslt_param_URBSu2010"], // Using equal count quantile with 7 breaks
                "#000004",  // 
                -1.20756, "#2d115f",  // 
                -1.01242, "#721f81",  // 
                -0.98389, "#b6377a",  // 
                -0.50903, "#f1605d",   // 
                -0.38098, "#feaf78",   //
                -0.29472, "#fcfdbf"    // 
            ],
            'fill-opacity': 0.75
        }
    }); */
    
    map.addLayer({
        'id': 'mgwr_2_rslt_param_URBSu2010',
        'type': 'circle',
        'source': 'central_america_mgwr_2_circle',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-radius': {
                stops: [[1, 3], [5, 8], [10, 30], [15, 60]]
            },
            'circle-color': [
                "step",
                ["get", "mgwr_2_rslt_param_URBSu2010"], // Using equal count quantile with 7 breaks
                "#000004",  // 
                -1.20756, "#2d115f",  // 
                -1.00669, "#721f81",  // 
                -0.9174, "#b6377a",  // 
                -0.42719, "#f1605d",   // 
                -0.32296, "#feaf78",   //
                -0.08268, "#fcfdbf"    // 
            ],
            'circle-opacity': 1
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