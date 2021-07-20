let signupBtn = $("#loginBtn");

signUp = async event => {
    let object = $(event.target)
    let username = object.parent().siblings().eq(1).val();
    let password = object.parent().siblings().eq(3).val();
    let regEx = /^[0-9a-zA-Z]+$/;
    let err = "Username must be alphanumeric"
    checkValue = (regEx, val, err) => {
        if (regEx.test(val)) {
        return true;
        }
        else {
        alert(err);
        return false;
        }
    }
    let validUser = checkValue(regEx, username, err)
    regEx = /^[0-9a-zA-Z/,.!@#$%^&*()_+-=]+$/
    console.log(regEx)
    err = 'Password must be alphanumeric with only these symbols "/.!@#$%^&*()_+-="'
    let validPass = checkValue(regEx, password, err)
    if (validPass && validUser) {
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
}

signupBtn.on("click", signUp);