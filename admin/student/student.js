const BASE_URL = "https://hiringnest-trail-backend-code.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
    loadStudents();
});

async function loadStudents() {

    const token = localStorage.getItem("jwt") ||
                  localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        return;
    }

    try {

        const response = await fetch(`${BASE_URL}/api/admin/students`, {

            method: "GET",

            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }

        });

        if (!response.ok) {
            throw new Error("Unable to fetch students.");
        }

        const students = await response.json();

        displayStudents(students);

    }

    catch(error){

        console.error(error);

        alert("Failed to load students.");

    }

}

function displayStudents(students){

    const tbody = document.getElementById("studentsBody");

    tbody.innerHTML = "";

    students.forEach((student,index)=>{

        const row = `

        <tr>

            <td>${index+1}</td>

            <td>${student.username}</td>

            <td>${student.email}</td>

            <td>${student.role}</td>

            <td>${student.tenantId}</td>

            <td>

                <span class="${student.online ? "online":"offline"}">

                    ${student.online ? "Online":"Offline"}

                </span>

            </td>

            <td>${formatDate(student.lastLogin)}</td>

        </tr>

        `;

        tbody.innerHTML += row;

    });

}

function formatDate(date){

    if(!date) return "-";

    return new Date(date).toLocaleString();

}

/* ===========================
      SEARCH
=========================== */

document.getElementById("studentSearch")
.addEventListener("keyup",function(){

    const value=this.value.toLowerCase();

    const rows=document.querySelectorAll("#studentsBody tr");

    rows.forEach(row=>{

        row.style.display=row.innerText
        .toLowerCase()
        .includes(value)

        ? ""

        : "none";

    });

});