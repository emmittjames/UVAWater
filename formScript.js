var buildingSelect = document.getElementById("buildingSelect")
var fountainSelect = document.getElementById("fountainSelect")
const waterFountains = [
    [{ lat: 38.0325, lng: -78.5051 }, "New Cabell Hall", ["1st floor", "2nd floor", "3rd floor", "4th floor", "5th floor"]],
    [{ lat: 38.0316, lng: -78.5108 }, "Rice Hall", ["1st floor", "2nd floor", "3rd floor", "4th floor", "5th floor"]],
    [{ lat: 38.0364, lng: -78.5061 }, "Clemons Library", ["1st floor", "2nd floor", "3rd floor", "4th floor"]]
]
waterFountains.forEach(([coords, name, fountainLocations]) => {
    var option = document.createElement("option")
    option.value = name
    option.text = name
    buildingSelect.appendChild(option)
})
updateWaterFountains()

document.querySelector("#buildingSelect").addEventListener("change",function(){
    updateWaterFountains()
})

function updateWaterFountains(){
    for(let i=fountainSelect.options.length-1;i>=0;i--){
        fountainSelect.remove(i)
    }
    waterFountains.forEach(([coords, name, fountainLocations]) => {
        if(name === buildingSelect.value){
            fountainLocations.forEach((location) => {
                var option = document.createElement("option")
                option.value = location
                option.text =  location
                fountainSelect.appendChild(option)
            })
        }
    })
}

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