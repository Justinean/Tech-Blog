let submitBtn = $("#submit");

submitform = async event => {
    let object = $(event.target)
    let content = object.siblings().eq(1).val();
    let blog = window.location.href.split("/")[window.location.href.split("/").length - 1];
    let response = await fetch(`/api/users/comment`, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({content, blog})
    })
    let data = await response.json()
    alert(data.message);
    if (response.status === 200) {
        window.location.reload();
    }
}

submitBtn.on("click", submitform);