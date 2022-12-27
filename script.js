// Initialize and add the map
function initMap() {
    const uvaCoords = { lat: 38.0336, lng: -78.5080 }
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: uvaCoords
    })

    var infoWindow = new google.maps.InfoWindow()

    const newCabCoords = { lat: 38.0325, lng: -78.5051 }
    const newCabMarker = new google.maps.Marker({
        position: newCabCoords,
        map: map
    })

    newCabMarker.addListener("click", () => {
        infoWindow.close();
        infoWindow.setContent("testing")
        infoWindow.open(newCabMarker.getMap(), newCabMarker)
    })

}

window.initMap = initMap;