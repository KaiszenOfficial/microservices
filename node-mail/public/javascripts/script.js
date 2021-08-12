// new bootstrap.Carousel(document.querySelector("templateCarousel"), { interval: false })

function sendEmail(e) {
	e.preventDefault();

	let subject = document.getElementById("subject").value;
	let templateId;
	let contentType = document.getElementById("contentType").value;
	let content = document.getElementById("content").value;

	let payload = { subject, templateId, contentType, content };

	fetch("/mail", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(payload)
	})
	.then(response => {
		if(response.ok) {
			return response.json()
		}


	})
	.then(data => {
		console.log(data);
	})
	.catch(error => {
		
	})
}

document.getElementById("sendBtn").addEventListener("click", sendEmail);