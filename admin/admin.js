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
    if (applicationsBtn) {
        applicationsBtn.addEventListener("click", () => {
            window.location.href = "application/application.html";
        });
    }

    // Reports
    const reportsBtn = document.getElementById("reportsBtn");
    console.log(reportsBtn);

    if (reportsBtn) {
        reportsBtn.addEventListener("click", () => {
            console.log("Reports Clicked");
            window.location.href = "report/report.html";
        });
    }

  

});
  document.addEventListener("DOMContentLoaded", () => {

    const notificationBtn = document.getElementById("notificationBtn");

    if (notificationBtn) {

        notificationBtn.addEventListener("click", () => {

            window.location.href = "notification/notification.html";

        });

    }

});