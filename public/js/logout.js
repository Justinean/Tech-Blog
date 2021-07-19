let logoutBtn = $("#logout");

logout = async () => {
  response = await fetch("/api/users/logout", {method: "POST"})
  
  if (response.status === 204) {
    alert("Logout successful!")
    window.location.href = "/";
  } else {
    alert("Could not log you out, try again.")
  }
}

logoutBtn.on("click", logout)