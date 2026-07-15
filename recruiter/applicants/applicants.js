const BASE_URL = "http://localhost:1010";

const token =
    localStorage.getItem("jwt") ||
    localStorage.getItem("token");

const totalApplicants = document.getElementById("totalApplicants");
const pendingApplicants = document.getElementById("pendingApplicants");
const applicantTableBody = document.getElementById("applicantTableBody");

document.addEventListener("DOMContentLoaded", loadApplicants);

async function loadApplicants() {

    if (!token) {
        alert("Please Login Again");
        window.location.href = "../login/login.html";
        return;
    }

    try {

        const response = await fetch(
            `${BASE_URL}/api/jobs/my-applicants`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (!response.ok) {
            throw new Error("Unable to fetch applicants");
        }

        const applicants = await response.json();

        totalApplicants.textContent = applicants.length;

        const appliedCount = applicants.filter(
            a => a.status && a.status.toUpperCase() === "APPLIED"
        ).length;

        pendingApplicants.textContent = appliedCount;

        applicantTableBody.innerHTML = "";

        if (applicants.length === 0) {

            applicantTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="no-data">
                        No Applicants Found
                    </td>
                </tr>
            `;

            return;
        }

        applicants.forEach(applicant => {

            let statusClass = "";

            switch ((applicant.status || "").toUpperCase()) {

                case "APPLIED":
                    statusClass = "applied";
                    break;

                case "SHORTLISTED":
                    statusClass = "shortlisted";
                    break;

                case "SELECTED":
                    statusClass = "selected";
                    break;

                case "REJECTED":
                    statusClass = "rejected";
                    break;

                default:
                    statusClass = "applied";
            }

            applicantTableBody.innerHTML += `

                <tr>

                    <td>${applicant.studentName || "-"}</td>

                    <td>${applicant.studentUsername || "-"}</td>

                    <td>${applicant.resumeName || "-"}</td>

                    <td>${applicant.jobId || "-"}</td>

                    <td>${applicant.jobTitle || "-"}</td>

                    <td>${applicant.companyName || "-"}</td>

                    <td>
                        <span class="status ${statusClass}">
                            ${applicant.status || "-"}
                        </span>
                    </td>

                </tr>

            `;

        });

    } catch (error) {

        console.error(error);

        applicantTableBody.innerHTML = `
            <tr>
                <td colspan="7" class="no-data">
                    Failed to Load Applicants
                </td>
            </tr>
        `;
    }
}