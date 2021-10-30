// Code controlling the school and course information
// declaring global variables the input from form
let schoolContainer = document.getElementById("schoolContainer");
let schoolName = document.getElementById("schoolName"); 
let programname = document.getElementById("programname"); 
let degree = document.getElementById("degree"); 
let schoolStartdate = document.getElementById("schoolStartdate"); 
let schoolEnddate = document.getElementById("schoolEnddate"); 

// Function writing out school information
function writeSchool(){
    fetch(restURLSchool)
    .then((res)=> res.json())
    .then((data)=>{
        for(let i = 0; i < data.length; i++){
            let school = data[i];

            // Rewriting date into year/month format
            let startdate= school.startdate.substring(0, 7).split('-')
            let enddate= school.enddate.substring(0, 7).split('-')
            startdate = startdate[0] + '/' + startdate[1];
            enddate = enddate[0] + '/' + enddate[1];
            if (enddate.substring(0,1)== "0"){
                enddate = ""
            }
            // Writing out the information
            schoolContainer.innerHTML = schoolContainer.innerHTML + 
            `<li>
                <div class="flexContainer"> 
                    <div>
                        <button class="foldingBtn" id="schoolBtn${school.id}"> 
                            <div> 
                                <h4> ${school.schoolname}</h4> 
                                <p>${school.programname}</p>
                                <p>${school.degree}</p>
                            </div>
                            <div>    
                                <p>${startdate} - ${enddate}</p>
                            </div>
                            <i class="fas fa-sort-down mypageArrow"></i>
                        </button> 
                        <div class="foldingText"> 
                            <div id="schoolID${school.id}">
                            </div>
                            <h5>Lägg till ny kurs till ${school.programname}</h5>
                            <fieldset class="courseForm">
                                <form action="#" id="courseForm${school.id}">
                                    <label for="courseName${i}">Kursnamn:</label>
                                    <input type="text" name="courseName" id="courseName${i}" required>
                                    <label for="courseStartdate${i}">Startdatum:</label>
                                    <input type="date" name="courseStartdate" id="courseStartdate${i}" required>
                                    <label for="courseEnddate${i}">Slutdatum:</label>
                                    <input type="date" name="schoolEnddate" id="courseEnddate${i}">
                                    <input type="submit" value="Lägg till" class="button editBtn">
                                </form>
                            </fieldset>
                        </div>
                    </div>
                    <div class="btnDiv">
                        <button id="updateSchool${school.id}" class="button editBtn">Redigera</button>
                        <button id="deleteSchool${school.id}" class="button eraseBtn">Radera</button>
                    </div>
                </div>
            </li>
            `
        };
        deleteSchoolEventListener(data);
        updateSchoolEventListener(data);
        createCourseEventListener(data);
        buttonFolder()
    })
}

writeSchool();

// Eventlisteners for school
// Eventlistener for deleting school
function deleteSchoolEventListener(schoolArray){
    for(let i = 0; i < schoolArray.length; i++){
        let school = schoolArray[i];
        document.getElementById("deleteSchool" + school.id).addEventListener("click", () => deleteSchool(school.id));
    }
}

// Eventlistener for updating school
function updateSchoolEventListener(schoolArray){
    for(let i = 0; i < schoolArray.length; i++){
        let school = schoolArray[i];
        document.getElementById("updateSchool" + school.id).addEventListener("click", () => updateSchool(school.id));
    }
}

// Add eventlistener to the submit button
document.getElementById("schoolForm").addEventListener("submit", formHandlerSchool);

// Eventlisteners for courses
// Eventlistener for updating course
function updateCourseEventListener(courseArray){
    for(let i = 0; i < courseArray.length; i++){
        let course = courseArray[i];
        document.getElementById("updateCourse" + course.id).addEventListener("click", () => updateCourse(course.id));
    }
}

// Eventlistener for deleting course
function deleteCourseEventListener(courseArray){
    for(let i = 0; i < courseArray.length; i++){
        let course = courseArray[i];
        document.getElementById("deleteCourse" + course.id).addEventListener("click", () => deleteCourse(course.id));
    }
}

// Eventlistener for creating course
function createCourseEventListener(schoolArray){
    for(let i = 0; i < schoolArray.length; i++){
        let school = schoolArray[i];
        document.getElementById("courseForm"+ school.id).addEventListener("submit", () => formHandlerCourse(document.getElementById("courseName" + i).value,
        document.getElementById("courseStartdate" + i).value,
        document.getElementById("courseEnddate" + i).value,
        school.id));
    }
    writeCourses();
}

// Function to write courses
function writeCourses(){
    fetch(restURLCourses)
    .then((res)=>res.json())
    .then((data)=>{
        for(let i = 0; i < data.length; i++){
            let course = data[i];
            let startdate= course.startdate.substring(0, 7).split('-')
            let enddate= course.enddate.substring(0, 7).split('-')
            startdate = startdate[0] + '/' + startdate[1];
            enddate = enddate[0] + '/' + enddate[1];
            if (enddate.substring(0,1)== "0"){
                enddate = ""
            }
            let thisSchool = document.getElementById("schoolID"+ course.schoolid);
            thisSchool.innerHTML = thisSchool.innerHTML + `<div class="courseClass" id="courseID${course.id}">
                <h5> ${course.name}</h5>   
                <p>${startdate} - ${enddate}</p>
                <button id="updateCourse${course.id}" class="button editBtn">Redigera</button>
                <button id="deleteCourse${course.id}" class="button eraseBtn">Radera</button>
            </div>
            </li>`
        };
        deleteCourseEventListener(data);
        updateCourseEventListener(data);
    })
}




// Function that calls the api and posts the written information.
function formHandlerSchool(){

    let newSchool = {"schoolname": schoolName.value, "programname": programname.value, "degree": degree.value,"startdate": schoolStartdate.value, "enddate": schoolEnddate.value}
    
    fetch(restURLSchool,{
        method: 'POST',
        body: JSON.stringify(newSchool)
    })
}

// Function that calls the api and posts the written information.
function formHandlerCourse(courseName, courseStartDate, courseEndDate, schoolID){

    let newCourse = {"name": courseName, "startdate": courseStartDate, "enddate": courseEndDate, "schoolid": schoolID}
    
    fetch(restURLCourses,{
        method: 'POST',
        body: JSON.stringify(newCourse)
    })
}

// function to delete school
function deleteSchool(id){
    fetch(restURLSchool + "&id=" + id,{
        method: 'DELETE'
    })
    .then(()=>{
        window.location.reload();
    })
}

// function to delete course
function deleteCourse(id){
    fetch(restURLCourses + "&id=" + id,{
        method: 'DELETE'
    })
    .then(()=>{
        window.location.reload();
    })
}

// Functions to update school
function updateSchool(id){

    // Declaring variables to update school form inputs
    let updateForm = document.getElementById("updateSchoolContainer");
    let schoolNameInForm = document.getElementById("updateSchoolName"); 
    let programnameInForm = document.getElementById("updateProgramname"); 
    let degreeInForm = document.getElementById("updateDegree"); 
    let schoolStartdateInForm = document.getElementById("updateSchoolStartdate"); 
    let schoolEnddateInForm = document.getElementById("updateSchoolEnddate"); 

    // Fetching information of school with that id and puts it into the form inputs
    fetch(restURLSchool + "&id=" + id)
    .then((res)=> res.json())
    .then((data)=>{
        let thisSchool = data[0];
        updateForm.style.display = "block";
        schoolNameInForm.value = thisSchool.schoolname;
        programnameInForm.value = thisSchool.programname;
        degreeInForm.value = thisSchool.degree;
        schoolStartdateInForm.value = thisSchool.startdate;
        schoolEnddateInForm.value = thisSchool.enddate;
    })
    .then(()=>{
    document.getElementById("updateSchoolForm").addEventListener("click", () => updateSchoolPut(id));
})
}

// Function to put school information into REST
function updateSchoolPut(id){

    // Declaring variables as form inputted information
    let updatedSchoolName = document.getElementById("updateSchoolName").value; 
    let updatedProgramName = document.getElementById("updateProgramname").value; 
    let updatedDegree = document.getElementById("updateDegree").value; 
    let updatedStartDate = document.getElementById("updateSchoolStartdate").value; 
    let updatedEndDate = document.getElementById("updateSchoolEnddate").value; 

    let updatedSchool = {"schoolname": updatedSchoolName, "programname": updatedProgramName, "degree": updatedDegree, "startdate": updatedStartDate, "enddate": updatedEndDate}
    
    // Put information into REST
    fetch(restURLSchool + "&id=" + id,{
        method: 'PUT',
        body: JSON.stringify(updatedSchool)
    })
}

// Functions to update courses
function updateCourse(id){

    // Declaring variables as form input
    let updateForm = document.getElementById("updateCourseContainer");
    let courseNameInForm = document.getElementById("updateCourseName"); 
    let courseStartdateInForm = document.getElementById("updateCourseStartdate"); 
    let courseEnddateInForm = document.getElementById("updateCourseEnddate"); 

    // Fetching API information for course with that id and puts that info into the input
    fetch(restURLCourses + "&id=" + id)
    .then((res)=> res.json())
    .then((data)=>{
        let thisCourse = data[0];
        updateForm.style.display = "block";
        courseNameInForm.value = thisCourse.name;
        courseStartdateInForm.value = thisCourse.startdate;
        courseEnddateInForm.value = thisCourse.enddate;
        document.getElementById("updateCourseForm").addEventListener("click", () => updateCoursePut(id, thisCourse.schoolid));
    })
}

// Function to put info to REST
function updateCoursePut(id, schoolid){

    // Declaring variables as inputted input values from update form
    let updatedCourseName = document.getElementById("updateCourseName").value; 
    let updatedStartDate = document.getElementById("updateCourseStartdate").value; 
    let updatedEndDate = document.getElementById("updateCourseEnddate").value; 

    let updatedCourse = {"name": updatedCourseName, "startdate": updatedStartDate, "enddate": updatedEndDate, "schoolid": schoolid}
    
    // Put new information into REST
    fetch(restURLCourses + "&id=" + id,{
        method: 'PUT',
        body: JSON.stringify(updatedCourse)
    })
}

