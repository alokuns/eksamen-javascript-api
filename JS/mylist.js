import {
  USERBASE_URL,
  getHeadersWithKey,
  getCall,
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
const getCountries = async () => {
  myFavoriteList.innerHTML = "";
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
    myFavoriteList.innerHTML = `<p class="infoText">You are not logged in. Log in <a href="./login.html">here</a></p>`;
  }
};
getCountries();

// Remove country from favorites
const deleteCountry = async (object) => {
  let user;
  try {
    const res = await getCall(
      `${USERBASE_URL}/${getLoggedInUser()}`,
      getHeadersWithKey()
    );
    if (!res.ok) {
      throw new Error("Noe gikk feil i databasen ved henting av land");
    }
    const data = await res.json();
    user = data;
  } catch (error) {
    console.error("Det skjedde en feil ved henting av land", error);
  }

  try {
    const updatedList = {
      username: user.username,
      password: user.password,
      myFavoriteCountries: user.myFavoriteCountries,
    };
    let index = updatedList.myFavoriteCountries.findIndex(
      (country) => country.name === object.name
    );
    updatedList.myFavoriteCountries.splice(index, 1);
    const res = await putCall(
      `${USERBASE_URL}/${getLoggedInUser()}`,
      getHeadersWithKey(),
      updatedList
    );
    if (!res.ok) {
      throw new Error("Noe gikk feil ved oppdatering av land til databasen");
    }
    await getCountries();
  } catch (error) {
    console.error("Det skjedde en feil med å oppdatere favoritt land", error);
  }
};

// Save comment to database
const saveCommentToDatabase = async (object, comment) => {
  let user;
  try {
    const res = await getCall(
      `${USERBASE_URL}/${getLoggedInUser()}`,
      getHeadersWithKey()
    );
    if (!res.ok) {
      throw new Error("Noe gikk feil i databasen ved henting av land");
    }
    const data = await res.json();
    user = data;
  } catch (error) {
    console.error("Det skjedde en feil ved henting av land", error);
  }

  try {
    const updatedList = {
      username: user.username,
      password: user.password,
      myFavoriteCountries: user.myFavoriteCountries,
    };
    let index = updatedList.myFavoriteCountries.findIndex(
      (country) => country.name === object.name
    );
    updatedList.myFavoriteCountries[index].comment = comment;
    const res = await putCall(
      `${USERBASE_URL}/${getLoggedInUser()}`,
      getHeadersWithKey(),
      updatedList
    );
    if (!res.ok) {
      throw new Error("Noe gikk feil ved lagring av kommentar til databasen");
    }
  } catch (error) {
    console.error("Det skjedde en feil med lagring av kommentar", error);
  }
};

// Show favorite countries
const showMyCountries = (country) => {
  const divContainer = document.createElement("div");
  const removeContainer = document.createElement("div");
  const removeBtn = document.createElement("button");
  const image = document.createElement("img");
  const name = document.createElement("p");
  const commentSection = document.createElement("div");
  const commentTitle = document.createElement("p");
  const inputContainer = document.createElement("div");
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
  removeBtn.addEventListener("click", async () => {
    await deleteCountry(country);
  });

  image.src = country.flag;
  image.alt = "The flag of" + "";
  image.style.height = "50px";
  image.style.objectFit = "contain";

  name.innerHTML = country.name;
  name.style.fontSize = "1.6rem";
  name.style.fontWeight = "bold";
  name.style.color = "black";
  name.style.textAlign = "center";

  commentSection.style.display = "flex";
  commentSection.style.flexFlow = "column nowrap";
  commentSection.style.justifyContent = "start";

  commentTitle.innerHTML = "Why do you like this country?";
  commentTitle.style.fontSize = "1.1rem";
  commentTitle.style.fontWeight = "bold";
  commentTitle.style.margin = "20px 0 10px 0";

  inputContainer.style.display = "flex";
  inputContainer.style.flexFlow = "row nowrap";
  inputContainer.style.justifyContent = "start";

  commentInput.type = "text";
  commentInput.placeholder = "Ex: Love the food, people etc.";
  commentInput.value = country.comment;
  commentInput.style.padding = "10px";
  commentInput.style.fontSize = "0.9rem";
  commentInput.style.width = "220px";
  commentInput.style.borderRadius = "10px";

  const saveComment = () => {
    saveCommentBtn.style.opacity = "0";
    saveCommentBtn.style.cursor = "default";
    const commentValue = commentInput.value;
    saveCommentToDatabase(country, commentValue);
  };

  commentInput.addEventListener("focus", () => {
    saveCommentBtn.style.opacity = "1";
    saveCommentBtn.style.cursor = "pointer";
    saveCommentBtn.addEventListener("click", saveComment);
    saveCommentBtn.onclick = () => {
      saveCommentBtn.removeEventListener("click", saveComment);
    };
  });

  commentInput.addEventListener("blur", () => {
    saveComment();
    saveCommentBtn.removeEventListener("click", saveComment);
  });

  saveCommentSymbol.src = "./assets/checkIcon.png";
  saveCommentSymbol.alt = "Check symbol";
  saveCommentSymbol.style.height = "20px";
  saveCommentSymbol.style.marginLeft = "15px";

  saveCommentBtn.style.background = "none";
  saveCommentBtn.style.border = "none";
  saveCommentBtn.style.cursor = "default";
  saveCommentBtn.style.opacity = "0";

  removeContainer.appendChild(removeBtn);
  divContainer.appendChild(removeContainer);
  divContainer.appendChild(image);
  divContainer.appendChild(name);
  commentSection.appendChild(commentTitle);
  inputContainer.appendChild(commentInput);
  saveCommentBtn.appendChild(saveCommentSymbol);
  inputContainer.appendChild(saveCommentBtn);
  commentSection.appendChild(inputContainer);
  divContainer.appendChild(commentSection);
  myFavoriteList.appendChild(divContainer);
};
