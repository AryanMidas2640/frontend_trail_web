// ======================================
// APPLY JOB PAGE
// ======================================


let selectedJobId = null;



document.addEventListener("DOMContentLoaded", () => {


    console.log("Apply Job JS Loaded");


    const searchBtn =
        document.getElementById("searchBtn");


    const applyBtn =
        document.getElementById("applyBtn");



    searchBtn.addEventListener(
        "click",
        searchJob
    );


    applyBtn.addEventListener(
        "click",
        applyJob
    );


});




// ======================================
// SEARCH JOB BY ID
// ======================================


async function searchJob(){


    const jobId =
        document
        .getElementById("searchJobId")
        .value
        .trim();



    if(jobId === ""){

        alert("Please Enter Job ID");

        return;

    }



    try{


        console.log(
            "Searching Job : ",
            jobId
        );



        const response = await fetch(

            BASE_URL +
            "/api/jobs/" +
            jobId,

            {

                method:"GET",

                headers:authHeaders()

            }

        );



        console.log(
            "STATUS : ",
            response.status
        );



        if(!response.ok){


            const error =
                await response.text();


            console.log(error);


            alert("Job Not Found");


            return;

        }




        const job =
            await response.json();



        console.log(job);



        selectedJobId =
            job.jobId;




        // =========================
        // SET JOB DETAILS
        // =========================


        document
        .getElementById("jobId")
        .innerText =
        job.jobId;



        document
        .getElementById("jobTitle")
        .innerText =
        job.jobTitle;



        document
        .getElementById("company")
        .innerText =
        job.companyName;



        document
        .getElementById("city")
        .innerText =
        job.city;



        document
        .getElementById("salary")
        .innerText =
        "₹ " + job.salary;




        alert(
            "Job Details Loaded"
        );



    }
    catch(error){


        console.error(
            "SEARCH ERROR : ",
            error
        );


        alert(
            "Server Error"
        );


    }



}






// ======================================
// APPLY JOB
// ======================================


async function applyJob(){



    if(selectedJobId == null){


        alert(
            "First Search Job"
        );


        return;

    }




    const agree =
        document
        .getElementById("agree")
        .checked;



    if(!agree){


        alert(
            "Please accept declaration"
        );


        return;

    }





    try{


        console.log(
            "Applying Job : ",
            selectedJobId
        );



        const response =
            await fetch(


                BASE_URL +
                "/api/jobs/apply/" +
                selectedJobId +
                "/Applied",


                {

                    method:"POST",

                    headers:authHeaders()

                }


            );




        const message =
            await response.text();




        console.log(
            "APPLY RESPONSE : ",
            message
        );




        if(response.ok){


            alert(
                "Application Submitted Successfully"
            );


        }
        else{


            alert(message);


        }




    }
    catch(error){


        console.error(
            "APPLY ERROR : ",
            error
        );


        alert(
            "Unable To Apply"
        );


    }



}