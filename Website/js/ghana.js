mapboxgl.accessToken = 'pk.eyJ1IjoiZ2JieSIsImEiOiJjbDRnMnhpcWowOTZ0M2ltYmVidmFlYzUyIn0.YMvE-Zv6jfxhACw69xOvLQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/gbby/clhb7frzz021n01pa1scr6r2e',
    center: [-0.750892, 8.208771],
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

    map.addSource('ghana', {
        'type': 'geojson',
        'data': './data/mapbox/ghana.geojson'
    });

    map.addSource('accra', {
        'type': 'geojson',
        'data': './data/mapbox/accra_density.geojson'
    });

    map.addSource('gold', {
        'type': 'geojson',
        'data': './data/mapbox/goldmines.geojson'
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
        filter: ["==", "admin0Name", "Ghana"]
    });

    // adm1
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
        filter: ["==", "admin0Name", "Ghana"]

    });

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
        filter: ["==", "admin0Name", "Ghana"]
    });

    // adm2
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
        filter: ["==", "admin0Name", "Ghana"]
    });

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
        filter: ["==", "admin0Name", "Ghana"]
    });

    // Accra density layer
    map.addLayer({
        'id': 'Accra_density',
        'type': 'fill',
        'source': 'accra',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': {
                property: 'Population Density',
                stops: [
                    [112, 'pink'],
                    [29479, 'red']
                ]
            },
            'fill-opacity': 0.75
        }
    });

    // Net Migration
    map.addLayer({
        'id': 'NETRa1990',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "NETRa1990"],
                "#7f3b08", // using quantile breaks
                -225, "#b35806",
                -150, "#e08214",
                -75, "#fdb863",
                0, "#fee0b6",
                50, "#f7f7f7",
                100, "#d8daeb",
                150, "#b2abd2",
                200, "#542788"
            ],
            'fill-opacity': 0.75
        }
    });

    map.addLayer({
        'id': 'NETRa1995',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "NETRa1995"],
                "#762a83",  // using pretty breaks
                -225, "#9970ab",
                -150, "#c2a5cf",
                -75, "#e7d4e8",
                0, "#f7f7f7",
                50, "#fdb863",
                100, "#e08214",
                150, "#b35806",
                200, "#7f3b08"
            ],
            'fill-opacity': 0.75
        }
    });

    map.addLayer({
        'id': 'NETRa2000',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "NETRa2000"],
                "#762a83",  // using log breaks
                -280.85, "#9970ab",
                -278.38, "#c2a5cf",
                -273.08, "#e7d4e8",
                -261.68, "#f7f7f7",
                -237.2, "#fdb863",
                -184.59, "#e08214",
                -71.55, "#b35806",
                171.33, "#7f3b08"
            ],
            'fill-opacity': 0.75
        }
    });

    map.addLayer({
        'id': 'NETRa2005',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "NETRa2005"], // Using equal count quantile with 7 breaks
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
        'id': 'NETRa2010',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "NETRa2010"],
                "#762a83",  // Default color (for anything < -300)
                -225, "#9970ab",
                -150, "#c2a5cf",
                -75, "#e7d4e8",
                0, "#f7f7f7",
                50, "#fdb863",
                100, "#e08214",
                150, "#b35806",
                200, "#7f3b08"
            ],
            'fill-opacity': 0.75
        }
    });

    // precipitation
    map.addLayer({
        'id': 'PRECRa1990',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "PRECRa1990"],
                "#440154",  // Default color (for anything < -300)
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });

    map.addLayer({
        'id': 'PRECRa1995',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "PRECRa1995"],
                "#440154",  
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });

    map.addLayer({
        'id': 'PRECRa2000',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "PRECRa2000"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });

    map.addLayer({
        'id': 'PRECRa2005',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "PRECRa2005"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });

    map.addLayer({
        'id': 'PRECRa2010',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "PRECRa2010"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });

    // Consecutive Wet Days 
    map.addLayer({
        'id': 'MLWSRa1990',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "MLWSRa1990"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });    

    map.addLayer({
        'id': 'MLWSRa1995',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "MLWSRa1995"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });    

    map.addLayer({
        'id': 'MLWSRa2000',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "MLWSRa2000"],
                "#440154",  
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });
    
    map.addLayer({
        'id': 'MLWSRa2005',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "MLWSRa2005"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });    

    map.addLayer({
        'id': 'MLWSRa2010',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "MLWSRa2010"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });
    
    // Consecutive Dry Days 
    map.addLayer({
        'id': 'MLDSRa1990',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "MLDSRa1990"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });    

    map.addLayer({
        'id': 'MLDSRa1995',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "MLDSRa1995"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });    

    map.addLayer({
        'id': 'MLDSRa2000',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "MLDSRa2000"],
                "#440154",  
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });
    
    map.addLayer({
        'id': 'MLDSRa2005',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "MLDSRa2005"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });    

    map.addLayer({
        'id': 'MLDSRa2010',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "MLDSRa2010"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });
    
    // Max Temp Extremes 
    map.addLayer({
        'id': 'TMAXRa1990',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "TMAXRa1990"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });    

    map.addLayer({
        'id': 'TMAXRa1995',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "TMAXRa1995"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });    

    map.addLayer({
        'id': 'TMAXRa2000',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "TMAXRa2000"],
                "#440154",  
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });
    
    map.addLayer({
        'id': 'TMAXRa2005',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "TMAXRa2005"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });    

    map.addLayer({
        'id': 'TMAXRa2010',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "TMAXRa2010"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });    

    // Min Temp Extremes 
    map.addLayer({
        'id': 'TMINRa1990',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "TMINRa1990"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });    

    map.addLayer({
        'id': 'TMINRa1995',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "TMINRa1995"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });    

    map.addLayer({
        'id': 'TMINRa2000',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "TMINRa2000"],
                "#440154",  
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });
    
    map.addLayer({
        'id': 'TMINRa2005',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "TMINRa2005"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });    

    map.addLayer({
        'id': 'TMINRa2010',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "TMINRa2010"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });

    // Conflict 
    map.addLayer({
        'id': 'CONFRa1990',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "CONFRa1990"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });    

    map.addLayer({
        'id': 'CONFRa1995',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "CONFRa1995"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });    

    map.addLayer({
        'id': 'CONFRa2000',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "CONFRa2000"],
                "#440154",  
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });
    
    map.addLayer({
        'id': 'CONFRa2005',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "CONFRa2005"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
            ],
            'fill-opacity': 0.75
        }
    });    

    map.addLayer({
        'id': 'CONFRa2010',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "CONFRa2010"],
                "#440154", 
                -200, "#482677",
                -100, "#3e4989",
                0, "#26828e",
                75, "#1f9e89",
                150, "#6cce5a",
                200, "#fde725"
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