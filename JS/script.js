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
} from "./helpers.js";

const showContent = () => {
  const welcomeContainer = document.getElementById("welcomeContainer");
  if (loggedIn()) {
    showCountries();
  } else {
    welcomeContainer.style.display = "flex";
  }
};

showContent();

const showCountries = () => {};
