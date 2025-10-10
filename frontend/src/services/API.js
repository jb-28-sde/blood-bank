import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});
// console.log("BASEURL 👉", import.meta.env.VITE_BASEURL)

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
