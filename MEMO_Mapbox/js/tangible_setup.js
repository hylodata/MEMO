/*         mapboxgl.accessToken = 'pk.eyJ1IjoiZ2JieSIsImEiOiJjbDRnMnhpcWowOTZ0M2ltYmVidmFlYzUyIn0.YMvE-Zv6jfxhACw69xOvLQ';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/gbby/cl59w4ws5000v15qti5ts2dlf',
            center: [0.47773, 7.15319],
            zoom: 4,
            projection: 'globe'
        }); */

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2JieSIsImEiOiJjbDRnMnhpcWowOTZ0M2ltYmVidmFlYzUyIn0.YMvE-Zv6jfxhACw69xOvLQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/gbby/cl4g7cfhv001n14qxgenegeqn',
    center: [-0.750892, 8.208771],
    zoom: 6,
    preserveDrawingBuffer: true,
    projection: 'globe'
});

// Necessary if working with server at Synlab
// var socket = io('http://10.0.1.98:5001');
const ws = new WebSocket('ws://localhost:12345');

ws.onopen = () => {
    console.log('Connected to the server');
    // Send an initial message if necessary, e.g., to identify this client
    ws.send(JSON.stringify({ dialID: 'mapBox' }));
};

// Wait until the map has finished loading.
map.on('load', () => {

    // Load geojson data sources
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

    map.addSource('Ghana', {
        'type': 'geojson',
        'data': './data/mapbox/Ghana.geojson'
    });

    map.addSource('Accra', {
        'type': 'geojson',
        'data': './data/mapbox/accra_density.geojson'
    });

    map.addSource('ghana', {
        'type': 'geojson',
        'data': './data/mapbox/ghana.geojson'
    });

    // next ones are point files
    map.addSource('net_migration_200005', {
        'type': 'geojson',
        'data': './data/mapbox/net_migration_200005.geojson'
    });

    map.addSource('net_migration_201015', {
        'type': 'geojson',
        'data': './data/mapbox/net_migration_201015.geojson'
    });


    // ADD LAYERS

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
        }
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
        }
    });

    // Adminstrative Boundaries Level 1
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
        }
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
        }
    });

    // Dummy choropleth pop density layer
    map.addLayer({
        'id': 'adm3',
        'type': 'fill',
        'source': 'adm3',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': {
                property: 'density',
                stops: [
                    [0, 'white'],
                    [12, 'red']
                ]
            },
            'fill-opacity': 0.75
        }
    })

    // Dummy choropleth pop density layer
    map.addLayer({
        'id': 'Accra_density',
        'type': 'fill',
        'source': 'Accra',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': {
                property: 'Population Density',
                stops: [
                    [112, 'white'],
                    [29479, 'red']
                ]
            },
            'fill-opacity': 0.75
        }
    })

    // 1985 Precipitation
    map.addLayer({
        'id': '1985 Precipitation',
        'type': 'fill',
        'source': 'Ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': {
                property: 'F1985raince',
                stops: [
                    [791, '#ffffd9'],
                    [1033, '#edf8b1'],
                    [1110, '#c7e9b4'],
                    [1250, '#7fcdbb'],
                    [1361, '#41b6c4'],
                    [1437, '#1d91c0'],
                    [1519, '#225ea8'],
                    [1861, '#0c2c84']
                ]
            },
            'fill-opacity': 0.75
        }
    })

    // 2010 Precipitation
    map.addLayer({
        'id': '2010 Precipitation',
        'type': 'fill',
        'source': 'Ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': {
                property: 'F2010rainCe',
                stops: [
                    [725, '#ffffd9'],
                    [961, '#edf8b1'],
                    [1018, '#c7e9b4'],
                    [1136, '#7fcdbb'],
                    [1216, '#41b6c4'],
                    [1306, '#1d91c0'],
                    [1418, '#225ea8'],
                    [1758, '#0c2c84']
                ]
            },
            'fill-opacity': 0.75
        }
    })

    // 2015 Migration
    map.addLayer({
        'id': 'Net Migration 2015',
        'type': 'fill',
        'source': 'Ghana',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': {
                property: 'Net_Migrat',
                stops: [
                    [-128773, 'rgba(230,97,1,1.0)'],
                    [-4132, 'rgba(241,136,44,1.0)'],
                    [-1755, 'rgba(251,175,88,1.0)'],
                    [-731, 'rgba(251,205,148,1.0)'],
                    [-244, 'rgba(249,233,214,1.0)'],
                    [-31, 'rgba(232,231,239,1.0)'],
                    [-2, 'rgba(201,197,223,1.0)'],
                    [9, 'rgba(169,159,204,1.0)'],
                    [92, 'rgba(131,109,179,1.0)'],
                    [617, 'rgba(94,60,153,1.0)']
                ]
            },
            'fill-opacity': 0.75
        }
    })

    // Migration 2000 - 2005
    map.addLayer({
        'id': '2000 - 2005',
        'type': 'circle',
        'source': 'net_migration_200005',
        'minzoom': 4,
        'maxzoom': 15,
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-radius': 3,
            'circle-color': {
                property: 'Migration',
                stops: [
                    [-128773, 'rgba(230,97,1,1.0)'],
                    [-4132, 'rgba(241,136,44,1.0)'],
                    [-1755, 'rgba(251,175,88,1.0)'],
                    [-731, 'rgba(251,205,148,1.0)'],
                    [-244, 'rgba(249,233,214,1.0)'],
                    [-31, 'rgba(232,231,239,1.0)'],
                    [-2, 'rgba(201,197,223,1.0)'],
                    [9, 'rgba(169,159,204,1.0)'],
                    [92, 'rgba(131,109,179,1.0)'],
                    [617, 'rgba(94,60,153,1.0)']
                ]
            },
            'circle-opacity': 0.5
        }
    }

    );

    // Migration 2010 - 2015
    map.addLayer({
        'id': '2010 - 2015',
        'type': 'circle',
        'source': 'net_migration_201015',
        'minzoom': 4,
        'maxzoom': 15,
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-radius': 3,
            'circle-color': {
                property: 'Migration',
                stops: [
                    [-128773, 'rgba(230,97,1,1.0)'],
                    [-4132, 'rgba(241,136,44,1.0)'],
                    [-1755, 'rgba(251,175,88,1.0)'],
                    [-731, 'rgba(251,205,148,1.0)'],
                    [-244, 'rgba(249,233,214,1.0)'],
                    [-31, 'rgba(232,231,239,1.0)'],
                    [-2, 'rgba(201,197,223,1.0)'],
                    [9, 'rgba(169,159,204,1.0)'],
                    [92, 'rgba(131,109,179,1.0)'],
                    [617, 'rgba(94,60,153,1.0)']
                ]
            },
            'circle-opacity': 0.5
        }
    }

    );

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
                ["get", "NETRa1990"], // Using equal count quantile with 7 breaks
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

// After the last frame rendered before the map enters an "idle" state.
const toggleableLayerIds = ['adm1_fill', 'adm1', 'adm2_fill', 'adm2', 'adm3', 'Accra_density', '1985 Precipitation', '2010 Precipitation', 'Net Migration 2015', '2000 - 2005', '2010 - 2015', 'NETRa1990'];

map.on('idle', () => {
    // If these layers were not added to the map, abort
    // add || !map.getLayer('accra_density')

    if (!map.getLayer('adm1_fill') || !map.getLayer('adm1') || !map.getLayer('adm2_fill') || !map.getLayer('adm2') || !map.getLayer('adm3') || !map.getLayer('Accra_density') || !map.getLayer('1985 Precipitation') || !map.getLayer('2010 Precipitation') || !map.getLayer('Net Migration 2015') || !map.getLayer('2000 - 2005') || !map.getLayer('2010 - 2015') || !map.getLayer('NETRa1990')) {
        return;
    }

    // add , 'accra_density'
    // Enumerate ids of the layers.

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
        link.className = 'active';

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

    // socket.on("groupScroll", data => {
    //     console.log("event recieved");

    //     layer = data.index;

    //     const visibility = map.getLayoutProperty(layer, 'visibility');

    //     if (visibility === 'visible') {
    //         map.setLayoutProperty(layer, 'visibility', 'none');
    //         this.className = '';
    //     } else {
    //         this.className = 'active';
    //         map.setLayoutProperty(
    //             layer,
    //             'visibility',
    //             'visible'
    //         );
    //     }
    // });

    //need to make multiple of these for multiple dials
    let menuStateCache = {
        path: [],
        dialID: '',
        currentPath: '',
        currentSelection: ''
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === 'menuStateUpdate' && data.menuState) {
            // Update global state with new menu state information
            menuStateCache.path = data.menuState.path;
            menuStateCache.currentPath = menuStateCache.path[menuStateCache.path.length - 1];
            menuStateCache.currentSelection = data.menuState.selection;
        }

        if (data.type === 'menuAction') {
            const menuAction = data.action;
            console.log("menuAction recieved = " + menuAction);
            // Now you can also use menuStateCache here
            toggleVisibilityBasedOnMenuState();
        }

        // try this function instead of the one commented out below (and re-write actionToLayerMap below based on what is actually in tangibleServer.py)
        function toggleVisibilityBasedOnMenuState() {
            const action = menuStateCache.currentAction || (menuStateCache.currentSelection + " " + menuStateCache.currentPath);
            console.log("TOGGLING action:", action);
        
            // Define a map from actions to one or more layer IDs
            const actionToLayerMap = {
                "1985 Precipitation": ["precipitation1985Layer"],
                "2010 Precipitation": ["precipitation2010Layer"],
                "Show Acid Rain Years": ["acidRainLayer1", "acidRainLayer2"],
                "Show Invasive Species Years": ["invasiveSpeciesLayer"],
                "Show Biodiversity Years": ["biodiversityLayer"],
                "Show Temperature Years": ["temperatureLayer"],
                "Show Social Options": ["socialLayer"],
                "Show Political Options": ["politicalLayer"],
                "Show Demographic Options": ["demographicLayer"],
                "Show Economic Options": ["economicLayer"],
            };
        
            const layersToToggle = actionToLayerMap[action];
            if (!layersToToggle) {
                console.warn("No layers mapped for action:", action);
                return;
            }
        
            // Toggle visibility for each layer associated with this action
            layersToToggle.forEach(layerId => {
                if (map.getLayer(layerId)) {
                    const currentVisibility = map.getLayoutProperty(layerId, 'visibility');
                    const newVisibility = currentVisibility === 'visible' ? 'none' : 'visible';
                    map.setLayoutProperty(layerId, 'visibility', newVisibility);
                    console.log(`Toggled ${layerId} to ${newVisibility}`);
                } else {
                    console.warn("Layer not found:", layerId);
                }
            });
        }

        // Function to toggle visibility based on the cached menu state
/*         function toggleVisibilityBasedOnMenuState() {
            if (menuStateCache.currentPath === 'Precipitation') {
                const visibilityProperty = menuStateCache.currentSelection + ' Precipitation';
                const visibility = map.getLayoutProperty(visibilityProperty, 'visibility');
                if (visibility === 'visible') {
                    map.setLayoutProperty(visibilityProperty, 'visibility', 'none');
                } else {
                    map.setLayoutProperty(visibilityProperty, 'visibility', 'visible');
                }
                console.log("TOGGLING " + menuStateCache.currentSelection + " PRECIPITATION");
            }
        }
    }; */

    /*
                    if (currentPath == 'Precipitation' && currentSelection == '1985'){
                        console.log("TOGGLE 1985 PRECIPITATION")
                        const visibility = map.getLayoutProperty('1985 Precipitation', 'visibility');
                        if (visibility === 'visible') {
                            map.setLayoutProperty('1985 Precipitation', 'visibility', 'none');
                        } else {
                            map.setLayoutProperty('1985 Precipitation', 'visibility', 'visible');
                        }
                        }
    
                    if (currentPath == 'Precipitation' && currentSelection == '2010'){
                        console.log("TOGGLE 2010 PRECIPITATION");
                        const visibility = map.getLayoutProperty('2010 Precipitation', 'visibility');
                        if (visibility === 'visible') {
                            map.setLayoutProperty('2010 Precipitation', 'visibility', 'none');
                        } else {
                            map.setLayoutProperty('2010 Precipitation', 'visibility', 'visible');
                        }
                    }
    
                }
    */

    ws.onerror = (error) => {
        console.log('WebSocket Error: ', error);
        menuDisplay.innerText = 'WebSocket connection error. Please check the console for more details.';
    };

    ws.onclose = () => {
        console.log('Disconnected from the server');
        menuDisplay.innerText = 'Disconnected from the server.';
    };
});