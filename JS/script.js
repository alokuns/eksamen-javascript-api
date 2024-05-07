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

// Show content based on if user is logged in or not
const showContent = () => {
  const welcomeContainer = document.getElementById("welcomeContainer");
  if (loggedIn()) {
    fetchCountries();
  } else {
    welcomeContainer.style.display = "flex";
  }
};

showContent();

// Fetch countries
let allCountries;
const fetchCountries = async () => {
  try {
    const res = await getCall(COUNTRIES_URL, getHeaders());
    if (!res.ok) {
      throw new Error("Noe gikk feil i databasen ved opphenting av land");
    }
    const data = await res.json();
    allCountries = data;
    allCountries.forEach((country) => {
      showCountries(country);
    });
  } catch (error) {
    console.error("Det oppsto et problem ved opphenting av land", error);
  }
};

// Get countries container
const countryList = document.getElementById("countryList");

// Show countries
const showCountries = (country) => {
  const divContainer = document.createElement("div");
  const image = document.createElement("img");
  const overlay = document.createElement("div");
  const name = document.createElement("p");

  divContainer.style.width = "250px";
  divContainer.style.position = "relative";

  image.src = country.flags.png;
  image.alt = "The flag of" + "";
  image.style.height = "150px";
  image.style.width = "100%";
  image.style.objectFit = "contain";
  image.style.position = "relative"

  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.width = "100%";
  overlay.style.height = "98%";
  overlay.style.position = "absolute";
  overlay.style.top = "0";
  overlay.style.backgroundColor = "black";
  overlay.style.opacity = "0";

  name.innerHTML = country.name.common;
  name.style.fontSize = "2rem";
  name.style.color = "white";
  name.style.textAlign = "center";

  // Animations
  divContainer.addEventListener("mouseover", () => {
    overlay.style.opacity = "0.7";
    overlay.style.transition = "opacity 0.4s";
  })

  divContainer.addEventListener("mouseleave", () => {
    overlay.style.opacity = "0";
  })

  divContainer.appendChild(image);
  overlay.appendChild(name);
  divContainer.appendChild(overlay);
  countryList.appendChild(divContainer);
};

fetchCountries();

const sortByName = () => {};

const sortByPopulation = () => {};

const sortByArea = () => {};

const showSpesificContinent = () => {};
