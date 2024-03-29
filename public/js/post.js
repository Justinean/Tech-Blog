let submitBtn = $("#submit");

submitform = async event => {
    let object = $(event.target)
    let name = object.siblings().eq(1).val();
    let content = object.siblings().eq(3).val();
    let response = await fetch(`/api/users/dashboard/new`, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({name, content})
    })
    let data = await response.json()
    alert(data.message)
    if (response.status === 200) {
        window.location.href = "/dashboard";
    }
    
}

submitBtn.on("click", submitform)