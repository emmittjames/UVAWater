// Initialize and add the map
function initMap() {
    const map = createMap()
    createMarkers(map)
}

function createMarkers(map){
    var infoWindow = new google.maps.InfoWindow()
    const waterFountains = [
        [{ lat: 38.0325, lng: -78.5051 }, "New Cabell Hall"],
        [{ lat: 38.0316, lng: -78.5108 }, "Rice Hall"],
        [{ lat: 38.0364, lng: -78.5061 }, "Clemons Library"]
    ]
    waterFountains.forEach(([coords, name], i) => {
        const marker = new google.maps.Marker({
            position: coords,
            map: map,
            title: name
        })
        marker.addListener("click", () => {
            infoWindow.close();
            infoWindow.setContent(
                "<h3>" + marker.getTitle() + "</h3><h4>" + 
                "Overall rating: " + "</h4><div>" + 
                "Temperature: " + "</div><div>" +
                "Water flow: " + "</div><div>" +
                "Bottle refill station: " + "</div>"
            )
            infoWindow.open(map, marker)
        })
    })
}

function convertRating(rating){
    return "★"
}

function createMap(){
    const uvaCoords = { lat: 38.0336, lng: -78.5080 }
    var myStyles =[
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                  { visibility: "off" }
            ]
        }
    ];
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: uvaCoords,
        styles: myStyles
    })
    return map
}

window.initMap = initMap;