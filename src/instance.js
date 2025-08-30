// src/instance.js
import axios from "axios";

const instance = axios.create({
  //baseURL: "http://localhost:3000",
  baseURL: "https://backendventas-ksro.onrender.com",
  withCredentials: true,
});

export default instance;
