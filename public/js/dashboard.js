let dbBtn = $("#dashboard");

dashboard = async () => {
    let response = await fetch('/api/users/getuser');
    let data = await response.json();
    let user;
    if (response.status === 200) {
        user = data.user;
    }
    if (!user) {
        window.location.href = "/login"
    } else {
        window.location.href = `/dashboard`
    }

}

dbBtn.on('click', dashboard)