var main = document.querySelector("main");
var scrollSection = main.querySelector("#scrollSection");
var article = scrollSection.querySelector("article");
var steps = article.querySelectorAll(".step");

var scroller = scrollama();

function handleStepEnter(response) {
    // Get the element triggering the step
    let el = response.element;

    // Extract data attributes from the element
    let setCenter = el.dataset.center;
    let setZoom = el.dataset.zoom;
    let setPitch = el.dataset.pitch;
    let setBearing = el.dataset.bearing;

    // Extract the toggle layer name
    let layerToggle = el.dataset.toggle_layer;

    // Remove 'is-active' class from all steps and add it to the current step
    //steps.forEach(step => step.classList.remove('is-active'));
    //el.classList.add('is-active');

    // Fly to the specified location on the map
    map.flyTo({
        center: setCenter.split(", "),
        zoom: setZoom,
        pitch: setPitch,
        bearing: setBearing,
        easing(t) {
            return t;
        }
    })

    map2.flyTo({
        center: setCenter.split(", "),
        zoom: setZoom,
        pitch: setPitch,
        bearing: setBearing,
        easing(t) {
            return t;
        }
    })

    map3.flyTo({
        center: setCenter.split(", "),
        zoom: setZoom,
        pitch: setPitch,
        bearing: setBearing,
        easing(t) {
            return t;
        }
    })

    map4.flyTo({
        center: setCenter.split(", "),
        zoom: setZoom,
        pitch: setPitch,
        bearing: setBearing,
        easing(t) {
            return t;
        }
    })

    // Toggle the visibility of the layer
    if (layerToggle) {
        let currentLayerVisibility = map.getLayoutProperty(layerToggle, 'visibility');
        console.log(currentLayerVisibility);

        // Toggle the visibility based on the current state
        if (currentLayerVisibility === 'visible') {
            map.setLayoutProperty(layerToggle, 'visibility', 'none');
        } else {
            map.setLayoutProperty(layerToggle, 'visibility', 'visible');
        }
    }

    if (layerToggle) {
        let currentLayerVisibility = map2.getLayoutProperty(layerToggle, 'visibility');
        console.log(currentLayerVisibility);

        // Toggle the visibility based on the current state
        if (currentLayerVisibility === 'visible') {
            map2.setLayoutProperty(layerToggle, 'visibility', 'none');
        } else {
            map2.setLayoutProperty(layerToggle, 'visibility', 'visible');
        }
    }

    if (layerToggle) {
        let currentLayerVisibility = map3.getLayoutProperty(layerToggle, 'visibility');
        console.log(currentLayerVisibility);

        // Toggle the visibility based on the current state
        if (currentLayerVisibility === 'visible') {
            map3.setLayoutProperty(layerToggle, 'visibility', 'none');
        } else {
            map3.setLayoutProperty(layerToggle, 'visibility', 'visible');
        }
    }

    if (layerToggle) {
        let currentLayerVisibility = map4.getLayoutProperty(layerToggle, 'visibility');
        console.log(currentLayerVisibility);

        // Toggle the visibility based on the current state
        if (currentLayerVisibility === 'visible') {
            map4.setLayoutProperty(layerToggle, 'visibility', 'none');
        } else {
            map4.setLayoutProperty(layerToggle, 'visibility', 'visible');
        }
    }
}

function init() {

    scroller
        .setup({
            step: "#scrollSection article .step",
            offset: 0.9,
            debug: false
        })
        .onStepEnter(handleStepEnter);

    window.addEventListener("resize", scroller.resize);
}

init();