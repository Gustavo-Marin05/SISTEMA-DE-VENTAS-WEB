// src/api/auh.js
import axios from './axios.js';



export const register = async (user) => {
  return await axios.post(`/register`, user);
};


export const login =user => axios.post(`/login`,user)


export const logoutre = () => axios.post(`/logout`);

export const verifyTokenRe =()=>axios.get(`/verify`)

