const { response } = require("express");

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
    if (response.status === 200) {
        window.location.href = "/";
    } else if (response.status === 400) {
        alert("Username already exists!");
    } else {
        alert("Could not create account!");
    }
}

signupBtn.on("click", signUp);