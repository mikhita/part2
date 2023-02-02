import axios from "axios";
const baseUrl = "https://restcountries.com/v3.1/all";
const nameUrl = "https://restcountries.com/v3.1/name";

const getAll = () => {
  return axios.get(baseUrl);
};

// const create = (newObject) => {
//   return axios.post(baseUrl, newObject);
// };

// const delet = (id, newObject) => {
//   return axios.delete(`${baseUrl}/${id}`, newObject);
// };
const update = (id, newObject) => {
  return axios.put(`${nameUrl}/${id}`, newObject);
};
const countriesServices = { getAll, update };

export default countriesServices;
