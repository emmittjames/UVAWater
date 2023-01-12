var buildingSelect = document.getElementById("buildingSelect")
var fountainSelect = document.getElementById("fountainSelect")
const waterFountains = waterFountainData
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
    const building = document.getElementById("buildingSelect").value
    const fountain = document.getElementById("fountainSelect").value
    const temp = selectedTempRating()
    const flow = selectedFlowRating()
    if(temp<0 || flow<0){
        return
    }

    console.log(building)
    console.log(fountain)
    console.log("Temp: " + temp)
    console.log("Flow: " + flow)
    
    axios.post("http://localhost:3000/create", {
        building: building, 
        fountain: fountain, 
        temp: temp, 
        flow: flow
    }).then(() => {
        console.log("Successful")
    })

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