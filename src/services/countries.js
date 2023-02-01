import axios from "axios";
const baseUrl = "https://restcountries.com/v3.1/all";

const getAll = () => {
  return axios.get(baseUrl);
};

// const create = (newObject) => {
//   return axios.post(baseUrl, newObject);
// };

// const delet = (id, newObject) => {
//   return axios.delete(`${baseUrl}/${id}`, newObject);
// };
// const update = (id, newObject) => {
//   return axios.put(`${baseUrl}/${id}`, newObject);
// };
const countriesServices = { getAll };

export default countriesServices;
