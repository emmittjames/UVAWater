// Initialize and add the map
function initMap() {
    const uvaCoords = { lat: 38.0336, lng: -78.5080 }
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: uvaCoords,
    })
    const marker = new google.maps.Marker({
        position: uvaCoords,
        map: map,
    })
}

window.initMap = initMap;