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

const showProfile = async () => {
    const user = await getUserData();

    const nameWrapper = document.createElement("div");
    const nameTitle = document.createElement("h3");
    const name = document.createElement("p");
    const passwordWrapper = document.createElement("div");
    const passwordTitle = document.createElement("h3");
    const passwordContainer = document.createElement("div");
    const password = document.createElement("p");
    const changePasswordBtn = document.createElement("button");
    const deleteBtn = document.createElement
    ("button");

    nameWrapper.style.margin = "25px";

    nameTitle.innerHTML = "Username";
    nameTitle.style.fontSize = "1.3rem";
    nameTitle.style.marginBottom = "5px";

    name.innerHTML = user.username;
    name.style.fontSize = "1.2rem";
    name.style.fontStyle = "italic";
    
    passwordWrapper.style.margin = "25px";

    passwordTitle.innerHTML = "Password"
    passwordTitle.style.fontSize = "1.3rem";
    passwordTitle.style.marginBottom = "5px";

    passwordContainer.style.display = "flex";
    passwordContainer.style.flexFlow = "row wrap";
    passwordContainer.style.alignItems = "center";
    passwordContainer.style.gap = "60px";

    password.innerHTML = user.password;
    password.style.fontSize = "1.2rem";
    password.style.fontStyle = "italic";

    changePasswordBtn.innerHTML = "Edit password";
    changePasswordBtn.style.padding = "7px";
    changePasswordBtn.style.borderRadius = "10px";
    changePasswordBtn.style.fontFamily = "Calibri, sans-serif"
    changePasswordBtn.style.fontSize = "1rem";
    changePasswordBtn.style.backgroundColor = "#d9dfe1";

    deleteBtn.innerHTML = "Delete my profile";
    deleteBtn.style.padding = "7px"
    deleteBtn.style.borderRadius = "10px"
    deleteBtn.style.fontFamily = "Calibri, sans-serif"
    deleteBtn.style.fontSize = "1rem";
    deleteBtn.style.backgroundColor = "#d9dfe1";
    deleteBtn.style.marginTop = "70px";

    nameWrapper.appendChild(nameTitle);
    nameWrapper.appendChild(name);
    passwordContainer.appendChild(password);
    passwordContainer.appendChild(changePasswordBtn);
    passwordWrapper.appendChild(passwordTitle);
    passwordWrapper.appendChild(passwordContainer);
    myProfileSection.appendChild(nameWrapper);
    myProfileSection.appendChild(passwordWrapper);
    myProfileSection.appendChild(deleteBtn);
};

showProfile();

const showDeleteAlert = () => {
    
}