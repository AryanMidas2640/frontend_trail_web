document.addEventListener("DOMContentLoaded", function () {

    const settingBtn = document.getElementById("settingBtn");

    if (settingBtn) {

        settingBtn.addEventListener("click", function () {

            window.location.href = "../../admin/settings/settings.html";

        });

    }

});