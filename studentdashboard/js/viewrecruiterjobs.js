// ======================================
// VIEW RECRUITER JOBS
// ======================================

let allJobs = [];
let filteredJobs = [];

document.addEventListener("DOMContentLoaded", () => {

    if (!isLoggedIn()) {

        window.location.href = "../../login/login.html";
        return;

    }

    document.getElementById("searchBtn")
.addEventListener("click", () => {

    loadRecruiterJobs();



});

    document.getElementById("searchJob")
        .addEventListener("keyup", filterJobs);

    document.getElementById("companyFilter")
        .addEventListener("change", filterJobs);

    document.getElementById("locationFilter")
        .addEventListener("change", filterJobs);

    document.querySelector(".back-btn")
        .addEventListener("click", () => {

            window.location.href =
                "../studentdashboard/studentdashboard.html";

        });

});


// ======================================
// LOAD RECRUITER JOBS
// ======================================

// ======================================
// LOAD RECRUITER JOBS BY TENANT ID
// ======================================

async function loadRecruiterJobs() {

    try {

        const tenantId =
            document.getElementById("searchJob")
            .value
            .trim();


        if (tenantId === "") {

            alert("Enter Recruiter Tenant ID");

            return;

        }


        console.log("Recruiter Tenant ID :", tenantId);


        console.log(
            "Calling API :",
            BASE_URL + "/api/jobs/tenant/" + tenantId
        );


        const response =
            await apiGet("/api/jobs/tenant/" + tenantId);


        console.log("Response :", response);


        if (!response.ok) {

            alert("Unable to fetch recruiter jobs.");

            return;

        }


        allJobs =
            await response.json();


        console.log("Jobs :", allJobs);


        filteredJobs =
            [...allJobs];


        updateStats();

        loadFilters();

        renderJobs(filteredJobs);


    }
    catch(error) {

        console.error(
            "FULL ERROR :",
            error
        );

        alert("Server Error");

    }

}



// ======================================
// UPDATE STATS
// ======================================

function updateStats() {

    document.getElementById("totalJobs").innerText =
        allJobs.length;

    const companies =
        [...new Set(allJobs.map(j => j.companyName))];

    document.getElementById("companies").innerText =
        companies.length;

    const locations =
        [...new Set(allJobs.map(j => j.city))];

    document.getElementById("locations").innerText =
        locations.length;

}



// ======================================
// LOAD FILTERS
// ======================================

function loadFilters() {

    const company =
        document.getElementById("companyFilter");

    const location =
        document.getElementById("locationFilter");

    const companies =
        [...new Set(allJobs.map(j => j.companyName))];

    const cities =
        [...new Set(allJobs.map(j => j.city))];

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

}    


  

// ======================================
// RENDER JOBS
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
                No Recruiter Jobs Found
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

            <td>${job.experience || "-"}</td>

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

    let search =
        document.getElementById("searchJob")
        .value
        .toLowerCase();

    let company =
        document.getElementById("companyFilter")
        .value;

    let city =
        document.getElementById("locationFilter")
        .value;


    filteredJobs = allJobs.filter(job => {

        let matchSearch =
    (job.jobTitle || "")
        .toLowerCase()
        .includes(search)
    ||
    (job.companyName || "")
        .toLowerCase()
        .includes(search)
    ||
    (job.city || "")
        .toLowerCase()
        .includes(search);

        let matchCompany =
            company === "All Companies"
            || job.companyName === company;

        let matchCity =
            city === "All Locations"
            || job.city === city;

        return matchSearch
            && matchCompany
            && matchCity;

    });

    renderJobs(filteredJobs);

}

// ======================================
// APPLY JOB
// ======================================

async function applyJob(jobId) {

    if (!confirm("Do you want to apply for this job?")) {
        return;
    }

    try {

        const response = await fetch(

            BASE_URL + "/api/jobs/apply/" + jobId + "/Applied",

            {

                method: "POST",

                headers: authHeaders()

            }

        );

        const message = await response.text();

        if (response.ok) {

            alert(message);

        } else {

            alert(message);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to apply.");

    }

}



// ======================================
// REFRESH JOBS
// ======================================

function refreshJobs() {

    loadRecruiterJobs();

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
// FORMAT SALARY
// ======================================

function salary(v) {

    if (v == null || v === "")
        return "-";

    return v;

}



// ======================================
// END
// ======================================

