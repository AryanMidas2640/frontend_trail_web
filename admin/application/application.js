//const BASE_URL = "https://hiringnest-trail-backend-code.onrender.com";

const BASE_URL = "http://localhost:1010";
// ya Render URL

async function loadApplications() {

    const token =
        localStorage.getItem("jwt") ||
        localStorage.getItem("token");

    try {

        const response = await fetch(
            `${BASE_URL}/api/jobs/applications`,
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error("Failed to load applications");
        }

        const applications = await response.json();

        console.log("Applications:", applications);

        displayApplications(applications);

    } catch (err) {
        console.error(err);
    }
}

function displayApplications(applications) {

    const tbody = document.getElementById("applicationTable");

    tbody.innerHTML = "";

    applications.forEach((app, index) => {

        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${app.studentName}</td>
                <td>${app.studentUsername}</td>
                <td>${app.resumeName}</td>
                <td>${app.jobId}</td>
                <td>${app.jobTitle}</td>
                <td>${app.companyName}</td>
                <td>${app.status}</td>
            </tr>
        `;
    });
}

document.addEventListener("DOMContentLoaded", loadApplications);