import { loggedIn, logOut } from "./helpers.js";

// Sjekker om brukeren er logget på
const checkLoggedInStatus = () => {
  const loginListPoint = document.getElementById("loginListPoint");
  if (loggedIn()) {
    // If yes, show "Log out"-button in header
    let logOutBtn = document.createElement("button");
    logOutBtn.innerHTML = "Log out";
    logOutBtn.classList.add("logOutBtn");
    logOutBtn.addEventListener("click", logOut);
    loginListPoint.appendChild(logOutBtn);
  } else {
    // If no, show "Log in"
    loginListPoint.innerHTML = `<a href="./login.html">Log in</a>`;
  }
};

checkLoggedInStatus();
