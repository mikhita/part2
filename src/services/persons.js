import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const delet = (id, newObject) => {
  return axios.delete(`${baseUrl}/${id}`, newObject);
};
const personsServices = { getAll, create, delet };

export default personsServices;
