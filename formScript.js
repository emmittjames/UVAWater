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