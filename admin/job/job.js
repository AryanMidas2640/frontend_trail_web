const BASE_URL = "https://hiringnest-trail-backend-code.onrender.com";

document.addEventListener("DOMContentLoaded", () => {

    loadJobs();

    const search = document.getElementById("jobSearch");

    if (search) {

        search.addEventListener("keyup", searchJobs);

    }

});

async function loadJobs() {

    const token =
        localStorage.getItem("jwt") ||
        localStorage.getItem("token");

    if (!token) {

        alert("Please login first.");

        return;

    }

    try {

        const response = await fetch(`${BASE_URL}/api/jobs/all`, {

            method: "GET",

            headers: {

                "Authorization": "Bearer " + token,

                "Content-Type": "application/json"

            }

        });

        if (!response.ok) {

            throw new Error("Failed to fetch jobs");

        }

        const jobs = await response.json();

        console.log("Jobs :", jobs);

        displayJobs(jobs);

    }

    catch(error){

        console.error(error);

        alert("Unable to load jobs.");

    }

}

function displayJobs(jobs){

    const tbody = document.getElementById("jobsBody");

    tbody.innerHTML = "";

    jobs.forEach((job,index)=>{

        tbody.innerHTML += `

        <tr>

            <td>${index+1}</td>

            <td>${job.jobId}</td>

            <td>${job.jobTitle}</td>

            <td>${job.companyName}</td>

            <td>${job.city}</td>

            <td>

                <span class="job-type">

                    ${job.jobType}

                </span>

            </td>

            <td>

                <span class="work-mode">

                    ${job.workMode}

                </span>

            </td>

            <td>

                <span class="exp">

                    ${job.minExperience} - ${job.maxExperience} Years

                </span>

            </td>

            <td class="salary">

                ₹${Number(job.salary).toLocaleString()}

            </td>

            <td>${job.email}</td>

        </tr>

        `;

    });

}

function searchJobs(){

    const value = document
        .getElementById("jobSearch")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#jobsBody tr");

    rows.forEach(row=>{

        row.style.display = row.innerText
        .toLowerCase()
        .includes(value)

        ? ""

        : "none";

    });

}