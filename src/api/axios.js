import axios  from "axios";
/* http://localhost:4000/api */
 const instance = axios.create({
    baseURL: 'https://todito.onrender.com/api', // ✅ URL de tu backend
    withCredentials: true,
})

export default instance;