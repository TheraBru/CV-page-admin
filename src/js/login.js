// Code controlling login page
// Declaring variables as the login form inputs
let userNameInForm = document.getElementById("userName"); 
let passwordInForm = document.getElementById("password"); 

// Eventlistener for the log in button
document.getElementById("loginBtn").addEventListener("click", checklogin);

// Function that checks if input info matches login info and saves to session storage if it does.
function checklogin(){
    event.preventDefault();
    if (userNameInForm.value == userName && passwordInForm.value == password){
        sessionStorage.setItem("inloggad", userName);
        location.replace("index.html");
    
    }else{
        document.getElementById("errorMsg").style.display = "inline-block";
    }
}

