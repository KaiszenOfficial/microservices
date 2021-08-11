let attachment = null;

document.getElementById("attachment").addEventListener("change", (e) => {
  attachment = e.target.files[0];
});

function resetField() {
  document.getElementById("attachment").value = null;
}

function showAlertDiv(text) {
  document.getElementById("alert-text").innerText = text;
  document.getElementById("alert-div").classList.add("alert-warning");
  document.getElementById("alert-div").style.visibility = "visible";
  setTimeout(() => {
    hideAlertDiv();
  }, 3000);
}

function hideAlertDiv() {
  document.getElementById("alert-div").style.visibility = "hidden";
  document.getElementById("alert-div").classList.remove("alert-warning");
  document.getElementById("alert-text").innerText = "";
}

document.getElementById("uploadBtn").addEventListener("click", (e) => {
  if (!attachment) {
    showAlertDiv("Please select a file to upload");
    return false;
  }

  let formData = new FormData();
  formData.append("attachment", attachment, attachment.name);

  const requestOptions = {
    method: "POST",
    body: formData
  };
  fetch("/files/single", requestOptions)
    .then((response) => {
      if (!response.ok) {
        response.json().then(error => Promise.reject(error));
      }
      return response.json();
    })
    .then((data) => {
      // handle success response
      resetField();
      let infoBox = document.getElementById("info-box");
      
      let pre = document.createElement("pre");
      pre.innerText = JSON.stringify(data.data.file, undefined, 4);

      infoBox.appendChild(pre);
      infoBox.style.visibility = "visible"

    })
    .catch((error) => {
      console.log(error);
    });
});
