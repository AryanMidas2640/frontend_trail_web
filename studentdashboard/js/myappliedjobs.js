// ======================================
// MY APPLIED JOBS
// ======================================


let appliedJobs = [];
let filteredJobs = [];



// ======================================
// PAGE LOAD
// ======================================

document.addEventListener("DOMContentLoaded", () => {


    console.log("My Applied Jobs Loaded");


    loadAppliedJobs();



    document
    .getElementById("searchApplication")
    .addEventListener(
        "keyup",
        filterApplications
    );



    document
    .getElementById("statusFilter")
    .addEventListener(
        "change",
        filterApplications
    );



    document
    .querySelector(".back-btn")
    .addEventListener(
        "click",
        () => {

            window.location.href =
            "../studentdashboard/studentdashboard.html";

        }
    );


});




// ======================================
// LOAD APPLIED JOBS
// ======================================


async function loadAppliedJobs(){


    try{


        const response =
        await fetch(

            BASE_URL +
            "/api/jobs/my-applied",

            {

                method:"GET",

                headers:authHeaders()

            }

        );



        console.log(
            "STATUS : ",
            response.status
        );



        if(!response.ok){


            alert(
                "Unable to fetch applications"
            );

            return;

        }




        appliedJobs =
        await response.json();



        console.log(
            appliedJobs
        );



        filteredJobs =
        [...appliedJobs];



        updateStats();



        renderApplications(
            filteredJobs
        );



    }
    catch(error){


        console.error(
            error
        );


        alert(
            "Server Error"
        );


    }



}






// ======================================
// UPDATE STATS
// ======================================


function updateStats(){



    document
    .getElementById("totalJobs")
    .innerText =
    appliedJobs.length;



    let pending =
    appliedJobs.filter(
        j =>
        j.status === "Pending"
    ).length;



    let accepted =
    appliedJobs.filter(
        j =>
        j.status === "Accepted"
    ).length;



    let rejected =
    appliedJobs.filter(
        j =>
        j.status === "Rejected"
    ).length;




    document
    .getElementById("pendingJobs")
    .innerText =
    pending;



    document
    .getElementById("acceptedJobs")
    .innerText =
    accepted;



    document
    .getElementById("rejectedJobs")
    .innerText =
    rejected;



}





// ======================================
// RENDER TABLE
// ======================================


function renderApplications(jobs){



    const table =
    document.getElementById(
        "applicationsTable"
    );



    table.innerHTML = "";




    if(jobs.length === 0){


        table.innerHTML = `

        <tr>

        <td colspan="6"
        style="text-align:center;padding:20px;color:red">

        No Applications Found

        </td>

        </tr>

        `;


        return;

    }






    jobs.forEach(job => {



        table.innerHTML += `


        <tr>


            <td>
                ${job.jobId}
            </td>


            <td>
                ${job.jobTitle}
            </td>


            <td>
                ${job.companyName}
            </td>


            <td>

                ${new Date().toLocaleDateString()}

            </td>


            <td>

                <span class="status">

                    ${job.status}

                </span>

            </td>


            <td>

                <button 
                class="view-btn"
                onclick="viewJob('${job.jobId}')">

                    View

                </button>


            </td>



        </tr>


        `;



    });



}






// ======================================
// SEARCH + FILTER
// ======================================


function filterApplications(){



    let search =

    document
    .getElementById("searchApplication")
    .value
    .toLowerCase();




    let status =

    document
    .getElementById("statusFilter")
    .value;




    filteredJobs =

    appliedJobs.filter(job => {



        let matchSearch =

        job.jobTitle
        .toLowerCase()
        .includes(search);




        let matchStatus =

        status === ""
        ||
        job.status === status;




        return matchSearch && matchStatus;



    });



    renderApplications(
        filteredJobs
    );


}





// ======================================
// VIEW JOB
// ======================================


function viewJob(jobId){


    localStorage.setItem(
        "selectedJobId",
        jobId
    );


    window.location.href =
    "../applyjob/applyjob.html";


}