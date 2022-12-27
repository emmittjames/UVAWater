// Initialize and add the map
function initMap() {
    const uvaCoords = { lat: 38.0336, lng: -78.5080 }
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: uvaCoords
    })

    var infoWindow = new google.maps.InfoWindow()

    const waterFountains = [
        [{ lat: 38.0325, lng: -78.5051 }, "New Cabell Hall"],
        [{ lat: 38.0316, lng: -78.5108 }, "Rice Hall"]
    ]

    waterFountains.forEach(([coords, name], i) => {
        const marker = new google.maps.Marker({
            position: coords,
            map: map,
            title: name
        })

        marker.addListener("click", () => {
            infoWindow.close();
            infoWindow.setContent(marker.getTitle())
            infoWindow.open(map, marker)
        })
    })
}

window.initMap = initMap;