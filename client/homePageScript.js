function initMap(){
    const map = createMap()
    createMarkers(map)
}

function clearSqlTable(){
    axios.get("http://localhost:3000/cleartable")
}

function round(num){
    return num.toFixed(1)
}

function getOverallRating(reviewsData){
    if(reviewsData.length === 0){
        return "N/A"
    }
    let totalRating = 0
    for(let i=0; i<reviewsData.length; i++){
        totalRating += (reviewsData[i].tempRating + reviewsData[i].flowRating)/2
    }
    return round(totalRating/reviewsData.length)
}

function getLocationRating(reviewsData, location){
    let totalTemp = 0
    let totalFlow = 0
    let counter = 0
    for(let i=0; i<reviewsData.length; i++){
        if(reviewsData[i].fountainName === location){
            console.log("asddsf")
            totalTemp += reviewsData[i].tempRating
            totalFlow += reviewsData[i].flowRating
            counter++
        }
    }
    totalTemp = round(totalTemp/counter)
    totalFlow = round(totalFlow/counter)
    let overallRating = round((totalTemp + totalFlow)/2)
    if(counter === 0){
        overallRating = totalTemp = totalFlow = "N/A"
    }
    return [overallRating, totalTemp, totalFlow, counter]
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
            axios.post("http://localhost:3000/reviews", {building: marker.getTitle()}).then((response) => {
                const data = response.data
                console.log(data)
                let overallRating = getOverallRating(data)
                let html = (
                    "<h2>" + marker.getTitle() + "</h2><h3>" + 
                    "Overall rating: " + overallRating + " (" + data.length + ")</h3>"
                )
                fountainLocations.forEach((location) => {
                    const locationRating = getLocationRating(data, location)
                    console.log(locationRating)
                    const locationRatingOverall = locationRating[0]
                    const locationRatingTemp = locationRating[1]
                    const locationRatingFlow = locationRating[2]
                    const ratingAmount = locationRating[3]
                     html += (
                        "<h4>" + location + " rating: " + locationRatingOverall + " (" + ratingAmount + ")</h4>" +
                        "Temperature: " + locationRatingTemp + "</div><div>" +
                        "Water flow: " + locationRatingFlow + "</div><div>"
                     )   
                })
                infoWindow.setContent(html)
                infoWindow.open(map, marker)
            })
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