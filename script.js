// Initialize and add the map
function initMap() {
    const map = createMap()
    createMarkers(map)
}

function createMarkers(map){
    var infoWindow = new google.maps.InfoWindow()
    const waterFountains = [
        [{ lat: 38.0325, lng: -78.5051 }, "New Cabell Hall", ["5th floor", "4th floor", "3rd floor", "2nd floor", "1st floor"]],
        [{ lat: 38.0316, lng: -78.5108 }, "Rice Hall", ["5th floor", "4th floor", "3rd floor", "2nd floor", "1st floor"]],
        [{ lat: 38.0364, lng: -78.5061 }, "Clemons Library", ["4th floor", "3rd floor", "2nd floor", "1st floor"]]
    ]
    waterFountains.forEach(([coords, name, fountainLocations]) => {
        const marker = new google.maps.Marker({
            position: coords,
            map: map,
            title: name
        })
        marker.addListener("click", () => {
            infoWindow.close();
            var html = (
                "<h2>" + marker.getTitle() + "</h2><h3>" + 
                "Overall rating: " + "</h3>"
            )
            fountainLocations.forEach((location) => {
                 html += (
                    "<h4>" + location + " rating: </h4>" +
                    "Temperature: " + "</div><div>" +
                    "Water flow: " + "</div><div>" +
                    "Bottle refill station: " + "</div>"
                 )   
            })
            infoWindow.setContent(html)
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