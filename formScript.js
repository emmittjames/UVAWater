var selection = document.getElementById("fountainSelect")
const waterFountains = [
    [{ lat: 38.0325, lng: -78.5051 }, "New Cabell Hall", ["5th floor", "4th floor", "3rd floor", "2nd floor", "1st floor"]],
    [{ lat: 38.0316, lng: -78.5108 }, "Rice Hall", ["5th floor", "4th floor", "3rd floor", "2nd floor", "1st floor"]],
    [{ lat: 38.0364, lng: -78.5061 }, "Clemons Library", ["4th floor", "3rd floor", "2nd floor", "1st floor"]]
]
waterFountains.forEach(([coords, name, fountainLocations]) => {
    fountainLocations.forEach((location) => {
        var option = document.createElement("option")
        option.value = name + " " + location
        option.text = name + " " + location
        selection.appendChild(option)
    })
})

function collectData(){
    let fountain = document.getElementById("fountain").value
    console.log(fountain)

    console.log("Temp: " + selectedTempRating())
    console.log("Flow: " + selectedFlowRating())

    alert("Your response has been recorded. Thank you!")    
}

function selectedTempRating(){
    const temps = document.getElementsByName("temp")
    for(let i=0;i<temps.length;i++){
        if(temps[i].checked){
            return 5-i
        }
    }
    return -1
}

function selectedFlowRating(){
    const temps = document.getElementsByName("flow")
    for(let i=0;i<temps.length;i++){
        if(temps[i].checked){
            return 5-i
        }
    }
    return -1
}