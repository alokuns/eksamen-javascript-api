import {
  USERBASE_URL,
  getHeadersWithKey,
  getCall,
  setLoginStatus,
} from "./helpers.js";

// Save the logged in user id to sessionstorage
const setLoggedInUser = (id) => {
  return sessionStorage.setItem("loggedInUser", JSON.stringify(id));
};

// Checks if username and password is correct and logs in if it is
const authenticateUser = async (username, password) => {
  const wrongUserInfo = document.querySelector("#wrongUserInfo");
  try {
    const res = await getCall(USERBASE_URL, getHeadersWithKey());
    if (!res.ok) {
      throw new Error(
        "Det oppsto en feil som gjorde at brukeren ikke kunne autentiseres"
      );
    }
    const data = await res.json();
    // Find the user that matches the username input
    const user = data.items.find((user) => user.username === username);
    if (user && user.password === password) {
      // Logs in the user if userInfo is correct
      setLoginStatus(true);
      setLoggedInUser(user._uuid);
      window.location.href = "./index.html";
    } else {
      // Tell the user if not correct
      wrongUserInfo.style.display = "block";
    }
  } catch (error) {
    console.error("Noe gikk feil ved autentisering av bruker");
  }
};

// Add eventlistener to log in button
const loginBtn = document.querySelector("#loginBtn");
loginBtn.addEventListener("click", async () => {
  const usernameInput = document.querySelector("#usernameInput").value;
  const passwordInput = document.querySelector("#passwordInput").value;
  await authenticateUser(usernameInput, passwordInput);
});
