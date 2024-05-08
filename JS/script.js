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
  const loggedInContentContainer = document.getElementById(
    "loggedInContentContainer"
  );
  if (loggedIn()) {
    loggedInContentContainer.style.display = "block";
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
    sortInAlphabeticalOrder(allCountries).forEach((country) => {
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
  const landCode = document.createElement("p");
  const name = document.createElement("p");

  divContainer.style.display = "flex";
  divContainer.style.flexFlow = "column nowrap";
  divContainer.style.justifyContent = "center";
  divContainer.style.alignItems = "center";
  divContainer.style.width = "250px";
  divContainer.style.padding = "20px";
  divContainer.style.gap = "10px";
  divContainer.style.backgroundColor = "#99B4BF";
  divContainer.style.border = "1px solid black";
  divContainer.style.borderRadius = "5px";
  divContainer.style.cursor = "pointer";

  image.src = country.flags.png;
  image.alt = "The flag of" + "";
  image.style.height = "50px";
  image.style.objectFit = "contain";

  landCode.innerHTML = country.cca2;
  landCode.style.fontSize = "1.5rem";

  name.innerHTML = country.name.common;
  name.style.fontSize = "1.4rem";
  name.style.fontWeight = "bold";
  name.style.color = "black";
  name.style.textAlign = "center";

  // Animations
  divContainer.addEventListener("mouseover", () => {
    divContainer.style.backgroundColor = "#253C59";
    divContainer.style.color = "white";
    name.style.color = "white";
    divContainer.style.transition = "all 0.4s";
    name.style.transition = "all 0.4s";
  });

  divContainer.addEventListener("mouseleave", () => {
    divContainer.style.backgroundColor = "#99B4BF";
    divContainer.style.color = "black";
    name.style.color = "black";
  });

  divContainer.appendChild(image);
  divContainer.appendChild(landCode);
  divContainer.appendChild(name);
  countryList.appendChild(divContainer);
};

fetchCountries();

// Find searched countries
let changedCountries;
const findCountryInput = document.querySelector("#findCountryInput");

const findCountry = () => {
  const inputValue = findCountryInput.value.toLowerCase();
  changedCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(inputValue)
  );

  if (changedCountries.length > 0) {
    countryList.innerHTML = "";
    changedCountries.forEach((country) => {
      showCountries(country);
    });
  }
};

findCountryInput.addEventListener("input", findCountry);

// Sort in alphabetical order
const sortInAlphabeticalOrder = (countries) => {
  return countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
};

// Sort by alphabet button
const sortByAlphabet = () => {
  const alphabetSortIcon = document.getElementById("alphabetSortIcon");
  countryList.innerHTML = "";
  let sortedCountries;
  if (changedCountries === undefined) {
    sortedCountries = allCountries;
  } else {
    sortedCountries = changedCountries;
  }
  if (alphabetSortIcon.src.includes("orderAlphabeticalAtoZIcon.png")) {
    alphabetSortIcon.src = "./assets/orderAlphabeticalZtoAIcon.png";
    sortInAlphabeticalOrder(sortedCountries)
      .reverse()
      .forEach((country) => {
        showCountries(country);
      });
  } else {
    alphabetSortIcon.src = "./assets/orderAlphabeticalAtoZIcon.png";
    sortInAlphabeticalOrder(sortedCountries).forEach((country) => {
      showCountries(country);
    });
  }
};

const sortByAlphabetBtn = document.querySelector("#sortByAlphabetBtn");
sortByAlphabetBtn.addEventListener("click", sortByAlphabet);

// Sort in order of population
const populationSorting = (countries) => {
  return countries.sort((a, b) => a.population - b.population);
};

// Sort by population button
const sortByPopulation = () => {
  const populationSortIcon = document.getElementById("populationSortIcon");
  countryList.innerHTML = "";
  let sortedCountries;
  if (changedCountries === undefined) {
    sortedCountries = allCountries;
  } else {
    sortedCountries = changedCountries;
  }
  if (populationSortIcon.src.includes("sortingAscendingIcon.png")) {
    populationSortIcon.src = "./assets/sortingDescendingIcon.png";
    populationSorting(sortedCountries)
      .reverse()
      .forEach((country) => {
        showCountries(country);
      });
  } else {
    populationSortIcon.src = "./assets/sortingAscendingIcon.png";
    populationSorting(sortedCountries).forEach((country) => {
      showCountries(country);
    });
  }
};

const sortByPopulationBtn = document.querySelector("#sortByPopulationBtn");
sortByPopulationBtn.addEventListener("click", sortByPopulation);

const sortByArea = () => {};

const showSpesificContinent = () => {};
