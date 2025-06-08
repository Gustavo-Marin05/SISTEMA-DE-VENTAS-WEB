import axios  from "axios";

 const instance = axios.create({
    baseURL: 'https://todito.onrender.com/api', // ✅ URL de tu backend
    withCredentials: true,
})

export default instance;