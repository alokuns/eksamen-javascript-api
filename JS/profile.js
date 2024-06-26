import {
  USERBASE_URL,
  COUNTRIES_URL,
  getHeadersWithKey,
  getHeaders,
  getCall,
  postCall,
  putCall,
  deleteCall,
  setLoginStatus,
  loggedIn,
  logOut,
  getLoggedInUser,
  getUserData,
} from "./helpers.js";

// Get profile container
const myProfileSection = document.getElementById("myProfileSection");

// Show profile information
const showProfile = async () => {
  const user = await getUserData();

  const nameWrapper = document.createElement("div");
  const nameTitle = document.createElement("h3");
  const name = document.createElement("p");
  const passwordWrapper = document.createElement("div");
  const passwordTitle = document.createElement("h3");
  const passwordContainer = document.createElement("div");
  const password = document.createElement("p");
  const passwordInputField = document.createElement("input");
  const changePasswordBtn = document.createElement("button");
  const editPasswordBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");

  nameWrapper.style.margin = "25px";

  nameTitle.innerHTML = "Username";
  nameTitle.style.fontSize = "1.3rem";
  nameTitle.style.marginBottom = "5px";

  name.innerHTML = user.username;
  name.style.fontSize = "1.2rem";
  name.style.fontStyle = "italic";

  passwordWrapper.style.margin = "25px";

  passwordTitle.innerHTML = "Password";
  passwordTitle.style.fontSize = "1.3rem";
  passwordTitle.style.marginBottom = "5px";

  passwordContainer.style.display = "flex";
  passwordContainer.style.flexFlow = "row wrap";
  passwordContainer.style.alignItems = "center";
  passwordContainer.style.gap = "60px";

  password.innerHTML = user.password;
  password.style.fontSize = "1.2rem";
  password.style.fontStyle = "italic";

  passwordInputField.type = "text";
  passwordInputField.value = user.password;
  passwordInputField.style.fontSize = "1rem";
  passwordInputField.style.padding = "5px";
  passwordInputField.style.width = "140px";

  changePasswordBtn.innerHTML = "Change password";
  changePasswordBtn.style.padding = "7px";
  changePasswordBtn.style.borderRadius = "10px";
  changePasswordBtn.style.fontFamily = "Calibri, sans-serif";
  changePasswordBtn.style.fontSize = "1rem";
  changePasswordBtn.style.backgroundColor = "#d9dfe1";
  changePasswordBtn.addEventListener("click", async () => {
    if (await changePassword(passwordInputField.value)) {
      location.reload();
    }
  });

  editPasswordBtn.innerHTML = "Edit password";
  editPasswordBtn.style.padding = "7px";
  editPasswordBtn.style.borderRadius = "10px";
  editPasswordBtn.style.fontFamily = "Calibri, sans-serif";
  editPasswordBtn.style.fontSize = "1rem";
  editPasswordBtn.style.backgroundColor = "#d9dfe1";
  editPasswordBtn.addEventListener("click", () => {
    myProfileSection.style.marginLeft = "205px";
    passwordContainer.style.gap = "20px";
    passwordContainer.removeChild(password);
    passwordContainer.removeChild(editPasswordBtn);
    passwordContainer.appendChild(passwordInputField);
    passwordContainer.appendChild(changePasswordBtn);
    passwordInputField.focus();
  });

  deleteBtn.innerHTML = "Delete my account";
  deleteBtn.style.padding = "7px";
  deleteBtn.style.borderRadius = "10px";
  deleteBtn.style.fontFamily = "Calibri, sans-serif";
  deleteBtn.style.fontSize = "1rem";
  deleteBtn.style.backgroundColor = "#d9dfe1";
  deleteBtn.style.marginTop = "70px";
  deleteBtn.addEventListener("click", showDeleteAlert);

  nameWrapper.appendChild(nameTitle);
  nameWrapper.appendChild(name);
  passwordContainer.appendChild(password);
  passwordContainer.appendChild(editPasswordBtn);
  passwordWrapper.appendChild(passwordTitle);
  passwordWrapper.appendChild(passwordContainer);
  myProfileSection.appendChild(nameWrapper);
  myProfileSection.appendChild(passwordWrapper);
  myProfileSection.appendChild(deleteBtn);
};

showProfile();

// Show delete alert info box
const showDeleteAlert = () => {
  const alertOverlay = document.getElementById("alertOverlay");
  const alertContainer = document.getElementById("alertContainer");
  alertOverlay.style.display = "block";
  alertContainer.style.display = "flex";

  const container = document.createElement("div");
  const xBtnContainer = document.createElement("div");
  const xBtn = document.createElement("button");
  const msgText = document.createElement("p");
  const msgSmallText = document.createElement("p");
  const btnContainer = document.createElement("div");
  const yesBtn = document.createElement("button");
  const noBtn = document.createElement("button");

  container.style.display = "flex";
  container.style.flexFlow = "column nowrap";
  container.style.justifyContent = "space-between";
  container.style.backgroundColor = "white";
  container.style.borderRadius = "15px";
  container.style.padding = "25px";

  xBtnContainer.style.display = "flex";
  xBtnContainer.style.width = "100%";
  xBtnContainer.style.justifyContent = "end";
  xBtn.addEventListener("click", () => {
    alertOverlay.style.display = "none";
    alertContainer.innerHTML = "";
    alertContainer.style.display = "none";
  });

  xBtn.innerHTML = "X";
  xBtn.style.display = "flex";
  xBtn.style.justifyContent = "center";
  xBtn.style.fontSize = "1.2rem";
  xBtn.style.fontWeight = "bold";
  xBtn.style.padding = "2px 5px";
  xBtn.style.borderRadius = "5px";

  msgText.innerHTML = "Are you sure you want to delete your account?";
  msgText.style.fontSize = "2rem";
  msgText.style.fontWeight = "bold";
  msgText.style.textAlign = "center";
  msgText.style.marginTop = "40px";

  msgSmallText.innerHTML =
    "This can not be undone. All your data will get lost.";
  msgSmallText.style.fontSize = "1.4rem";
  msgSmallText.style.fontWeight = "bold";
  msgSmallText.style.textAlign = "center";
  msgSmallText.style.margin = "10px 0 60px 0";

  btnContainer.style.display = "flex";
  btnContainer.style.flexFlow = "row wrap";
  btnContainer.style.justifyContent = "center";
  btnContainer.style.alignItems = "center";
  btnContainer.style.gap = "20%";

  yesBtn.innerHTML = "Yes";
  yesBtn.style.fontSize = "1.4rem";
  yesBtn.style.fontFamily = "Calibri, sans-serif";
  yesBtn.style.borderRadius = "20px";
  yesBtn.style.padding = "25px 75px";
  yesBtn.addEventListener("click", async () => {
    try {
      const res = await deleteCall(
        `${USERBASE_URL}/${getLoggedInUser()}`,
        getHeadersWithKey()
      );
      if (!res.ok) {
        throw new Error("Noe gikk feil ved sletting av brukeren");
      }
      setLoginStatus(false);
      sessionStorage.removeItem("loggedInUser");
      window.location.href = "./index.html";
    } catch (error) {
      console.error("Det skjedde en feil ved sletting av brukeren", error);
    }
  });

  noBtn.innerHTML = "No";
  noBtn.style.fontSize = "1.4rem";
  noBtn.style.fontFamily = "Calibri, sans-serif";
  noBtn.style.fontWeight = "bold";
  noBtn.style.backgroundColor = "#D9B70D";
  noBtn.style.border = "3px solid black";
  noBtn.style.borderRadius = "20px";
  noBtn.style.padding = "25px 75px";
  noBtn.addEventListener("click", () => {
    alertOverlay.style.display = "none";
    alertContainer.innerHTML = "";
    alertContainer.style.display = "none";
  });

  xBtnContainer.appendChild(xBtn);
  container.appendChild(xBtnContainer);
  container.appendChild(msgText);
  container.appendChild(msgSmallText);
  btnContainer.appendChild(yesBtn);
  btnContainer.appendChild(noBtn);
  container.appendChild(btnContainer);
  alertContainer.appendChild(container);
};

// Change user password
const changePassword = async (newPassword) => {
  const user = await getUserData();
  try {
    const updatedUser = {
      username: user.username,
      password: newPassword,
      myFavoriteCountries: user.myFavoriteCountries,
    };
    const res = await putCall(
      `${USERBASE_URL}/${getLoggedInUser()}`,
      getHeadersWithKey(),
      updatedUser
    );
    if (!res.ok) {
      throw new Error("Det skjedde en feil ved endring av passord");
    }
    return true;
  } catch (error) {
    console.error("Et problem oppsto ved endring av passord", error);
  }
};
