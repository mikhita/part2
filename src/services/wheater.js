import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();
const apiKey = process.env.API_KEY;

const getAll = (cityName) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
  );
};

const wheatherServices = { getAll };

export default wheatherServices;
