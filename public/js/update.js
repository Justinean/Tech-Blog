let submitBtn = $("#submit");
let deleteBtn = $("#delete");

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

deleteform = async event => {
    let object = $(event.target)
    let response = await fetch(`/api/users/dashboard/delete/${window.location.href.split("/")[window.location.href.split("/").length - 1]}`, {
        method: "DELETE",
    })
    let data = await response.json()
    alert(data.message)
    if (response.status === 200) {
        window.location.href = "/dashboard";
    }
}

deleteBtn.on("click", deleteform);
submitBtn.on("click", submitform);