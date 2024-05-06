import {
  USERBASE_URL,
  getHeadersWithKey,
  getCall,
  postCall,
} from "./helpers.js";

// Check if username already exists in the database
const checkIfUsernameExist = async (username) => {
  try {
    const res = await getCall(USERBASE_URL, getHeadersWithKey);
    if (!res.ok) {
      throw new Error(
        "Det skjedde en feil i databasen ved henting av brukerdata"
      );
    }
    const data = await res.json();
    return data.items.some((user) => {
      user.username === username;
    });
  } catch (error) {
    console.error("Noe gikk feil ved henting av brukerdata");
  }
};

// Create new user
const createUser = async (user) => {
  try {
    const res = await postCall(USERBASE_URL, getHeadersWithKey, user);
    if (!res.ok) {
      throw new Error(
        "En feil oppsto i databasen som gjorde at brukeren ikke kunne bli lagt til"
      );
    }
  } catch (error) {
    console.error("Noe gikk feil ved posting av brukeren", error);
  }
};

// Get inputs and create user if not duplicated
const getNewUser = async () => {
  const newUsernameInput = document.getElementById("newUsernameInput");
  const newPasswordInput = document.getElementById("newPasswordInput");
  const takenUsernameInfo = document.getElementById("takenUsernameInfo");

  const user = {
    user: newUsernameInput,
    password: newPasswordInput,
    myFavoriteCountries: [],
  };

  if (await checkIfUsernameExist(newUsernameInput)) {
    takenUsernameInfo.style.display = "block";
    return false;
  } else {
    await createUser(user);
    return false;
  }
};

// Add eventlistener to register-btn
const submitNewUserBtn = document.getElementById("submitNewUserBtn");
submitNewUserBtn.addEventListener("click", async () => {
  if (await getNewUser()) {
    window.location.href = "./login.html";
  }
});
