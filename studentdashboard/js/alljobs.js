// ======================================
// ALL JOBS PAGE
// ======================================

let allJobs = [];
let filteredJobs = [];

document.addEventListener("DOMContentLoaded", () => {

    if (!isLoggedIn()) {
        window.location.href = "../../login/login.html";
        return;
    }

    loadAllJobs();

    document.getElementById("searchJob")
        .addEventListener("keyup", filterJobs);

    document.getElementById("companyFilter")
        .addEventListener("change", filterJobs);

    document.getElementById("locationFilter")
        .addEventListener("change", filterJobs);

    document.getElementById("typeFilter")
        .addEventListener("change", filterJobs);

    document.querySelector(".back-btn")
        .addEventListener("click", () => {

            window.location.href =
                "../studentdashboard/studentdashboard.html";

        });

});


// ======================================
// LOAD ALL JOBS
// ======================================

async function loadAllJobs() {

    try {

        const response =
            await apiGet("/api/jobs/all");

        if (!response.ok) {

            alert("Unable to fetch jobs.");
            return;

        }

        allJobs = await response.json();

        filteredJobs = [...allJobs];

        updateStats();

        loadFilters();

        renderJobs(filteredJobs);

    }

    catch (error) {

        console.error(error);

        alert("Server Error");

    }

}



// ======================================
// UPDATE DASHBOARD STATS
// ======================================

function updateStats() {

    document.getElementById("totalJobs").innerText =
        allJobs.length;

    document.getElementById("activeJobs").innerText =
        allJobs.length;

    const companies =
        [...new Set(allJobs.map(job => job.companyName))];

    document.getElementById("companies").innerText =
        companies.length;

}



// ======================================
// LOAD FILTERS
// ======================================

function loadFilters() {

    const company =
        document.getElementById("companyFilter");

    const location =
        document.getElementById("locationFilter");

    const type =
        document.getElementById("typeFilter");

    const companies =
        [...new Set(allJobs.map(j => j.companyName))];

    const cities =
        [...new Set(allJobs.map(j => j.city))];

    const types =
        [...new Set(allJobs.map(j => j.jobType))];


    companies.forEach(c => {

        let option =
            document.createElement("option");

        option.value = c;

        option.textContent = c;

        company.appendChild(option);

    });


    cities.forEach(c => {

        let option =
            document.createElement("option");

        option.value = c;

        option.textContent = c;

        location.appendChild(option);

    });


    types.forEach(t => {

        let option =
            document.createElement("option");

        option.value = t;

        option.textContent = t;

        type.appendChild(option);

    });
}

    // ======================================
// RENDER JOBS TABLE
// ======================================

function renderJobs(jobs) {

    const table =
        document.getElementById("jobsTable");

    table.innerHTML = "";

    if (jobs.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="8"
                    style="text-align:center;
                    padding:20px;
                    color:red;">
                    No Jobs Found
                </td>
            </tr>
        `;

        return;
    }

    jobs.forEach(job => {

        table.innerHTML += `

        <tr>

            <td>${job.jobId}</td>

            <td>${job.jobTitle}</td>

            <td>${job.companyName}</td>

            <td>${job.city}</td>

            <td>${job.salary}</td>

            <td>${job.jobType}</td>

            <td>

                <span style="
                    background:#22c55e;
                    color:white;
                    padding:5px 12px;
                    border-radius:20px;
                    font-size:12px;">
                    Active
                </span>

            </td>

            <td>

                <button
                    class="apply-btn"
                    onclick="applyJob('${job.jobId}')">

                    Apply

                </button>

            </td>

        </tr>

        `;

    });

}



// ======================================
// SEARCH + FILTER
// ======================================

function filterJobs() {

    let search = document
        .getElementById("searchJob")
        .value
        .toLowerCase();

    let company = document
        .getElementById("companyFilter")
        .value;

    let city = document
        .getElementById("locationFilter")
        .value;

    let type = document
        .getElementById("typeFilter")
        .value;


    filteredJobs = allJobs.filter(job => {

        let matchSearch =
            job.jobTitle
            .toLowerCase()
            .includes(search);

        let matchCompany =
            company === "All Companies"
            || job.companyName === company;

        let matchCity =
            city === "All Locations"
            || job.city === city;

        let matchType =
            type === "Job Type"
            || job.jobType === type;

        return matchSearch
            && matchCompany
            && matchCity
            && matchType;

    });

    renderJobs(filteredJobs);

}

// ======================================
// APPLY JOB
// ======================================

async function applyJob(jobId) {

    let confirmApply =
        confirm("Do you want to apply for Job ID : " + jobId + " ?");

    if (!confirmApply)
        return;

    try {

        const response =
            await fetch(

                BASE_URL +
                "/api/jobs/apply/" +
                jobId +
                "/Applied",

                {

                    method: "POST",

                    headers: authHeaders()

                }

            );

        const message =
            await response.text();

        if (response.ok) {

            alert(message);

            loadAllJobs();

        }

        else {

            if (message.includes("Already")) {

                alert("You have already applied for this job.");

            }

            else {

                alert(message);

            }

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to apply.");

    }

}



// ======================================
// LOGOUT
// ======================================

function logoutStudent() {

    logout();

}



// ======================================
// FORMAT SALARY
// ======================================

function formatSalary(salary) {

    if (salary == null || salary === "")
        return "-";

    return salary;

}



// ======================================
// FORMAT VALUE
// ======================================

function value(v) {

    if (v == null)
        return "";

    return v;

}



// ======================================
// REFRESH
// ======================================

function refreshJobs() {

    loadAllJobs();

}



// ======================================
// END OF FILE
// ======================================

