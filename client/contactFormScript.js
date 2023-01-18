function sendEmail(){
    const message = document.getElementById("message").value
    axios.post(BACKEND_URL + "/email", {
        message: message
    }).then(() => {
        console.log("Email successful")
    })

    /*Email.send({
        Host: "smtp.elasticemail.com",
        Username: "yeeyeehaircut2003@gmail.com",
        Password: "Emmitt123!",
        To: 'emmittjames1@gmail.com',
        From: "yeeyeehaircut2003@gmail.com",
        Subject: "Sending Email using javascript",
        Body: message,
    })
    .then(function (message) {
        console.log("Email sent successfully")
    });*/

    alert("Thank you for your feedback")
}

const hamburgerToggle = document.getElementsByClassName("hamburgerToggle")[0]
const navbarLinks = document.getElementsByClassName("navbarLinks")[0]
hamburgerToggle.addEventListener("click", () => {
    navbarLinks.classList.toggle("active")
})