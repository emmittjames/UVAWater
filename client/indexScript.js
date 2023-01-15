const hamburgerToggle = document.getElementsByClassName("hamburgerToggle")[0]
const navbarLinks = document.getElementsByClassName("navbarLinks")[0]
hamburgerToggle.addEventListener("click", () => {
    navbarLinks.classList.toggle("active")
})

function initMap(){
    const map = createMap()
    createMarkers(map)
}

function getOverallRating(reviewsData){
    if(reviewsData.length === 0){
        return "N/A"
    }
    let totalRating = 0
    for(let i=0; i<reviewsData.length; i++){
        totalRating += (reviewsData[i].tempRating + reviewsData[i].flowRating)/2
    }
    return (totalRating/reviewsData.length).toFixed(1)
}

function getLocationRating(reviewsData, location){
    let totalTemp = 0
    let totalFlow = 0
    let counter = 0
    for(let i=0; i<reviewsData.length; i++){
        if(reviewsData[i].fountainName === location){
            totalTemp += reviewsData[i].tempRating
            totalFlow += reviewsData[i].flowRating
            counter++
        }
    }
    totalTemp = (totalTemp/counter)
    totalFlow = (totalFlow/counter)
    let overallRating = ((totalTemp + totalFlow)/2)
    if(counter === 0){
        overallRating = totalTemp = totalFlow = "N/A"
    }
    else{
        totalTemp = totalTemp.toFixed(1)
        totalFlow = totalFlow.toFixed(1)
        overallRating = overallRating.toFixed(1)
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
            axios.post(BACKEND_URL + "/reviews", {building: marker.getTitle()}).then((response) => {
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