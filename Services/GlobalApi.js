import axios from "axios";
const BASE_URL = "http://10.20.7.96:1337";

const API_KEY =
  "946e252792823538401ab000e45b3e407d6c033f0a35cdc834bcd46d895f41248f3035cb0308d809f5b601f2df3537609233781d3714b9e4655fa25332899c7e9106f85baf552c831552d48b7010f417ee06b51842d52dcfe40e7ea3931ec46e4937991df3995e9749627d01913fbf9dfea8537988ae000e87b24ec752290b2f";

const AxioInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer " + API_KEY,
  },
});

const AxiosInstance2 = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const registerUser = async (userData) => {
  try {
    console.log(userData);
    const response = await AxiosInstance2.post(
      "/api/auth/local/register",
      userData
    );
    return response.data;
  } catch (error) {
    // Handle errors
    if (error.response) {
      // Strapi returns errors in `error.response.data`
      console.error("Error:", error.response.data);
      throw error.response.data; // Rethrow to handle elsewhere
    } else {
      console.error("Network or unknown error:", error);
      throw new Error("Network or unknown error occurred");
    }
  }
};

const loginUser = async (loginData) => {
  try {
    console.log(loginData);
    const response = await AxiosInstance2.post("/api/auth/local", loginData);
    return response.data;
  } catch (error) {
    // Handle errors
    if (error.response) {
      // Strapi returns errors in `error.response.data`
      console.error("Error:", error.response.data);
      throw error.response.data; // Rethrow to handle elsewhere
    } else {
      console.error("Network or unknown error:", error);
      throw new Error("Network or unknown error occurred");
    }
  }
};

const getSlider = () => AxioInstance.get("/api/sliders?populate=*");
const getCategories = () => AxioInstance.get("/api/categories?populate=*");
const getHeartRadio = () => AxioInstance.get("/api/heart-radios?populate=*");

export default {
  registerUser,
  loginUser,
  getSlider,
  getCategories,
  getHeartRadio,
};
