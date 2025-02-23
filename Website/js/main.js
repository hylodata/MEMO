mapboxgl.accessToken = 'pk.eyJ1IjoiZ2JieSIsImEiOiJjbDRnMnhpcWowOTZ0M2ltYmVidmFlYzUyIn0.YMvE-Zv6jfxhACw69xOvLQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/gbby/cl59w4ws5000v15qti5ts2dlf',
    center: [8.134336, 8.867609],
    zoom: 5,
    projection: 'globe'
});

// Necessary if working with server at Synlab
// var socket = io('http://10.0.1.98:5001');

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

    map.addSource('adm3', {
        'type': 'geojson',
        'data': './data/mapbox/adm3.geojson'
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

    // Ghana adm0
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

    // Adminstrative Boundaries Level 1
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

    // Add a black outline around the polygon.
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

    // Adminstrative Boundaries Level 2
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

    // Add a black outline around the polygon.
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

    // net migration layers
    map.addLayer({
        'id': 'Net_Ra_1990',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "NETRa1990"],
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

    map.addLayer({
        'id': 'Net_Ra_1995',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "NETRa1995"],
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

    map.addLayer({
        'id': 'Net_Ra_2000',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "NETRa2000"],
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

    map.addLayer({
        'id': 'Net_Ra_2005',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "NETRa2005"],
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

    map.addLayer({
        'id': 'Net_Ra_2010',
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

    // precipitation layers
    map.addLayer({
        'id': 'Prec_Ra_1990',
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
        'id': 'Prec_Ra_1995',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "PRECRa1995"],
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
        'id': 'Prec_Ra_2000',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "PRECRa2000"],
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
        'id': 'Prec_Ra_2005',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "PRECRa2005"],
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
        'id': 'Prec_Ra_2010',
        'type': 'fill',
        'source': 'ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": [
                "step",
                ["get", "PRECRa2010"],
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

});

// After the last frame rendered before the map enters an "idle" state.
map.on('idle', () => {
    // If these layers were not added to the map, abort

    if (!map.getLayer('adm0') || !map.getLayer('adm1') || !map.getLayer('adm1_fill') || !map.getLayer('adm2') || !map.getLayer('adm2_fill') || !map.getLayer('Accra_density') || !map.getLayer('Net_Ra_1990') || !map.getLayer('Net_Ra_2010') || !map.getLayer('Prec_Ra_1990')) {
        return;
    }

    // Enumerate ids of the layers.
    const toggleableLayerIds = ['adm0', 'adm1', 'adm1_fill', 'adm2', 'adm2_fill', 'Accra_density', 'Net_Ra_1990', 'Net_Ra_2010', 'Prec_Ra_1990'];

    // Set up the corresponding toggle button for each layer.
    for (const id of toggleableLayerIds) {
        // Skip layers that already have a button set up.
        if (document.getElementById(id)) {
            continue;
        }

        // Create a link.
        const link = document.createElement('a');
        link.id = id;
        link.href = '#';
        link.textContent = id;
        //                link.className = 'active';

        // Show or hide layer when the toggle is clicked.
        link.onclick = function (e) {
            const clickedLayer = this.textContent;
            e.preventDefault();
            e.stopPropagation();

            const visibility = map.getLayoutProperty(
                clickedLayer,
                'visibility'
            );

            // Toggle layer visibility by changing the layout object's visibility property.
            if (visibility === 'visible') {
                map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                this.className = '';
                socket.emit("groupScroll", {
                    "index": id,
                    "visible": 'false'
                });
            } else {
                this.className = 'active';
                map.setLayoutProperty(
                    clickedLayer,
                    'visibility',
                    'visible'
                );
                socket.emit("groupScroll", {
                    "index": id,
                    "visible": 'true'
                });
            }
        };

        const layers = document.getElementById('menu');
        layers.appendChild(link);
    }

    socket.on("groupScroll", data => {
        console.log("event recieved");

        layer = data.index;

        const visibility = map.getLayoutProperty(layer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(layer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(
                layer,
                'visibility',
                'visible'
            );
        }
    });
});
