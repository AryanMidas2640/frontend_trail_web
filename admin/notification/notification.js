//const BASE_URL = "https://hiringnest-trail-backend-code.onrender.com";
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
        window.location.href = "../../login/login.html";
        return;
    }

    loadNotifications();

});

async function loadNotifications() {

    try {

        const response = await fetch(
            BASE_URL + "/api/jobs/notifications",
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

        totalNotifications.innerText = notifications.length;

        const unread = notifications.filter(
            n => n.read === false
        ).length;

        unreadNotifications.innerText = unread;

        notificationContainer.innerHTML = "";

        if (notifications.length === 0) {

            notificationContainer.innerHTML = `

                <div class="empty">

                    <i class="fa-solid fa-bell-slash"
                       style="font-size:60px;color:#94a3b8;"></i>

                    <h3 style="margin-top:20px;">
                        No Notifications
                    </h3>

                </div>

            `;

            return;
        }

        notifications.forEach(notification => {

            notificationContainer.innerHTML += `

                <div class="notification-card">

                    <div class="icon">

                        <i class="fa-solid fa-user-check"></i>

                    </div>

                    <div class="content">

                        <h3>${notification.type}</h3>

                        <p>${notification.message}</p>

                        <small>${notification.createdAt}</small>

                    </div>

                    <span class="badge ${
                        notification.read ? "read" : "unread"
                    }">

                        ${notification.read ? "Read" : "New"}

                    </span>

                </div>

            `;

        });

    }
    catch (error) {

        console.log(error);

        notificationContainer.innerHTML = `

            <div class="empty">

                <h3>
                    Failed to Load Notifications
                </h3>

            </div>

        `;

    }

}