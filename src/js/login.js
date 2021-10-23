let userNameInForm = document.getElementById("userName"); 
let passwordInForm = document.getElementById("password"); 


document.getElementById("loginBtn").addEventListener("click", checklogin);

function checklogin(){
    event.preventDefault();
    if (userNameInForm.value == userName && passwordInForm.value == password){
        sessionStorage.setItem("inloggad", userName);
        location.replace("index.html");
    
    }else{
        document.getElementById("errorMsg").style.display = "inline-block";
    }
}

