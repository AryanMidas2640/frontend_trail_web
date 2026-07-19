const BASE_URL = "https://hiringnest-trail-backend-code.onrender.com";

const token =
    localStorage.getItem("jwt") ||
    localStorage.getItem("token");

const notificationContainer =
    document.getElementById("notificationContainer");

const totalNotifications =
    document.getElementById("totalNotifications");

const unreadNotifications =
    document.getElementById("unreadNotifications");

document.addEventListener("DOMContentLoaded", () => {

    if (!token) {

        alert("Please Login First");

        window.location.href = "../../login/login.html";

        return;

    }

    loadNotifications();

});

async function loadNotifications() {

    try {

        const response = await fetch(
            BASE_URL + "/api/admin/notifications",
            {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                }
            }
        );

        if (!response.ok) {

            throw new Error("Failed to Load Notifications");

        }

        const notifications = await response.json();

        console.log("Notifications :", notifications);

        totalNotifications.innerText = notifications.length;

        unreadNotifications.innerText =
            notifications.filter(n => !n.read).length;

        notificationContainer.innerHTML = "";

        if (notifications.length === 0) {

            notificationContainer.innerHTML = `

                <div class="empty">

                    <i class="fa-solid fa-bell-slash"></i>

                    <h2>No Notifications Found</h2>

                </div>

            `;

            return;

        }

        notifications.reverse();

        notifications.forEach(notification => {

            let icon = "fa-bell";
            let border = "#2563eb";

            if (notification.type === "APPLICATION") {

                icon = "fa-user-check";
                border = "#10b981";

            }

            else if (notification.type === "JOB_POSTED") {

                icon = "fa-briefcase";
                border = "#2563eb";

            }

            else if (notification.type === "JOB_DELETED") {

                icon = "fa-trash";
                border = "#ef4444";

            }

            notificationContainer.innerHTML += `

            <div class="notification-card"
                 style="border-left:6px solid ${border};">

                <div class="left">

                    <div class="icon"
                         style="background:${border};">

                        <i class="fa-solid ${icon}"></i>

                    </div>

                </div>

                <div class="middle">

                    <h2>${notification.type}</h2>

                    <p class="message">

                        ${notification.message || ""}

                    </p>

                    ${
                        notification.studentName ?

                        `<p><b>Student :</b> ${notification.studentName}</p>`

                        : ""
                    }

                    ${
                        notification.studentUsername ?

                        `<p><b>Username :</b> ${notification.studentUsername}</p>`

                        : ""
                    }

                    ${
                        notification.recruiterEmail ?

                        `<p><b>Recruiter :</b> ${notification.recruiterEmail}</p>`

                        : ""
                    }

                    ${
                        notification.companyName ?

                        `<p><b>Company :</b> ${notification.companyName}</p>`

                        : ""
                    }

                    ${
                        notification.jobTitle ?

                        `<p><b>Job Title :</b> ${notification.jobTitle}</p>`

                        : ""
                    }

                    ${
                        notification.jobId ?

                        `<p><b>Job ID :</b> ${notification.jobId}</p>`

                        : ""
                    }

                    ${
                        notification.tenantId ?

                        `<p><b>Tenant :</b> ${notification.tenantId}</p>`

                        : ""
                    }

                    <small>

                        <i class="fa-solid fa-clock"></i>

                        ${formatDate(notification.createdAt)}

                    </small>

                </div>

                <div class="right">

                    <span class="badge ${notification.read ? "read" : "unread"}">

                        ${notification.read ? "Read" : "New"}

                    </span>

                </div>

            </div>

            `;

        });

    }

    catch (error) {

        console.error(error);

        notificationContainer.innerHTML = `

            <div class="empty">

                <i class="fa-solid fa-circle-exclamation"></i>

                <h2>Unable to Load Notifications</h2>

            </div>

        `;

    }

}

function formatDate(dateString) {

    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleString("en-IN", {

        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"

    });

}