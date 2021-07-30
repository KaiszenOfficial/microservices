document.getElementById("shortenBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  const longUrl = document.getElementById("longUrl").value;

  if (!longUrl || longUrl.trim().length == 0) {
    document.getElementById("alert-div").classList.add("alert-warning");
    document.getElementById("alert-text").innerText = "Please enter URL!";
    document.getElementById("alert-div").style.visibility = "visible";

    setTimeout(() => {
      document.getElementById("alert-div").style.visibility = "hidden";
      document.getElementById("alert-text").innerText = "";
      document.getElementById("alert-div").classList.remove("alert-warning");
    }, 3000);

    return false;
  }

  try {
    const URL = "/url/shorten";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ longUrl }),
    };
    let response = await fetch(URL, options);

    if (response.ok) {
      let data = await response.json();
	  
      document.getElementById("shortUrl").value = data.shortUrl;
      document.getElementById("info-box").style.visibility = "visible";
    } else {
      let errorData = await response.json();

      document.getElementById("alert-div").classList.add("alert-danger");
      document.getElementById("alert-text").innerText = errorData.error;
      document.getElementById("alert-div").style.visibility = "visible";

      setTimeout(() => {
        document.getElementById("alert-div").style.visibility = "hidden";
        document.getElementById("alert-text").innerText = "";
        document.getElementById("alert-div").classList.remove("alert-danger");
      }, 3000);
    }
  } catch (error) {
    console.log(error);
  }
});

document.getElementById("copyBtn").addEventListener("click", (e) => {
  e.preventDefault();

  /* Get the text field */
  let shortUrl = document.getElementById("shortUrl");

  /* Select the text field */
  shortUrl.select();
  shortUrl.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + shortUrl.value);
});
