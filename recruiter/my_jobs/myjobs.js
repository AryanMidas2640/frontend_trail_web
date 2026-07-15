const BASE_URL = "http://localhost:1010";

const token =
    localStorage.getItem("jwt") ||
    localStorage.getItem("token");

const tenantId = localStorage.getItem("tenantId");

const postedJobs = document.getElementById("postedJobs");
const activeJobs = document.getElementById("activeJobs");
const jobTableBody = document.getElementById("jobTableBody");

document.addEventListener("DOMContentLoaded", loadMyJobs);

async function loadMyJobs() {

    if (!token || !tenantId) {
        alert("Login Again");
        window.location.href = "../login/login.html";
        return;
    }

    try {

        const response = await fetch(
            `${BASE_URL}/api/jobs/tenant/${tenantId}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error("Unable to fetch jobs");
        }

        const jobs = await response.json();

        postedJobs.textContent = jobs.length;

        // Active Jobs
        activeJobs.textContent = jobs.filter(job => job.status !== "CLOSED").length;

        jobTableBody.innerHTML = "";

        if (jobs.length === 0) {
            jobTableBody.innerHTML = `
                <tr>
                    <td colspan="10" class="no-data">
                        No Jobs Found
                    </td>
                </tr>
            `;
            return;
        }

        jobs.forEach(job => {

            jobTableBody.innerHTML += `
                <tr>

                    <td>${job.jobId}</td>

                    <td>${job.jobTitle}</td>

                    <td>${job.companyName}</td>

                    <td>${job.city}</td>

                    <td>${job.jobType}</td>

                    <td>${job.workMode}</td>

                    <td>
                        ${job.minExperience} - ${job.maxExperience} Years
                    </td>

                    <td>
                        ₹${Number(job.salary).toLocaleString()}
                    </td>

                    <td>${job.email}</td>

                    <td class="description">
                        ${job.description}
                    </td>

                </tr>
            `;
        });

    } catch (error) {

        console.error(error);

        jobTableBody.innerHTML = `
            <tr>
                <td colspan="10" class="no-data">
                    Failed to Load Jobs
                </td>
            </tr>
        `;
    }
}