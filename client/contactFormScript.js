function sendEmail(){
    console.log("email sent")
    alert("Thank you for your feedback")
}

const hamburgerToggle = document.getElementsByClassName("hamburgerToggle")[0]
const navbarLinks = document.getElementsByClassName("navbarLinks")[0]
hamburgerToggle.addEventListener("click", () => {
    navbarLinks.classList.toggle("active")
})