import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default apiInstance;
