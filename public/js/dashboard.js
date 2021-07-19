let dbBtn = $("#dashboard");

dashboard = () => {
    if (sessionStorage.getItem("user") === null) {
        window.location.href = "/login"
    } else {
        window.location.href = `/dashboard`
    }
}

dbBtn.on('click', dashboard)