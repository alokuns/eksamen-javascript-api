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
    alphabetSorting(allCountries).forEach((country) => {
      showCountries(country);
    });
    // Set sort by alphabet button
    setupSortButton(
      "sortByAlphabetBtn",
      "alphabetSortIcon",
      "orderAlphabeticalAtoZIcon.png",
      "orderAlphabeticalZtoAIcon.png",
      alphabetSorting
    );
    // Set sort by population button
    setupSortButton(
      "sortByPopulationBtn",
      "populationSortIcon",
      "sortingAscendingIcon.png",
      "sortingDescendingIcon.png",
      populationSorting
    );
    // Set sort by area button
    setupSortButton(
      "sortByAreaBtn",
      "areaSortIcon",
      "sortingAscendingIcon.png",
      "sortingDescendingIcon.png",
      areaSorting
    );
    getContinents();
  } catch (error) {
    console.error("Det oppsto et problem ved opphenting av land", error);
  }
};

// Show content based on if user is logged in or not
const welcomeContainer = document.getElementById("welcomeContainer");
const loggedInContentContainer = document.getElementById(
  "loggedInContentContainer"
);
const showContent = () => {
  if (loggedIn()) {
    loggedInContentContainer.style.display = "block";
    fetchCountries();
  } else {
    welcomeContainer.style.display = "flex";
  }
};

showContent();

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

  divContainer.addEventListener("click", () => {
    showInfoAboutCountry(country);
  });

  divContainer.appendChild(image);
  divContainer.appendChild(landCode);
  divContainer.appendChild(name);
  countryList.appendChild(divContainer);
};

// Get sorted countries
const getSortedCountries = () => {
  let sortedCountries;
  if (changedCountries === undefined) {
    sortedCountries = allCountries;
  } else {
    sortedCountries = changedCountries;
  }
  return sortedCountries;
};

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

// Sort template
const sortByTemplate = (
  iconId,
  ascendingIcon,
  descendingIcon,
  sortFunction
) => {
  const sortIcon = document.getElementById(iconId);
  countryList.innerHTML = "";
  const sorted = getSortedCountries();
  if (sortIcon.src.includes(ascendingIcon)) {
    sortIcon.src = "./assets/" + descendingIcon;
    sortFunction(sorted)
      .reverse()
      .forEach((country) => {
        showCountries(country);
      });
  } else {
    sortIcon.src = "./assets/" + ascendingIcon;
    sortFunction(sorted).forEach((country) => {
      showCountries(country);
    });
  }
};

// Event listener setup
const setupSortButton = (
  buttonId,
  iconId,
  ascendingIcon,
  descendingIcon,
  sortFunction
) => {
  document
    .querySelector(`#${buttonId}`)
    .addEventListener("click", () =>
      sortByTemplate(iconId, ascendingIcon, descendingIcon, sortFunction)
    );
};

// Sort in alphabetical order
const alphabetSorting = (countries) => {
  return countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
};

// Sort in order of population
const populationSorting = (countries) => {
  return countries.sort((a, b) => a.population - b.population);
};

// Sort in order of landarea
const areaSorting = (countries) => {
  return countries.sort((a, b) => a.area - b.area);
};

// Get all continents
const getContinents = () => {
  const allContinents = allCountries
    .map((country) => country.continents)
    .flat();
  let uniqueContinents = allContinents.filter(
    (item, index) => allContinents.indexOf(item) === index
  );
  uniqueContinents.sort();
  uniqueContinents.unshift("All continents");
  uniqueContinents.forEach((continent) => {
    addToContinentList(continent);
  });
};

// Add each continent to a select list
const addToContinentList = (continent) => {
  const listpoint = document.createElement("option");
  listpoint.value = continent;
  listpoint.innerHTML = continent;
  continentList.appendChild(listpoint);
};

// Get the value of choosen continent and filter the list
const continentList = document.querySelector("#continentList");
continentList.addEventListener("change", () => {
  const selectedValue =
    continentList.options[continentList.selectedIndex].value;
  countryList.innerHTML = "";
  if (selectedValue === "All continents") {
    changedCountries = allCountries;
  } else {
    changedCountries = filteredContinents(selectedValue);
  }
  changedCountries.forEach((country) => {
    showCountries(country);
  });
});

// Filter countries by choosen continent
const filteredContinents = (value) => {
  let choosenContinent = allCountries.filter((country) => {
    return country.continents.includes(value);
  });
  return choosenContinent;
};

// Show specific info about country
const countryInfoContainer = document.querySelector("#countryInfoContainer");
const showInfoAboutCountry = (country) => {
  const divLeftContainer = document.createElement("div");
  const divMiddleContainer = document.createElement("div");
  const divRightContainer = document.createElement("div");
  const backBtn = document.createElement("button");
  const nameCommon = document.createElement("h1");
  const nameOfficial = document.createElement("h2");
  const continent = document.createElement("p");
  const capital = document.createElement("p");
  const area = document.createElement("p");
  const population = document.createElement("p");
  const languages = document.createElement("p");
  const independent = document.createElement("p");
  const isoCode = document.createElement("p");
  const startWeek = document.createElement("p");
  const currencies = document.createElement("p");
  const timezones = document.createElement("p");
  const cars = document.createElement("p");
  const addToFavouritesBtn = document.createElement("button");
  const flagImg = document.createElement("img");
  const coatOfArmsImg = document.createElement("img");

  divLeftContainer.style.display = "flex";
  divLeftContainer.style.flexFlow = "column nowrap";
  divLeftContainer.style.justifyContent = "strech";
  divLeftContainer.style.gap = "15px";
  divLeftContainer.style.fontSize = "1.5rem";
  divLeftContainer.style.width = "350px";

  divMiddleContainer.style.display = "flex";
  divMiddleContainer.style.flexFlow = "column nowrap";
  divMiddleContainer.style.justifyContent = "center";
  divMiddleContainer.style.gap = "15px";
  divMiddleContainer.style.fontSize = "1.5rem";
  divMiddleContainer.style.width = "350px";

  divRightContainer.style.display = "flex";
  divRightContainer.style.flexFlow = "column nowrap";
  divRightContainer.style.justifyContent = "start";
  divRightContainer.style.alignItems = "center";
  divRightContainer.style.gap = "10px";

  const backBtnIcon = document.createElement("img");
  backBtnIcon.src = "./assets/leftArrowIcon.png";
  backBtnIcon.alt = "Left arrow";
  backBtnIcon.style.height = "20px";
  backBtnIcon.style.marginRight = "5px";

  backBtn.style.fontSize = "1.4rem";
  backBtn.style.fontFamily = "Calibri, sans-serif";
  backBtn.style.display = "flex";
  backBtn.style.alignItems = "center";
  backBtn.style.background = "none";
  backBtn.style.border = "none";
  backBtn.style.cursor = "pointer";
  backBtn.addEventListener("click", () => {
    countryInfoContainer.innerHTML = "";
    countryInfoContainer.style.display = "none";
    loggedInContentContainer.style.display = "block";
  });
  backBtn.appendChild(backBtnIcon);
  backBtn.appendChild(document.createTextNode("Tilbake"));

  nameCommon.innerHTML = country.name.common;
  nameCommon.style.fontWeight = "bold";
  nameCommon.style.marginTop = "30px";
  nameCommon.style.marginBottom = "0";

  nameOfficial.innerHTML = `(${country.name.official})`;
  nameOfficial.style.fontSize = "2rem";
  nameOfficial.style.fontWeight = "500";
  nameOfficial.style.marginBottom = "20px";

  continent.innerHTML = `Continent: <b>${country.continents}</b>`;
  capital.innerHTML = `Capital: <b>${country.capital}</b>`;
  area.innerHTML = `Area: <b>${country.area} km<sup>2</sup></b>`;
  population.innerHTML = `Population: <b>${country.population}</b>`;
  languages.innerHTML = "Languages: ";
  if (country.languages === undefined) {
    languages.innerHTML += "<b>No spesific language</b>";
  } else {
    const allLanguages = Object.values(country.languages).join(", ");
    languages.innerHTML += `<b>${allLanguages}</b>`;
  }
  if (country.independent) {
    independent.innerHTML = "Independent country";
  } else {
    independent.innerHTML = "Dependent country";
  }
  isoCode.innerHTML = `ISO Code: <b>${country.cca2}</b>`;
  startWeek.innerHTML = `Start of week: <b>${country.startOfWeek}</b>`;
  currencies.innerHTML = "Currencies: ";
  if (country.currencies === undefined) {
    currencies.innerHTML += "<b>no found</b>";
  } else {
    const allCurrencies = Object.values(country.currencies);
    let currencyArray = [];
    allCurrencies.forEach((currency) => {
      currencyArray.push(`${currency.name} (${currency.symbol})`);
    });
    const currencyString = currencyArray.join(", ");
    currencies.innerHTML += `<b>${currencyString}</b>`;
  }
  timezones.innerHTML = `Timezones: <b>${country.timezones.join(", ")}</b>`;
  cars.innerHTML = `Cars: They have <b>${country.car.signs}</b> on their signs and drive on the <b>${country.car.side}</b> side of the road`;

  const addBtnIcon = document.createElement("img");
  addBtnIcon.src = "./assets/plusIcon.png";
  addBtnIcon.alt = "Plus icon to add to list";
  addBtnIcon.style.height = "30px";
  addBtnIcon.style.marginRight = "10px";

  addToFavouritesBtn.style.fontFamily = "Calibri, sans-serif";
  addToFavouritesBtn.style.fontSize = "1.3rem";
  addToFavouritesBtn.style.fontWeight = "bold";
  addToFavouritesBtn.style.display = "flex";
  addToFavouritesBtn.style.alignItems = "center";
  addToFavouritesBtn.style.backgroundColor = "#d9b70d";
  addToFavouritesBtn.style.borderRadius = "15px";
  addToFavouritesBtn.style.padding = "15px";
  addToFavouritesBtn.style.margin = "40px auto 0 auto";
  addToFavouritesBtn.style.cursor = "pointer";
  addToFavouritesBtn.appendChild(addBtnIcon);
  addToFavouritesBtn.appendChild(document.createTextNode("Add to favourites"));

  flagImg.src = country.flags.png;
  flagImg.alt = country.flags.alt;
  flagImg.style.width = "300px";
  flagImg.style.height = "200px";
  flagImg.style.objectFit = "contain";
  if (country.coatOfArms.png === undefined) {
    coatOfArmsImg.src = "./assets/noImgIcon.png";
  } else {
    coatOfArmsImg.src = country.coatOfArms.png;
  }
  coatOfArmsImg.alt = `${country.name.common}'s coat of arms`;
  coatOfArmsImg.style.width = "200px";

  divLeftContainer.appendChild(backBtn);
  divLeftContainer.appendChild(nameCommon);
  divLeftContainer.appendChild(nameOfficial);
  divLeftContainer.appendChild(continent);
  divLeftContainer.appendChild(capital);
  divLeftContainer.appendChild(area);
  divLeftContainer.appendChild(population);
  divLeftContainer.appendChild(languages);

  divMiddleContainer.appendChild(independent);
  divMiddleContainer.appendChild(isoCode);
  divMiddleContainer.appendChild(startWeek);
  divMiddleContainer.appendChild(currencies);
  divMiddleContainer.appendChild(timezones);
  divMiddleContainer.appendChild(cars);
  divMiddleContainer.appendChild(addToFavouritesBtn);

  divRightContainer.appendChild(flagImg);
  divRightContainer.appendChild(coatOfArmsImg);

  loggedInContentContainer.style.display = "none";
  countryInfoContainer.style.display = "flex";

  countryInfoContainer.appendChild(divLeftContainer);
  countryInfoContainer.appendChild(divMiddleContainer);
  countryInfoContainer.appendChild(divRightContainer);
};
