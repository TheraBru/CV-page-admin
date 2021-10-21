
let schoolContainer = document.getElementById("schoolContainer");
let schoolName = document.getElementById("schoolName"); 
let programname = document.getElementById("programname"); 
let degree = document.getElementById("degree"); 
let schoolStartdate = document.getElementById("schoolStartdate"); 
let schoolEnddate = document.getElementById("schoolEnddate"); 

function writeSchool(){
    fetch(restURLSchool)
    .then((res)=> res.json())
    .then((data)=>{
        for(let i = 0; i < data.length; i++){
            let school = data[i];
            let startdate= school.startdate.substring(0, 7).split('-')
            let enddate= school.enddate.substring(0, 7).split('-')
            startdate = startdate[0] + '/' + startdate[1];
            enddate = enddate[0] + '/' + enddate[1];
            if (enddate.substring(0,1)== "0"){
                enddate = ""
            }
            schoolContainer.innerHTML = schoolContainer.innerHTML + `<li> <button id="schoolBtn${school.id}"> 
            <div> 
                <h4> ${school.schoolname}</h4> 
                <p><b>Programname: </b>${school.programname}</p>
                <p>${school.degree}</p>
            </div>
            <div>    
                <p>${startdate} - ${enddate}</p>
                <button id="updateSchool${school.id}">Redigera</button>
                <button id="deleteSchool${school.id}">Radera</button>
                <i class="fas fa-sort-down mypageArrow"></i>
            </div>
            </button> 
            <div id="schoolID${school.id}">
            </div>
            <h5>Lägg till ny kurs till ${school.programname}</h5>
            <fieldset>
                <form action="" id="courseForm${school.id}">
                    <label for="courseName">Kursnamn:</label>
                    <input type="text" name="courseName" id="courseName${i}" required>
                    <label for="courseStartdate">Startdatum:</label>
                    <input type="date" name="courseStartdate" id="courseStartdate${i}" required>
                    <label for="schoolEnddate">Slutdatum:</label>
                    <input type="date" name="schoolEnddate" id="courseEnddate${i}">
                    <input type="submit" value="Lägg till">
                </form>
            </fieldset>
            `
        };
        deleteSchoolEventListener(data);
        updateSchoolEventListener(data);
        createCourseEventListener(data);
    })
}

writeSchool();

function deleteSchoolEventListener(schoolArray){
    for(let i = 0; i < schoolArray.length; i++){
        let school = schoolArray[i];
        document.getElementById("deleteSchool" + school.id).addEventListener("click", () => deleteSchool(school.id));
    }
}

function updateSchoolEventListener(schoolArray){
    for(let i = 0; i < schoolArray.length; i++){
        let school = schoolArray[i];
        document.getElementById("updateSchool" + school.id).addEventListener("click", () => updateSchool(school.id));
    }
}

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
            thisSchool.innerHTML = thisSchool.innerHTML + `<div id="courseID${course.id}">
                <h5> ${course.name}</h5>   
                <p>${startdate} - ${enddate}</p>
                <button id="updateCourse${course.id}">Redigera</button>
                <button id="deleteCourse${course.id}">Radera</button>
            </div>
            </li>`
        };
        deleteCourseEventListener(data);
        updateCourseEventListener(data);
    })
}


// Add eventlistener to the submit button
document.getElementById("schoolForm").addEventListener("submit", formHandlerSchool);

// Function that calls the api and posts the written information.
function formHandlerSchool(){

    let newSchool = {"schoolname": schoolName.value, "programname": programname.value, "degree": degree.value,"startdate": schoolStartdate.value, "enddate": schoolEnddate.value}
    
    fetch(restURLSchool,{
        method: 'POST',
        body: JSON.stringify(newSchool)
    })
}

function updateCourseEventListener(courseArray){
    for(let i = 0; i < courseArray.length; i++){
        let course = courseArray[i];
        document.getElementById("updateCourse" + course.id).addEventListener("click", () => updateCourse(course.id));
    }
}

function deleteCourseEventListener(courseArray){
    for(let i = 0; i < courseArray.length; i++){
        let course = courseArray[i];
        document.getElementById("deleteCourse" + course.id).addEventListener("click", () => deleteCourse(course.id));
    }
}

// Function that calls the api and posts the written information.
function formHandlerCourse(courseName, courseStartDate, courseEndDate, schoolID){

    let newCourse = {"name": courseName, "startdate": courseStartDate, "enddate": courseEndDate, "schoolid": schoolID}
    
    fetch(restURLCourses,{
        method: 'POST',
        body: JSON.stringify(newCourse)
    })
}

function deleteSchool(id){
    fetch(restURLSchool + "&id=" + id,{
        method: 'DELETE'
    })
    .then(()=>{
        window.location.reload();
    })
}

function deleteCourse(id){
    fetch(restURLCourses + "&id=" + id,{
        method: 'DELETE'
    })
    .then(()=>{
        window.location.reload();
    })
}

function updateSchool(id){

    let updateForm = document.getElementById("updateSchoolContainer");
    let schoolNameInForm = document.getElementById("updateSchoolName"); 
    let programnameInForm = document.getElementById("updateProgramname"); 
    let degreeInForm = document.getElementById("updateDegree"); 
    let schoolStartdateInForm = document.getElementById("updateSchoolStartdate"); 
    let schoolEnddateInForm = document.getElementById("updateSchoolEnddate"); 

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
    .then(()=>
    document.getElementById("updateSchoolForm").addEventListener("click", () => updateSchoolPut(id))
    )
}

function updateSchoolPut(id){

    let updatedSchoolName = document.getElementById("updateSchoolName").value; 
    let updatedProgramName = document.getElementById("updateProgramname").value; 
    let updatedDegree = document.getElementById("updateDegree").value; 
    let updatedStartDate = document.getElementById("updateSchoolStartdate").value; 
    let updatedEndDate = document.getElementById("updateSchoolEnddate").value; 

    let updatedSchool = {"schoolname": updatedSchoolName, "programname": updatedProgramName, "degree": updatedDegree, "startdate": updatedStartDate, "enddate": updatedEndDate}
    
    fetch(restURLSchool + "&id=" + id,{
        method: 'PUT',
        body: JSON.stringify(updatedSchool)
    })
}

function updateCourse(id){

    let updateForm = document.getElementById("updateCourseContainer");
    let courseNameInForm = document.getElementById("updateCourseName"); 
    let courseStartdateInForm = document.getElementById("updateCourseStartdate"); 
    let courseEnddateInForm = document.getElementById("updateCourseEnddate"); 

    fetch(restURLCourses + "&id=" + id)
    .then((res)=> res.json())
    .then((data)=>{
        let thisCourse = data[0];
        updateForm.style.display = "block";
        courseNameInForm.value = thisCourse.name;
        courseStartdateInForm.value = thisCourse.startdate;
        courseEnddateInForm.value = thisCourse.enddate;
        document.getElementById("updateCourseForm").addEventListener("click", () => updateCoursePut(id, thisCourse.schoolid))
    })
}

function updateCoursePut(id, schoolid){

    let updatedCourseName = document.getElementById("updateCourseName").value; 
    let updatedStartDate = document.getElementById("updateCourseStartdate").value; 
    let updatedEndDate = document.getElementById("updateCourseEnddate").value; 

    let updatedCourse = {"name": updatedCourseName, "startdate": updatedStartDate, "enddate": updatedEndDate, "schoolid": schoolid}
    
    fetch(restURLCourses + "&id=" + id,{
        method: 'PUT',
        body: JSON.stringify(updatedCourse)
    })
}