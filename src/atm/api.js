import axios from '../instance'

export const getAtm =()=>axios.get('/user');
export const deleteAtm =(id)=>axios.delete(`/user/${id}`)

export const getAtmById =(id)=>axios.get(`/user/${id}`)

export const createUser =(data)=>axios.post('/user',data)

export const updateUser =(data,id)=>axios.patch(`/user/${id}`,data)