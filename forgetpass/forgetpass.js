const forgotPassword =
document.getElementById("forgotPassword");


if(forgotPassword){

    forgotPassword.addEventListener(
    "click",
    function(e){

        e.preventDefault();

        window.location.href =
        "../forgetpass/forgetpass.html";

    });


}

// ==========================================
// FORGOT PASSWORD
// ==========================================

const forgotForm = document.getElementById("forgotForm");

const sendOtpBtn = document.getElementById("sendOtpBtn");

const emailInput = document.getElementById("email");
const otpInput = document.getElementById("otp");

const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");


const otpSection =
document.getElementById("otpSection");

const passwordSection =
document.getElementById("passwordSection");

const confirmPasswordSection =
document.getElementById("confirmPasswordSection");

const resetBtn =
document.getElementById("resetBtn");


// ==========================================
// SEND OTP
// ==========================================

sendOtpBtn.addEventListener(
"click",
sendOtp
);


async function sendOtp(){


    const email =
    emailInput.value.trim();



    if(email===""){

        alert("Enter your email");

        return;

    }



    try{


        sendOtpBtn.disabled=true;

        sendOtpBtn.innerHTML="Sending...";



        const response =
        await fetch(
            BASE_URL + "/api/jobs/send-otp",
            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify({

                    email:email

                })

            }
        );



        const data =
        await response.json();



        alert(data.message);



        if(data.success){


            otpSection.style.display="flex";


            // change button for verification

            sendOtpBtn.innerHTML =
            "Verify OTP";


            sendOtpBtn.onclick =
            verifyOtp;


        }



    }

    catch(error){

        console.log(error);

        alert("Server Error");

    }


    sendOtpBtn.disabled=false;


}



// ==========================================
// VERIFY OTP
// ==========================================


async function verifyOtp(){


    const email =
    emailInput.value.trim();


    const otp =
    otpInput.value.trim();



    if(otp===""){

        alert("Enter OTP");

        return;

    }



    try{


        const response =
        await fetch(
            BASE_URL + "/api/jobs/verify-otp",
            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify({

                    email:email,

                    otp:otp

                })


            }
        );



        const data =
        await response.json();



        alert(data.message);



        if(data.success){


            passwordSection.style.display="flex";


            confirmPasswordSection.style.display="flex";


            resetBtn.style.display="flex";


        }



    }

    catch(error){

        console.log(error);

        alert("OTP Verification Failed");

    }


}




// ==========================================
// RESET PASSWORD
// ==========================================


forgotForm.addEventListener(
"submit",
resetPassword
);



async function resetPassword(e){


    e.preventDefault();



    const email =
    emailInput.value.trim();


    const password =
    newPassword.value.trim();


    const confirm =
    confirmPassword.value.trim();



    if(password!==confirm){


        alert("Passwords do not match");

        return;

    }



    try{


        const response =
        await fetch(
            BASE_URL + "/api/jobs/reset-password",
            {


                method:"POST",


                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify({

                    email:email,

                    newPassword:password

                })


            }

        );



        const data =
        await response.json();



        alert(data.message);



        if(data.success){


            window.location.href =
            "../login/login.html";


        }


    }


    catch(error){

        console.log(error);

        alert("Reset Failed");

    }



}