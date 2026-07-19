//=============================
// BASE URL
//=============================

// const BASE_URL = "https://hiringnest-trail-backend-code.onrender.com";

const BASE_URL = "https://hiringnest-trail-backend-code.onrender.com";

const token =
    localStorage.getItem("jwt") ||
    localStorage.getItem("token");

//=============================
// PAGE LOAD
//=============================

document.addEventListener("DOMContentLoaded", () => {

    loadCounts();

    loadApplications();

    document.getElementById("printBtn").onclick = () => window.print();

    document.getElementById("pdfBtn").onclick = () => {
        alert("PDF Export Coming Soon...");
    };

    document.getElementById("excelBtn").onclick = () => {
        alert("Excel Export Coming Soon...");
    };

});

//=============================
// COMMON FETCH
//=============================

async function api(url){

    const response = await fetch(url,{
        headers:{
            "Authorization":"Bearer "+token,
            "Content-Type":"application/json"
        }
    });

    if(!response.ok){
        throw new Error("API Failed");
    }

    return await response.json();

}

//=============================
// LOAD COUNTS
//=============================

async function loadCounts(){

    try{

        const students =
            await api(BASE_URL+"/api/admin/student-count");

        const recruiters =
            await api(BASE_URL+"/api/admin/recruiter-count");

        const jobs =
            await api(BASE_URL+"/api/admin/job-count");

        const applications =
            await api(BASE_URL+"/api/admin/application-count");

        document.getElementById("studentCount").innerText =
            students;

        document.getElementById("recruiterCount").innerText =
            recruiters;

        document.getElementById("jobCount").innerText =
            jobs;

        document.getElementById("applicationCount").innerText =
            applications;

        loadCharts(
            students,
            recruiters,
            jobs,
            applications
        );

    }

    catch(e){

        console.error(e);

    }

}

//=============================
// LOAD APPLICATIONS
//=============================

async function loadApplications(){

    try{

        const apps =
            await api(BASE_URL+"/api/jobs/applications");

        console.log(apps);

        const tbody =
            document.getElementById("recentApplications");

        tbody.innerHTML="";

        apps.forEach((a,index)=>{

            tbody.innerHTML +=`

            <tr>

            <td>${index+1}</td>

            <td>${a.studentName}</td>

            <td>${a.jobTitle}</td>

            <td>${a.companyName}</td>

            <td>

            <span class="status ${a.status.toLowerCase()}">

            ${a.status}

            </span>

            </td>

            </tr>

            `;

        });

    }

    catch(e){

        console.log(e);

    }

}

//=============================
// CHARTS
//=============================

function loadCharts(students,recruiters,jobs,applications){

//---------------------------
// BAR
//---------------------------

new Chart(barChart,{

type:"bar",

data:{

labels:[
"Students",
"Recruiters",
"Jobs",
"Applications"
],

datasets:[{

label:"Statistics",

data:[
students,
recruiters,
jobs,
applications
]

}]

}

});

//---------------------------
// PIE
//---------------------------

new Chart(pieChart,{

type:"pie",

data:{

labels:[
"Students",
"Recruiters",
"Jobs",
"Applications"
],

datasets:[{

data:[
students,
recruiters,
jobs,
applications
]

}]

}

});

//---------------------------
// DOUGHNUT
//---------------------------

new Chart(doughnutChart,{

type:"doughnut",

data:{

labels:[
"Students",
"Recruiters",
"Jobs",
"Applications"
],

datasets:[{

data:[
students,
recruiters,
jobs,
applications
]

}]

}

});

//---------------------------
// LINE
//---------------------------

new Chart(lineChart,{

type:"line",

data:{

labels:[
"Students",
"Recruiters",
"Jobs",
"Applications"
],

datasets:[{

label:"Growth",

data:[
students,
recruiters,
jobs,
applications
],

fill:false

}]

}

});

//---------------------------
// HORIZONTAL BAR
//---------------------------

new Chart(horizontalChart,{

type:"bar",

data:{

labels:[
"Students",
"Recruiters",
"Jobs",
"Applications"
],

datasets:[{

data:[
students,
recruiters,
jobs,
applications
]

}]

},

options:{

indexAxis:"y"

}

});

}

//=============================
// SEARCH
//=============================

document.getElementById("searchInput")
.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

document.querySelectorAll("#recentApplications tr")
.forEach(row=>{

row.style.display=
row.innerText.toLowerCase().includes(value)
?"":"none";

});

});