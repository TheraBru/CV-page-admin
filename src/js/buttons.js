"use strict";

let closeButtons = document.getElementsByClassName("closeBtn");
for(let i = 0; i < closeButtons.length; i++){
    closeButtons[i].addEventListener("click", () => closeWindow());
}


function buttonFolder(){
    let foldingButtons = document.getElementsByClassName("foldingBtn");

    for (let i = 0; i < foldingButtons.length; i++) {
    
        // adds eventlistener for when folding button is clicked.
        foldingButtons[i].addEventListener("click", function () {
    
            let foldingText = this.nextElementSibling;
    
            // Targets next sibling of the folding button and displays it if it is not
            // displayed now and hides it if it is. 
            if (foldingText.style.display === "block") {
                foldingText.style.display = "none";
    
                foldingText.style.borderBottom = "none";
    
                this.setAttribute("aria-expanded", "false");
    
                this.lastElementChild.classList.remove("fa-sort-up");
                this.lastElementChild.classList.add("fa-sort-down");
    
    
    
            } else {
                foldingText.style.display = "block";
    
                this.setAttribute("aria-expanded", "true");
    
                this.lastElementChild.classList.remove("fa-sort-down");
                this.lastElementChild.classList.add("fa-sort-up");
    
            }
        })
    }
}

function closeWindow(){
    if (document.getElementById("updateCourseContainer").style.display == "block"){

        document.getElementById("updateCourseContainer").style.display = "none"

    } else if (document.getElementById("updateSchoolContainer").style.display == "block"){

        document.getElementById("updateSchoolContainer").style.display = "none"

    }else if (document.getElementById("updateJobContainer").style.display == "block"){

        document.getElementById("updateJobContainer").style.display = "none"

    }else if (document.getElementById("updateWebsiteContainer").style.display == "block"){

        document.getElementById("updateWebsiteContainer").style.display = "none"
    }
}
