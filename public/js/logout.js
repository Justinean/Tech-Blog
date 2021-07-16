let logoutBtn = $("#logout");
console.log("pog");
console.log(logoutBtn);

logout = async () => {
  console.log("pog")
  response = await fetch("/api/users/logout", {method: "POST"})
  
  if (response.status === 204) {
    alert("Logout successful!")
    window.location.reload();
  } else {
    alert("Could not log you out, try again.")
  }
}

logoutBtn.on("click", logout)