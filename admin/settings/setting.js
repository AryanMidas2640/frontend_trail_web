const BASE_URL = "https://hiringnest-trail-backend-code.onrender.com"
//const BASE_URL = "http://localhost:1010";


document.addEventListener("DOMContentLoaded", () => {

    // Load profile
    loadProfile();

    // Button Listeners
    document.getElementById("updateProfileBtn").addEventListener("click", updateProfile);
    document.getElementById("changePasswordBtn").addEventListener("click", changePassword);
    document.getElementById("logoutBtn").addEventListener("click", logout);

    // Notification Listeners
    document.getElementById("emailNotification").addEventListener("change", notificationChanged);
    document.getElementById("applicantNotification").addEventListener("change", notificationChanged);
    document.getElementById("jobReminder").addEventListener("change", notificationChanged);

});


// =======================================
// LOAD PROFILE
// =======================================

async function loadProfile() {

    const token = localStorage.getItem("jwt") || localStorage.getItem("token");

    console.log("TOKEN =", token);

    if (!token) {
        alert("Please login first.");
        return;
    }

    try {

        const response = await fetch(BASE_URL + "/api/jobs/profile", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        });

        console.log("STATUS =", response.status);

        const data = await response.json();

        console.log("DATA =", data);

        if (!response.ok) {
            alert(data.message || "Unable to load profile.");
            return;
        }

        document.getElementById("username").value = data.username;
        document.getElementById("email").value = data.email;
        document.getElementById("role").value = data.role;
        document.getElementById("tenantId").value = data.tenantId;
        document.getElementById("status").value = data.online ? "Online" : "Offline";
        document.getElementById("lastLogin").value =
            data.lastLogin ? new Date(data.lastLogin).toLocaleString() : "";

    } catch (error) {
        console.error("LOAD PROFILE ERROR =", error);
    }
}


// =======================================
// UPDATE PROFILE
// =======================================

async function updateProfile() {

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!username || !email) {
        alert("Please fill all fields.");
        return;
    }

    const token =
        localStorage.getItem("jwt") ||
        localStorage.getItem("token");

    try {

        const response = await fetch(
            BASE_URL + "/api/jobs/update-profile",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    username: username,
                    email: email
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert(data.message);

        } else {

            alert(data.message || "Profile update failed.");

        }

    } catch (error) {

        console.error(error);
        alert("Server Error.");

    }
}

// =======================================
// CHANGE PASSWORD
// =======================================

//const BASE_URL = "http://localhost:1010";
// ya tera Render URL agar deployment pe use kar raha hai

async function changePassword() {

    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!currentPassword || !newPassword || !confirmPassword) {
        alert("Please fill all fields.");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const token =
        localStorage.getItem("jwt") ||
        localStorage.getItem("token");

    try {

        const response = await fetch(
            BASE_URL + "/api/jobs/change-password",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    currentPassword: currentPassword,
                    newPassword: newPassword
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert(data.message);

            document.getElementById("currentPassword").value = "";
            document.getElementById("newPassword").value = "";
            document.getElementById("confirmPassword").value = "";

        } else {

            alert(data.message || "Password change failed.");

        }

    } catch (error) {

        console.error(error);
        alert("Server Error.");

    }
}


// =======================================
// NOTIFICATION
// =======================================

function notificationChanged() {

    console.log("Email :", document.getElementById("emailNotification").checked);

    console.log("Applicants :", document.getElementById("applicantNotification").checked);

    console.log("Reminder :", document.getElementById("jobReminder").checked);

}



// =======================================
// LOGOUT
// =======================================

function logout() {

    if (!confirm("Are you sure you want to logout?")) {
        return;
    }

    localStorage.removeItem("jwt");
    localStorage.removeItem("token");

    window.location.href = "login.html";

}

// Privacy Policy
document.getElementById("privacyPolicyLink").addEventListener("click", function (e) {

    e.preventDefault();

    window.location.href = "../help/privacy.html";

});

// Terms & Conditions
document.getElementById("termsConditionLink").addEventListener("click", function (e) {

    e.preventDefault();

    window.location.href = "../help/term.html";

});

// Contact Support
document.getElementById("contactSupportLink").addEventListener("click", function (e) {

    e.preventDefault();

    window.location.href = "../help/contact.html";

});