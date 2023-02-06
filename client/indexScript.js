window.initMap = initMap;

function initMap(){
    const map = createMap()
    addCurrentPositionMarker(map)
    createMarkers(map)
    createCurrentLocationButton(map)
    generateReviews();
    getTotalReviewCount()
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
            title: name,
        })
        markerInfowindowListener(marker, infoWindow, fountainLocations)
    })
}

function markerInfowindowListener(marker, infoWindow, fountainLocations){
    marker.addListener("click", () => {
        infoWindow.close();
        axios.post(BACKEND_URL + "/api/reviews", {building: marker.getTitle()}).then((response) => {
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
}

function convertRating(rating){
    return "★"
}

function addCurrentPositionMarker(map){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            new google.maps.Marker({
                position: pos,
                map: map,
                title: "Current location",
                icon: "./images/locationMarker.png",
              });
        });
    }
    else{
        console.log("Location not found")
    }
}

function createCurrentLocationButton(map){
    const locationButton = document.createElement("button");
    locationButton.style.color = "black";
    locationButton.textContent = "Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(locationButton);
    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            }
            map.setCenter(pos)
            map.setZoom(16)
        },
        () => {
            alert("Location services unavailable")
        })} 
        else {
            alert("Location services unavailable")
        }
    })
}

function createMap(){
    const uvaCoords = { lat: 38.0342, lng: -78.5080 }
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

const hamburgerToggle = document.getElementsByClassName("hamburgerToggle")[0]
const navbarLinks = document.getElementsByClassName("navbarLinks")[0]
hamburgerToggle.addEventListener("click", () => {
    navbarLinks.classList.toggle("active")
})

function generateReviews(){
    const random = Math.floor(Math.random() * waterFountainData.length)
    const fountainData = waterFountainData[random]
    const building = fountainData[1]
    const fountainList = fountainData[2]
    const fountain = fountainList[Math.floor(Math.random() * fountainList.length)]
    const temp = generator()
    let flow = generator()
    if(flow<5){
        flow++
    }
    console.log(building)
    console.log(fountain)
    console.log("Temp: " + temp)
    console.log("Flow: " + flow)

    axios.post(BACKEND_URL + "/api/create", {
        building: building, 
        fountain: fountain, 
        temp: temp, 
        flow: flow
    }).then(() => {
        console.log("Successful")
    })
}

function generator(){
    const random = Math.floor(Math.random() * 101);
    if(random>75){
        return 5
    }
    if(random>40){
        return 4
    }
    if(random>20){
        return 3
    }
    if(random>8){
        return 2
    }
    return 1
}