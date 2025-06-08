import axios  from "axios";

 const instance = axios.create({
    //baseURL: 'https://todito.onrender.com/api',
    baseURL: 'http://localhost:4000/api', 
    withCredentials: true,
})

export default instance;