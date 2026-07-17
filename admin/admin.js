document.addEventListener("DOMContentLoaded", () => {

    // Students
    const studentsBtn = document.getElementById("studentsBtn");

    if (studentsBtn) {
        studentsBtn.addEventListener("click", () => {
            window.location.href = "student/student.html";
        });
    }

    // Recruiters
    const recruitersBtn = document.getElementById("recruitersBtn");

    if (recruitersBtn) {
        recruitersBtn.addEventListener("click", () => {
            window.location.href = "recruiter/recruiter.html";
        });
    }

    // Jobs
    const jobsBtn = document.getElementById("jobsBtn");

    if (jobsBtn) {
        jobsBtn.addEventListener("click", () => {
            window.location.href = "job/job.html";
        });
    }

    // Applications
   const applicationsBtn = document.getElementById("applicationsBtn");

console.log(applicationsBtn);

if (applicationsBtn) {

    applicationsBtn.addEventListener("click", () => {

        console.log("Applications Clicked");

        window.location.href = "application/application.html";

    });

}

});