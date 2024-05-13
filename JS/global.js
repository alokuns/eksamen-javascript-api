import { loggedIn, logOut } from "./helpers.js";

// Checks if the user is logged in
const checkLoggedInStatus = () => {
  const loginListPoint = document.getElementById("loginListPoint");
  const profileListPoint = document.getElementById("profileListPoint");
  if (loggedIn()) {
    // If yes, show "Log out"-button and profile-icon in header
    let logOutBtn = document.createElement("button");
    logOutBtn.innerHTML = "Log out";
    logOutBtn.classList.add("logOutBtn");
    logOutBtn.addEventListener("click", logOut);
    loginListPoint.appendChild(logOutBtn);
    profileListPoint.style.display = "block";
  } else {
    // If no, show "Log in"
    loginListPoint.innerHTML = `<a href="./login.html">Log in</a>`;
  }
};

checkLoggedInStatus();
