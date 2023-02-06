function getTotalReviews(){
    axios.post(BACKEND_URL + "/api/totalreviews").then((response) => {
        const totalReviews = response.data[0]["count(*)"]
        document.getElementById("totalReviews").innerHTML = "Total reviews: " + totalReviews
    })
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

function getTop3Fountains(){
    let eligileFountains = []

    waterFountainData.forEach(([coords, name, fountainLocations]) => {
        axios.post(BACKEND_URL + "/api/reviews", {building: waterFountainData[i][1]}).then((response) => {
            const data = response.data
            fountainLocations.forEach((location) => {
                const locationRating = getLocationRating(data, location)
                if(locationRating[3]>=5){
                    const locationRatingOverall = locationRating[0]
                    const ratingAmount = locationRating[3]
                    eligileFountains.push([location, ])
                }
            })
            infoWindow.setContent(html)
            infoWindow.open(map, marker)
        })
    })
}

// const totalReviews = document.getElementById("totalReviews")
// totalReviews.innerHTML = "Total reviews: " + getTotalReviews()
getTotalReviews()