const form = document.querySelector("#form");
const usernameError = document.querySelector(".username-error");
const passwordError = document.querySelector(".password-error");
const url = "http://localhost:3500/api/users";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = form.username.value;
  const password = form.password.value;
  console.log(username,password)

  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data)

  } catch (err) {
    console.log(err);
  }
});
