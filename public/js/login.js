let loginBtn = $("#loginBtn");

signUp = async event => {
    let object = $(event.target)
    let email = object.parent().siblings().eq(1).val();
    let password = object.parent().siblings().eq(3).val();
    response = await fetch('/api/users/login', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({email, password})
    })
    data = await response.json();
    if (data.message[0] === "Y") {
      sessionStorage.setItem("user", data.user.name);
      window.location.href = "/";
    } else {
      alert(data.message);
    }
}

loginBtn.on("click", signUp);