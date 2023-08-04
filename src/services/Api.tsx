// utils/api.js (o api.ts si usas TypeScript)
const API_URL = "https://random-data-api.com/api/v2/users";

export const fetchRandomUserData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching random user data:", error);
    return null;
  }
};
