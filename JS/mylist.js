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

// Get list id
const myFavoriteList = document.querySelector("#myFavoriteList");

// Fetch favorite countries
const getData = async () => {
  myFavoriteList.innerHTML = "";
  // Show favourite countries if logged in
  if (loggedIn()) {
    try {
      const res = await getCall(
        `${USERBASE_URL}/${getLoggedInUser()}`,
        getHeadersWithKey()
      );
      if (!res.ok) {
        throw new Error("Noe gikk feil ved henting av landene");
      }
      const data = await res.json();
      data.myFavoriteCountries.forEach((country) => {
        showMyCountries(country);
      });
    } catch (error) {
      console.error("Noe gikk feil ved henting av favoritt land", error);
    }
  } else {
    myFavoriteList.innerHTML = `<p>You are not logged in. Log in <a href="./login.html">here</a></p>`;
  }
};
getData();

// Show favorite countries
const showMyCountries = (country) => {
  const divContainer = document.createElement("div");
  const removeContainer = document.createElement("div");
  const removeBtn = document.createElement("button");
  const image = document.createElement("img");
  const name = document.createElement("p");
  const commentTitle = document.createElement("p");
  const commentContainer = document.createElement("div");
  const commentInput = document.createElement("input");
  const saveCommentSymbol = document.createElement("img");
  const saveCommentBtn = document.createElement("button");

  divContainer.style.display = "flex";
  divContainer.style.flexFlow = "column nowrap";
  divContainer.style.justifyContent = "center";
  divContainer.style.alignItems = "center";
  divContainer.style.width = "300px";
  divContainer.style.padding = "20px";
  divContainer.style.gap = "10px";
  divContainer.style.backgroundColor = "#99B4BF";
  divContainer.style.border = "1px solid black";
  divContainer.style.borderRadius = "5px";
  divContainer.style.cursor = "pointer";

  removeContainer.style.display = "flex";
  removeContainer.style.width = "100%";
  removeContainer.style.justifyContent = "end";

  removeBtn.innerHTML = "X";
  removeBtn.style.display = "flex";
  removeBtn.style.justifyContent = "center";
  removeBtn.style.alignItems = "center";
  removeBtn.style.fontSize = "1rem";
  removeBtn.style.fontWeight = "bold";
  removeBtn.style.padding = "5px 8px";
  removeBtn.style.borderRadius = "5px";

  image.src = country.flag;
  image.alt = "The flag of" + "";
  image.style.height = "50px";
  image.style.objectFit = "contain";

  name.innerHTML = country.name;
  name.style.fontSize = "1.6rem";
  name.style.fontWeight = "bold";
  name.style.color = "black";
  name.style.textAlign = "center";

  commentTitle.innerHTML = "Why do you like this country?";
  commentTitle.style.fontSize = "1.1rem";
  commentTitle.style.fontWeight = "bold";
  commentTitle.style.marginTop = "20px";

  commentContainer.style.display = "flex";
  commentContainer.style.flexFlow = "row nowrap";
  commentContainer.style.justifyContent = "start";

  commentInput.type = "text";
  commentInput.placeholder =
    "Ex: love the food, people etc.";
  commentInput.style.padding = "10px";
  commentInput.style.fontSize = "0.9rem";
  commentInput.style.width = "220px";

  saveCommentSymbol.src = "";
  saveCommentSymbol.alt = "";
  saveCommentSymbol.style.height = "10px";
  saveCommentSymbol.style.objectFit = "contain";

  saveCommentBtn.style.background = "none";
  saveCommentBtn.style.border = "none";

  removeContainer.appendChild(removeBtn);
  divContainer.appendChild(removeContainer);
  divContainer.appendChild(image);
  divContainer.appendChild(name);
  divContainer.appendChild(commentTitle);
  commentContainer.appendChild(commentInput);
  saveCommentBtn.appendChild(saveCommentSymbol);
  commentContainer.appendChild(saveCommentBtn);
  divContainer.appendChild(commentContainer);
  myFavoriteList.appendChild(divContainer);
};
