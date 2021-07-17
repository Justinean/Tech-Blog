let dbBtn = $("#dashboard");

dashboard = () => {
    if (sessionStorage.getItem("user") === null) {
        window.location.href = "/login"
    } else {
        window.location.href = `/dashboard/${sessionStorage.getItem("user")}`
    }
}

dbBtn.on('click', dashboard)