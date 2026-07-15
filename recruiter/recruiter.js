const BASE_URL = "http://localhost:1010";


// ===============================
// PAGE LOAD
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("jwt") || localStorage.getItem("token");


    if (!token) {

        window.location.href = "../login/login.html";
        return;

    }


    loadRecruiterProfile();
    loadPostedJobs();
      loadNotificationCount();

});

async function loadNotificationCount() {

    const token =
        localStorage.getItem("jwt") ||
        localStorage.getItem("token");

    if (!token) return;

    try {

        const response = await fetch(
            BASE_URL + "/api/jobs/notifications/count",
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        const count = await response.json();

        document.getElementById("notificationCount").innerText = count;

    } catch (e) {

        console.log(e);

    }

}




// ===============================
// RECRUITER PROFILE
// ===============================
function loadRecruiterProfile(){


    const username = localStorage.getItem("username") || "Recruiter";


    const recruiterName =
    document.getElementById("recruiterName");


    const profileName =
    document.getElementById("profileName");



    if(recruiterName){

        recruiterName.innerText = username;

    }


    if(profileName){

        profileName.innerText = username;

    }


}




// ===============================
// GET POSTED JOBS
// ===============================
async function loadPostedJobs(){


    const token =
    localStorage.getItem("jwt") ||
    localStorage.getItem("token");



    try{


        const response = await fetch(

            BASE_URL + "/api/jobs/my-posted",

            {

                method:"GET",

                headers:{

                    "Authorization":"Bearer " + token,
                    "Content-Type":"application/json"

                }

            }

        );



        if(response.status === 401){

            logout();
            return;

        }



        const jobs = await response.json();



        displayJobs(jobs);



    }
    catch(error){


        console.log(
            "Job Loading Error : ",
            error
        );


    }


}

async function logout() {

    const token =
        localStorage.getItem("jwt") ||
        localStorage.getItem("token");

    try {

        await fetch(BASE_URL + "/api/jobs/logout", {

            method: "POST",

            headers: {
                "Authorization": "Bearer " + token
            }

        });

    } catch (error) {

        console.log("Logout Error:", error);

    }

    localStorage.clear();
    sessionStorage.clear();

    window.location.href = "../login/login.html";

}





// ===============================
// DISPLAY JOBS
// ===============================
function displayJobs(jobs){


    const container =
    document.getElementById("jobContainer");


    const postedJobs =
    document.getElementById("postedJobs");


    const activeJobs =
    document.getElementById("activeJobs");



    if(postedJobs){

        postedJobs.innerText = jobs.length;

    }


    if(activeJobs){

        activeJobs.innerText = jobs.length;

    }



    if(!container) return;



    container.innerHTML = "";



    if(!jobs || jobs.length === 0){


        container.innerHTML =

        `

        <div class="empty-job">

            <h3>No Jobs Posted Yet</h3>

        </div>

        `;


        return;

    }




    jobs.forEach(job => {


        container.innerHTML +=


        `

        <div class="job-card">


            <h3>
                ${job.title || "Job Title"}
            </h3>



            <p>
                Company : ${job.companyName || "-"}
            </p>



            <p>
                Location : ${job.location || "-"}
            </p>



            <p>
                Skills : ${job.skills || "-"}
            </p>



            <button onclick="viewApplicants('${job.id}')">

                View Applicants

            </button>


        </div>


        `;


    });



}






// ===============================
// POST JOB PAGE
// ===============================
function openPostJob(){


    window.location.href =
    "jobpost/jobpost.html";


}






// ===============================
// VIEW APPLICANTS
// ===============================
function viewApplicants(jobId){


    localStorage.setItem(
        "selectedJobId",
        jobId
    );


    window.location.href =
    "applicants/applicants.html";


}






// ===============================
// LOGOUT
// ===============================
async function logout(){


    const token =
    localStorage.getItem("jwt") ||
    localStorage.getItem("token");



    try{


        await fetch(

            BASE_URL + "/api/jobs/logout",

            {

                method:"POST",

                headers:{

                    "Authorization":"Bearer " + token

                }

            }

        );


    }
    catch(error){


        console.log(error);


    }



    localStorage.clear();



    window.location.href =
    "../login/login.html";


}