// ===============================
// Login
// ===============================

document.getElementById("loginForm").addEventListener("submit", loginUser);

async function loginUser(e) {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please enter username and password.");
        return;
    }

    try {

        const response = await fetch(BASE_URL + "/api/jobs/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: username,
                password: password
            })

        });

        const data = await response.json();

        console.log(data);

        if (!response.ok || data.success !== true) {

            alert(data.message || "Login Failed");

            return;

        }

        // Save Token
        setToken(data.token);

        // Save User Details
        saveUser({
            username: data.username,
            role: data.role,
            tenantId: data.tenantId,
            email: data.email
        });

        alert(data.message);

        // Redirect
        switch (data.role) {

    case "STUDENT":
       window.location.href = "../studentdashboard/studentdashboard/studentdashboard.html";
        break;

    case "RECRUITER":
        window.location.href = "../recruiter/recruiter.html";
        break;

    case "ADMIN":
        window.location.href = "../admin/admin.html";
        break;

}

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

    // ===============================
// Forgot Password
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const forgotBtn = document.getElementById("forgotPassword");

    if (forgotBtn) {

        forgotBtn.addEventListener("click", function (e) {

            e.preventDefault();

            window.location.href = "../forgetpass/forgetpass.html";

        });

    }

});

}