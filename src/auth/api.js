import axios from '../instance.js';

export const login =user => axios.post(`/login`,user)

export const logout = () => axios.post(`/logout`);

export const profile = () => axios.get(`/profile`);


export const create =(user) =>axios.post('/register',user)