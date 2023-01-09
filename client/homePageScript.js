function initMap(){
    const map = createMap()
    createMarkers(map)
}

function getReviews(){
    axios.get("http://localhost:3000/reviews").then((response) => {
        console.log(response)
    })
}

function createMarkers(map){
    let infoWindow = new google.maps.InfoWindow()
    const waterFountains = waterFountainData
    waterFountains.forEach(([coords, name, fountainLocations]) => {
        const marker = new google.maps.Marker({
            position: coords,
            map: map,
            title: name
        })
        marker.addListener("click", () => {
            infoWindow.close();
            getReviews()
            let html = (
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
    let myStyles =[
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