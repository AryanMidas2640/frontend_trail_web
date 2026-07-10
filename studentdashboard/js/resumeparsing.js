// ======================================
// RESUME PARSING
// ======================================


document.addEventListener("DOMContentLoaded", () => {


    console.log("Resume Parsing Loaded");


    document
    .getElementById("uploadBtn")
    .addEventListener(
        "click",
        uploadResume
    );



    document
    .querySelector(".back-btn")
    .addEventListener(
        "click",
        () => {

            window.location.href =
            "../studentdashboard/studentdashboard.html";

        }
    );


});





// ======================================
// UPLOAD RESUME
// ======================================


async function uploadResume(){


    const fileInput =
    document.getElementById("resumeFile");


    const file =
    fileInput.files[0];



    if(!file){

        alert("Please select PDF file");
        return;

    }




    if(file.type !== "application/pdf"){

        alert("Only PDF allowed");
        return;

    }





    // ============================
    // TOKEN
    // ============================


    const token = getToken();

console.log("TOKEN SENT:", token);

console.log(
    "ROLE:",
    localStorage.getItem("role")
);


    console.log(
        "TOKEN:",
        token
    );



    if(!token){


        alert(
            "Login required"
        );


        return;

    }







    try{


        const skills = document.getElementById("skillsInput").value;
const education = document.getElementById("educationInput").value;

const formData = new FormData();
formData.append("file", file);
formData.append("skills", skills);
formData.append("education", education);





        console.log(
            "Uploading..."
        );





       const response = await fetch(
    BASE_URL + "/api/resume/parse",
    {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + getToken()
        },
        body: formData
    }
);


        console.log(
            "STATUS:",
            response.status
        );





        // ==========================
        // SAFE RESPONSE
        // ==========================


        const raw =
        await response.text();



        console.log(
            "RAW RESPONSE:",
            raw
        );



        let result = {};



        try{


            result =
            JSON.parse(raw);


        }
        catch(e){


            console.log(
                "JSON ERROR:",
                e
            );


        }





        console.log(
            "RESULT:",
            result
        );







        if(response.status === 401){


            alert(
                "Unauthorized! Login again"
            );


            localStorage.clear();


            window.location.href =
            "../login/login.html";


            return;

        }






        if(!response.ok){


            alert(

                result.message ||
                raw ||
                "Resume Parsing Failed"

            );


            return;

        }






        // ==========================
        // DATA DISPLAY
        // ==========================


        const data =
        result.data || result;





        document
        .getElementById("name")
        .innerText =
        data.name || "-";




        document
        .getElementById("email")
        .innerText =
        data.email || "-";




        document
        .getElementById("phone")
        .innerText =
        data.phone || "-";




        document
        .getElementById("skills")
        .innerText =

        data.matchedSkills
        ?
        data.matchedSkills.join(", ")
        :
        "-";




        document
        .getElementById("education")
        .innerText =
        data.education || "-";




        document
        .getElementById("experience")
        .innerText =
        data.experience || "-";




        document
        .getElementById("matchingCount")
        .innerText =
        data.matchingCount || 0;






        alert(
            "Resume Parsed Successfully"
        );



    }
    catch(error){


        console.error(
            "FETCH ERROR:",
            error
        );


        alert(
            "Server Error"
        );


    }



}