let loginBtn = $("#loginBtn");

signUp = async event => {
  let object = $(event.target)
  let username = object.parent().siblings().eq(1).val();
  let password = object.parent().siblings().eq(3).val();
  let regEx = /^[0-9a-zA-Z]+$/;
  let err = "Invalid username or password!"
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
  regEx = /^[0-9a-zA-Z,.!@#$%^&*()_+-=]+$/
  let validPass = checkValue(regEx, password, err)
  if (validPass && validUser) {
    response = await fetch('/api/users/login', {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password })
    })
    data = await response.json();
    if (data.message[0] === "Y") {
      window.location.href = "/";
    } else {
      alert(data.message);
    }
  }
}

loginBtn.on("click", signUp);