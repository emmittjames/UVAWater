function sendEmail(){
    const message = document.getElementById("message").value
    axios.post(BACKEND_URL + "/email", {
        message: message
    }).then(() => {
        console.log("Email successful")
    })
}

const hamburgerToggle = document.getElementsByClassName("hamburgerToggle")[0]
const navbarLinks = document.getElementsByClassName("navbarLinks")[0]
hamburgerToggle.addEventListener("click", () => {
    navbarLinks.classList.toggle("active")
})