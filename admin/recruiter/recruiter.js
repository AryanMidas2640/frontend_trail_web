const BASE_URL = "https://hiringnest-trail-backend-code.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
    loadRecruiters();

    const search = document.getElementById("recruiterSearch");

    if (search) {
        search.addEventListener("keyup", searchRecruiters);
    }
});

async function loadRecruiters() {

    const token =
        localStorage.getItem("jwt") ||
        localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        return;
    }

    try {

        const response = await fetch(`${BASE_URL}/api/admin/recruiters`, {

            method: "GET",

            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }

        });

        if (!response.ok) {
            throw new Error("Failed to fetch recruiters");
        }

        const recruiters = await response.json();

        console.log("Recruiters:", recruiters);

        displayRecruiters(recruiters);

    } catch (error) {

        console.error(error);
        alert("Unable to load recruiters.");

    }

}

function displayRecruiters(recruiters) {

    const tbody = document.getElementById("recruitersBody");

    tbody.innerHTML = "";

    recruiters.forEach((recruiter, index) => {

        tbody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${recruiter.username}</td>

            <td>${recruiter.email}</td>

            <td>${recruiter.role}</td>

            <td>${recruiter.tenantId}</td>

            <td>

                <span class="${recruiter.online ? "online" : "offline"}">

                    ${recruiter.online ? "Online" : "Offline"}

                </span>

            </td>

            <td>${formatDate(recruiter.lastLogin)}</td>

            <td>${formatDate(recruiter.lastLogout)}</td>

        </tr>

        `;

    });

}

function formatDate(date) {

    if (!date) return "-";

    return new Date(date).toLocaleString();

}

function searchRecruiters() {

    const value = document
        .getElementById("recruiterSearch")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#recruitersBody tr");

    rows.forEach(row => {

        row.style.display = row.innerText
            .toLowerCase()
            .includes(value)
            ? ""
            : "none";

    });

}