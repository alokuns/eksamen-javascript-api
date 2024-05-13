// API Fetch
const USERBASE_URL = "https://crudapi.co.uk/api/v1/user";
const COUNTRIES_URL = "https://restcountries.com/v3.1/all";
const API_KEY = "bmXA_-p_tY6_h_SxX93ivVoX8BGzS6RzZ8h8wqWqvS6nY6n0rg";

// Get headers
const getHeadersWithKey = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };
};

const getHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

// Fetch requests
const getCall = (url, headerParam) => {
  return fetch(url, {
    method: "GET",
    headers: headerParam,
  });
};

const postCall = (url, headerParam, bodyData) => {
  return fetch(url, {
    method: "POST",
    headers: headerParam,
    body: JSON.stringify(bodyData),
  });
};

const putCall = (url, headerParam, bodyData) => {
  return fetch(url, {
    method: "PUT",
    headers: headerParam,
    body: JSON.stringify(bodyData),
  });
};

const deleteCall = (url, headerParam) => {
  return fetch(url, {
    method: "DELETE",
    headers: headerParam,
  });
};

// Get user data
const getUserData = async () => {
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
    return user;
  } catch (error) {
    console.error("Det skjedde en feil ved henting av land", error);
  }
};

// Login functions and sessionstorage setup
const setLoginStatus = (status) => {
  sessionStorage.setItem("loggedIn", status ? "true" : "false");
};

const loggedIn = () => {
  return sessionStorage.getItem("loggedIn") === "true";
};

const logOut = () => {
  setLoginStatus(false);
  sessionStorage.removeItem("loggedInUser");
  location.reload();
};

const getLoggedInUser = () => {
  return JSON.parse(sessionStorage.getItem("loggedInUser"));
};

// Export all functions and variables
export {
  USERBASE_URL,
  COUNTRIES_URL,
  getHeadersWithKey,
  getHeaders,
  getCall,
  postCall,
  putCall,
  deleteCall,
  getUserData,
  setLoginStatus,
  loggedIn,
  logOut,
  getLoggedInUser,
};
