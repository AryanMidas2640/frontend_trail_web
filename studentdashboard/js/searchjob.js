document.addEventListener("DOMContentLoaded", () => {

    const searchBtn = document.getElementById("searchBtn");

    searchBtn.addEventListener("click", searchJob);

});


async function searchJob() {

    const jobId =
        document.getElementById("jobId")
        .value
        .trim();


    if(jobId === "") {

        alert("Enter Job ID");
        return;

    }


    try {

        const response = await fetch(
            BASE_URL + "/api/jobs/" + jobId,
            {
                method: "GET",
                headers: authHeaders()
            }
        );


        if(!response.ok) {

            alert("Job not found");
            return;

        }


        const job = await response.json();


        console.log(job);


        document.getElementById("jobTitle").innerText =
            job.jobTitle;


        document.getElementById("company").innerText =
            job.companyName;


        document.getElementById("companyName").innerText =
            job.companyName;


        document.getElementById("city").innerText =
            job.city;


        document.getElementById("type").innerText =
            job.jobType;


        document.getElementById("mode").innerText =
            job.workMode;


        document.getElementById("experience").innerText =
            job.minExperience + " - " +
            job.maxExperience + " Years";


        document.getElementById("salary").innerText =
            "₹" + job.salary;


        document.getElementById("email").innerText =
            job.email;


    }
    catch(error) {

        console.error(error);

        alert("Server Error");

    }

}