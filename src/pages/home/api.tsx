import axios from "axios";

const createApi = () => {
  return axios.create({
    baseURL: "https://78d8cc4c8ae1e436.mokky.dev/",
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("item")}`,
    },
  });
};

export const api = createApi();
