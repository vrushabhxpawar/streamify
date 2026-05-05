import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "https://streamify-oj1f.onrender.com/api";

export const axiosInstance = axios.create({
  baseURL : BASE_URL,
  withCredentials : true
})