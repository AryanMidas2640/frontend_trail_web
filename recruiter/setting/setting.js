const BASE_URL = "https://hiringnest-trail-backend-code.onrender.com";

async function logout() {

    const token =
        localStorage.getItem("jwt") ||
        localStorage.getItem("token");

    try {

        await fetch(BASE_URL + "/api/jobs/logout", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

    } catch (error) {

        console.log("Logout Error:", error);

    }

    localStorage.clear();
    sessionStorage.clear();

    window.location.href = "../../login/login.html";
}