document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const body = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    username: document.getElementById("username").value,
    email: document.getElementById("registerEmail").value,
    password: document.getElementById("registerPassword").value,
  };
  fetch("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((json) => {
      console.log(json);
    })
    .catch((error) => {
      console.error(error);
    });
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const body = {
    email: document.getElementById("loginEmail").value,
    password: document.getElementById("loginPassword").value,
  };
  fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((json) => {
      let { data: { token, user }} = json;

      console.log(token, user);
    })
    .catch((error) => {
      console.error(error);
    });
});
