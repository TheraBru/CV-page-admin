let portfolioContainer = document.getElementById("portfolioContainer"); 
let websiteTitle = document.getElementById("websiteTitle"); 
let websiteDesc = document.getElementById("websiteDesc"); 
let websiteURL = document.getElementById("websiteURL"); 


function portfolioWriter(){
    fetch(restURLWebsites)
    .then((res)=> res.json())
    .then((data)=>{
        data.forEach(website => {
            portfolioContainer.innerHTML = portfolioContainer.innerHTML + `<article> 
            <h3> ${website.title}</h3> 
            <p><b>Beskrivning:</b>${website.description}</p>
            <p><b>Länk: </b><a href="${website.url}">${website.url}</a></p>
            <button id="updateWebsite${website.id}" class="button editBtn">Redigera</button>
            <button id="deletePortfolio${website.id}" class="button eraseBtn">Radera</button>
            </article>`
        });
        deletePortfolioEventListener(data);
        updatePortfolioEventListener(data);
    })
}

portfolioWriter();

// Add eventlistener to the submit button
document.getElementById("websiteForm").addEventListener("submit", formHandlerWebsite);

// Function that calls the api and posts the written information.
function formHandlerWebsite(){

    let newWebsite = {"title": websiteTitle.value,"description": websiteDesc.value,"url": websiteURL.value}
    
    fetch(restURLWebsites,{
        method: 'POST',
        body: JSON.stringify(newWebsite)
    })
}

function deletePortfolioEventListener(portfolioArray){
    for(let i = 0; i < portfolioArray.length; i++){
        let portfolio = portfolioArray[i];
        document.getElementById("deletePortfolio" + portfolio.id).addEventListener("click", () => deletePortfolio(portfolio.id));
    }
}

function deletePortfolio(id){
    fetch(restURLWebsites + "&id=" + id,{
        method: 'DELETE'
    })
    .then(()=>{
        window.location.reload();
    })
}

function updatePortfolioEventListener(portfolioArray){
    for(let i = 0; i < portfolioArray.length; i++){
        let website = portfolioArray[i];
        document.getElementById("updateWebsite"+website.id).addEventListener("click", () => updateWebsite(website.id));
    }
}

function updateWebsite(id){

    let updateForm = document.getElementById("updateWebsiteContainer");
    let websiteTitleInForm = document.getElementById("updateWebsiteTitle"); 
    let websiteDescInForm = document.getElementById("updateWebsiteDesc"); 
    let websiteURLInForm = document.getElementById("updateWebsiteURL"); 

    fetch(restURLWebsites + "&id=" + id)
    .then((res)=> res.json())
    .then((data)=>{
        let thisWebsite = data[0];
        updateForm.style.display = "block";
        websiteTitleInForm.value = thisWebsite.title;
        websiteDescInForm.value = thisWebsite.description;
        websiteURLInForm.value = thisWebsite.url;
        document.getElementById("updateWebsiteForm").addEventListener("click", () => updateWebsitePut(id));
    })
}

function updateWebsitePut(id){

    let updatedWebsiteTitle = document.getElementById("updateWebsiteTitle").value; 
    let websiteDescInForm = document.getElementById("updateWebsiteDesc").value; 
    let websiteURLInForm = document.getElementById("updateWebsiteURL").value; 

    let updatedWebsite = {"title": updatedWebsiteTitle, "description": websiteDescInForm, "url": websiteURLInForm}
    
    fetch(restURLWebsites + "&id=" + id,{
        method: 'PUT',
        body: JSON.stringify(updatedWebsite)
    })
}