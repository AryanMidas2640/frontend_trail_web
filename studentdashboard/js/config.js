// ======================================
// Placement Portal Configuration
// ======================================

const BASE_URL = "http://localhost:9090";

// Agar future me Render ya Railway pe deploy karega
// const BASE_URL = "https://your-domain.com";


// ======================================
// TOKEN
// ======================================

function getToken() {
    return localStorage.getItem("token");
}

function setToken(token) {
    localStorage.setItem("token", token);
}

function removeToken() {
    localStorage.removeItem("token");
}


// ======================================
// USER DETAILS
// ======================================

function saveUser(user) {

    localStorage.setItem("username", user.username || "");

    localStorage.setItem("role", user.role || "");

    localStorage.setItem("tenantId", user.tenantId || "");

    localStorage.setItem("email", user.email || "");

}

function getUser() {

    return {

        username: localStorage.getItem("username"),

        role: localStorage.getItem("role"),

        tenantId: localStorage.getItem("tenantId"),

        email: localStorage.getItem("email")

    };

}

function clearUser() {

    localStorage.clear();

}


// ======================================
// AUTH HEADER
// ======================================

function authHeaders() {

    return {

        "Content-Type": "application/json",

        "Authorization": "Bearer " + getToken()

    };

}


// ======================================
// GET
// ======================================

async function apiGet(url) {

    return await fetch(BASE_URL + url, {

        method: "GET",

        headers: authHeaders()

    });

}


// ======================================
// POST
// ======================================

async function apiPost(url, body) {

    return await fetch(BASE_URL + url, {

        method: "POST",

        headers: authHeaders(),

        body: JSON.stringify(body)

    });

}


// ======================================
// PUT
// ======================================

async function apiPut(url, body) {

    return await fetch(BASE_URL + url, {

        method: "PUT",

        headers: authHeaders(),

        body: JSON.stringify(body)

    });

}


// ======================================
// DELETE
// ======================================

async function apiDelete(url) {

    return await fetch(BASE_URL + url, {

        method: "DELETE",

        headers: authHeaders()

    });

}


// ======================================
// LOGIN CHECK
// ======================================

function isLoggedIn() {

    return getToken() !== null;

}


// ======================================
// LOGOUT
// ======================================

function logout() {

    clearUser();

    window.location.href = "../../login/login.html";

}