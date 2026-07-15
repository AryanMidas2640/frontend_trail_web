const BASE_URL = "http://localhost:1010";

document.addEventListener("DOMContentLoaded", () => {

    const token =
        localStorage.getItem("jwt") ||
        localStorage.getItem("token");

    if (!token) {
        window.location.href = "../../login/login.html";
        return;
    }

    loadProfile();

});

async function loadProfile() {

    try {

        // Local Storage se values
        const username = localStorage.getItem("username") || "Recruiter";
        const email = localStorage.getItem("email") || "Not Available";
        const tenantId = localStorage.getItem("tenantId") || "Not Available";

        // Agar backend API banaoge to yaha fetch laga denge

        document.getElementById("name").innerText = username;
        document.getElementById("email").innerText = email;
        document.getElementById("tenantId").innerText = tenantId;

        // Ye values agar localStorage me nahi hain to default dikhengi
        document.getElementById("company").innerText =
            localStorage.getItem("companyName") || "Not Available";

        document.getElementById("city").innerText =
            localStorage.getItem("city") || "Not Available";

        document.getElementById("phone").innerText =
            localStorage.getItem("phone") || "Not Available";

    } catch (error) {

        console.log("Profile Load Error :", error);

        alert("Failed to load profile.");

    }

}

// ==========================
// EDIT PROFILE BUTTON
// ==========================

document.querySelector(".edit-btn").addEventListener("click", () => {

    alert("Edit Profile feature coming soon.");

});

// ==========================
// CHANGE PASSWORD BUTTON
// ==========================

document.querySelector(".password-btn").addEventListener("click", () => {

    window.location.href = "../changepassword/changepassword.html";

});