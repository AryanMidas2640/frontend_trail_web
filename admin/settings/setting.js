const BASE_URL = "https://hiringnest-trail-backend-code.onrender.com";

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

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    try {

        // TODO : Replace with your profile API
        /*
        const response = await fetch(`${BASE_URL}/api/jobs/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        */

        // Temporary Data
        const data = {
            username: "ad1",
            email: "rishu26400@gmail.com",
            role: "ADMIN",
            tenantId: "TEN73568",
            online: true,
            lastLogin: "2026-07-19T09:02:56"
        };

        document.getElementById("username").value = data.username;
        document.getElementById("email").value = data.email;
        document.getElementById("role").value = data.role;
        document.getElementById("tenantId").value = data.tenantId;
        document.getElementById("status").value = data.online ? "Online" : "Offline";
        document.getElementById("lastLogin").value =
            new Date(data.lastLogin).toLocaleString();

    } catch (error) {

        console.error(error);
        alert("Unable to load profile.");

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

    console.log("Username :", username);
    console.log("Email :", email);

    // TODO : PUT API

    alert("Profile Updated Successfully.");

}



// =======================================
// CHANGE PASSWORD
// =======================================

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

    console.log(currentPassword);
    console.log(newPassword);

    // TODO : Change Password API

    alert("Password Changed Successfully.");

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