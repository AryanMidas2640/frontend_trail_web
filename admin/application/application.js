// const BASE_URL = "https://hiringnest-trail-backend-code.onrender.com";
const BASE_URL = "https://hiringnest-trail-backend-code.onrender.com";

async function loadApplications() {

    const token =
        localStorage.getItem("jwt") ||
        localStorage.getItem("token");

    console.log("TOKEN =", token);
    console.log("Authorization =", "Bearer " + token);

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

        console.log("Status =", response.status);

        if (!response.ok) {
            throw new Error("Failed to load applications");
        }

        const applications = await response.json();

        console.log("Applications:", applications);

        displayApplications(applications);

    } catch (err) {
        console.error("Error:", err);
    }
}

function displayApplications(applications) {

    // ✅ Correct tbody ID
    const tbody = document.getElementById("applicationsBody");

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
                <td>${app.tenantId}</td>
                <td>${app.status}</td>
            </tr>
        `;
    });
}

document.addEventListener("DOMContentLoaded", loadApplications);