let submitBtn = $("#submit");

submitform = async event => {
    let object = $(event.target)
    let title = object.siblings().eq(1).val();
    let content = object.siblings().eq(3).val();
    let response = await fetch(`/api/users/dashboard/edit/${window.location.href.split("/")[window.location.href.split("/").length - 1]}`, {
        method: "PUT",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({title, content})
    })
    let data = await response.json()
    alert(data.message)
    if (response.status === 200) {
        window.location.href = "/dashboard";
    }
}

submitBtn.on("click", submitform)