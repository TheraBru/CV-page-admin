"use strict";

// Code to be run at loading of page
// Check if session storage is set opens login page otherwhise
if (sessionStorage.getItem('inloggad') == userName)
        {
        
        }
        else
        {
            location.replace("login.html");
        }
