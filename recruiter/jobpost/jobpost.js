const BASE_URL = "https://hiringnest-trail-backend-code.onrender.com";

const form = document.getElementById("jobForm");

form.addEventListener("submit", postJob);

async function postJob(e) {

    e.preventDefault();

    const token =
        localStorage.getItem("jwt") ||
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        return;
    }

    const job = {

        jobId: document.getElementById("jobId").value.trim(),
        jobTitle: document.getElementById("jobTitle").value.trim(),
        companyName: document.getElementById("companyName").value.trim(),
        city: document.getElementById("city").value.trim(),
        jobType: document.getElementById("jobType").value,
        workMode: document.getElementById("workMode").value,
        minExperience: parseInt(document.getElementById("minExperience").value) || 0,
        maxExperience: parseInt(document.getElementById("maxExperience").value) || 0,
        salary: parseInt(document.getElementById("salary").value) || 0,
        description: document.getElementById("description").value.trim()

        // Email mat bhejo.
        // Backend token se khud set kar raha hai.
    };

    console.log("========== JOB ==========");
    console.log(job);

    console.log("========== TOKEN ==========");
    console.log(token);

    try {

        const response = await fetch(`${BASE_URL}/api/jobs/add`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            },

            body: JSON.stringify(job)

        });

        console.log("STATUS :", response.status);

        const result = await response.text();

        console.log("RESPONSE :", result);

        if (response.ok) {

            alert("✅ Job Posted Successfully");

            form.reset();

        } else {

            alert("❌ " + result);

        }

    } catch (error) {

        console.error(error);

        alert("❌ Server Error");

    }

}