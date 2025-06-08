import axios  from "axios";

 const instance = axios.create({
    //baseURL: 'https://todito.onrender.com/api',
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api', 
    withCredentials: true,
})

export default instance;