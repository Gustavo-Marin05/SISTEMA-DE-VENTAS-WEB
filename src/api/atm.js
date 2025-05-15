import axios from './axios.js'

//obtener todos los atm
export const getAllAtm = ()=>axios.get('/user')
//obtener solo un atm por id
export const getAtmById= (id)=>axios.get(`/user/${id}`)

//crear el atm
export const createAtm = (atm)=>axios.post(`/user`,atm)


//borrar el atm
export const delteAtm =(id)=>axios.delete(`/user/${id}`)