import axios from "axios";
const baseUrl = "/api/persons";

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const delet = (id, newObject) => {
  return axios.delete(`${baseUrl}/${id}`, newObject);
};
const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};
const personsServices = { getAll, create, delet, update };

export default personsServices;
