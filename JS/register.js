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
    const data = res;
    console.log(data);
  } catch (error) {
    console.error("Noe gikk feil ved henting av brukerdata");
  }
};
