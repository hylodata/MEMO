mapboxgl.accessToken = 'pk.eyJ1IjoiZ2JieSIsImEiOiJjbDRnMnhpcWowOTZ0M2ltYmVidmFlYzUyIn0.YMvE-Zv6jfxhACw69xOvLQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/gbby/clhb7frzz021n01pa1scr6r2e',
    center: [-89.735568, 15.673697],
    zoom: 4,
    projection: 'globe'
});

const map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/gbby/clhb7frzz021n01pa1scr6r2e',
    center: [-89.735568, 15.673697],
    zoom: 4,
    projection: 'globe'
});

const map3 = new mapboxgl.Map({
    container: 'map3',
    style: 'mapbox://styles/gbby/clhb7frzz021n01pa1scr6r2e',
    center: [-89.735568, 15.673697],
    zoom: 4,
    projection: 'globe'
});

const map4 = new mapboxgl.Map({
    container: 'map4',
    style: 'mapbox://styles/gbby/clhb7frzz021n01pa1scr6r2e',
    center: [-89.735568, 15.673697],
    zoom: 4,
    projection: 'globe'
});

map.on('style.load', () => {
    map.setFog({});
    map.scrollZoom.disable();
    map.dragPan.enable()
    map.dragRotate.disable()
});

map2.on('style.load', () => {
    map2.setFog({});
    map2.scrollZoom.disable();
    map2.dragPan.enable()
    map2.dragRotate.disable()
});

map3.on('style.load', () => {
    map3.setFog({});
    map3.scrollZoom.disable();
    map3.dragPan.enable()
    map3.dragRotate.disable()
});

map4.on('style.load', () => {
    map4.setFog({});
    map4.scrollZoom.disable();
    map4.dragPan.enable()
    map4.dragRotate.disable()
});

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

    map.addSource('central_america', {
        'type': 'geojson',
        'data': './data/mapbox/central_america.geojson'
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

    // Ghana adm1
    map.addLayer({
        'id': 'adm1',
        'type': 'line',
        'source': 'adm1',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-color': '#336',
            'line-width': 2
        },
        filter: ["==", "admin0Name", "Ghana"]
    });

    // Ghana adm2
    map.addLayer({
        'id': 'adm2',
        'type': 'line',
        'source': 'adm2',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-color': '#336',
            'line-width': 2
        },
        filter: ["==", "admin0Name", "Ghana"]
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

});

map2.on('load', () => {

    // Load geojson data sources
    map2.addSource('2adm0', {
        'type': 'geojson',
        'data': './data/mapbox/adm0.geojson'
    });

    // ADD LAYERS

    // Ghana adm0
    map2.addLayer({
        'id': '2adm0',
        'type': 'line',
        'source': '2adm0',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-color': '#336',
            'line-width': 2
        },
        filter: ["==", "admin0Name", "Ghana"]
    });

});

map3.on('load', () => {

    // Load geojson data sources
    map3.addSource('3adm0', {
        'type': 'geojson',
        'data': './data/mapbox/adm0.geojson'
    });

    map3.addSource('central_america_mgwr', {
        'type': 'geojson',
        'data': './data/mapbox/central_america_mgwr.geojson'
    });
    
    map3.addSource('central_america_mgwr_2', {
        'type': 'geojson',
        'data': './data/mapbox/central_america_mgwr_2.geojson'
    });

    // ADD LAYERS

    // Modelling
    map3.addLayer({
        'id': 'S_C_RURSU2',
        'type': 'circle',
        'source': 'central_america_mgwr',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'circle-radius': 4,
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
            'circle-opacity': 0.75
        }
    }); 
    
    map3.addLayer({
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
    }); 

});

map4.on('load', () => {

    // Load geojson data sources
    map4.addSource('4adm0', {
        'type': 'geojson',
        'data': './data/mapbox/adm0.geojson'
    });

    // ADD LAYERS

    // Ghana adm0
    map4.addLayer({
        'id': '4adm0',
        'type': 'line',
        'source': '4adm0',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-color': '#336',
            'line-width': 2
        },
        filter: ["==", "admin0Name", "Ghana"]
    });

});