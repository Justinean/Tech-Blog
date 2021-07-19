let signupBtn = $("#loginBtn");

signUp = async event => {
    let object = $(event.target)
    let username = object.parent().siblings().eq(1).val();
    let password = object.parent().siblings().eq(3).val();
    response = await fetch('/api/users', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({username, password})
    })
    data = await response.json();
    if (data.id === undefined) {
        alert("Invalid information, please try again.")
    } else {
        window.location.href = "/"
    }
}

signupBtn.on("click", signUp);