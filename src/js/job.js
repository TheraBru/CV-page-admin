let jobContainer = document.getElementById("jobContainer");
let jobTitle = document.getElementById("jobTitle"); 
let workplace = document.getElementById("workplace"); 
let jobStartdate = document.getElementById("jobStartdate"); 
let jobEnddate = document.getElementById("jobEnddate"); 

function writeJobs(){
    fetch(restURLJobs)
    .then((res)=>res.json())
    .then((data)=>{
        data.forEach(job => {
            let startdate= job.startdate.substring(0, 7).split('-')
            let enddate= job.enddate.substring(0, 7).split('-')
            startdate = startdate[0] + '/' + startdate[1];
            enddate = enddate[0] + '/' + enddate[1];
            if (enddate.substring(0,1)== "0"){
                enddate = ""
            }
            jobContainer.innerHTML = jobContainer.innerHTML + `<li> 
            <h4> ${job.title}</h4> 
            <p>${job.workplace}</p>
            <p>${startdate} - ${enddate}</p>
            <button id="updateJob${job.id}">Redigera</button>
            <button id="deleteJob${job.id}">Radera</button>
            </li>`
        });
        deleteJobEventListener(data);
        updateJobEventListener(data);
    })
};

writeJobs();

// Add eventlistener to the submit button
document.getElementById("jobForm").addEventListener("submit", formHandlerJob);

// Function that calls the api and posts the written information.
function formHandlerJob(){

    let newJob = {"title": jobTitle.value,"workplace": workplace.value,"startdate": jobStartdate.value, "enddate": jobEnddate.value}
    
    fetch(restURLJobs,{
        method: 'POST',
        body: JSON.stringify(newJob)
    })
}

function deleteJobEventListener(jobArray){
    for(let i = 0; i < jobArray.length; i++){
        let job = jobArray[i];
        document.getElementById("deleteJob" + job.id).addEventListener("click", () => deleteJob(job.id));
    }
}

function deleteJob(id){
    fetch(restURLJobs + "&id=" + id,{
        method: 'DELETE'
    })
    .then(()=>{
        window.location.reload();
    })
}

function updateJobEventListener(jobArray){
    for(let i = 0; i < jobArray.length; i++){
        let job = jobArray[i];
        document.getElementById("updateJob"+job.id).addEventListener("click", () => updateJob(job.id));
    }
}

function updateJob(id){

    let updateForm = document.getElementById("updateJobContainer");
    let jobTitleInForm = document.getElementById("updateJobTitle"); 
    let workplaceInForm = document.getElementById("updateWorkplace"); 
    let jobStartdateInForm = document.getElementById("updateJobStartdate"); 
    let jobEnddateInForm = document.getElementById("updateJobEnddate"); 

    fetch(restURLJobs + "&id=" + id)
    .then((res)=> res.json())
    .then((data)=>{
        let thisJob = data[0];
        updateForm.style.display = "block";
        jobTitleInForm.value = thisJob.title;
        workplaceInForm.value = thisJob.workplace;
        jobStartdateInForm.value = thisJob.startdate;
        jobEnddateInForm.value = thisJob.enddate;
        document.getElementById("updateJobForm").addEventListener("click", () => updateJobPut(id))
    })
}

function updateJobPut(id){

    let updatedJobTitle = document.getElementById("updateJobTitle").value; 
    let updatedWorkplace = document.getElementById("updateWorkplace").value; 
    let updatedJobStartdate = document.getElementById("updateJobStartdate").value; 
    let updatedJobEnddate = document.getElementById("updateJobEnddate").value; 

    let updatedJob = {"title": updatedJobTitle, "workplace": updatedWorkplace, "startdate": updatedJobStartdate, "enddate": updatedJobEnddate}
    
    fetch(restURLJobs + "&id=" + id,{
        method: 'PUT',
        body: JSON.stringify(updatedJob)
    })
}

