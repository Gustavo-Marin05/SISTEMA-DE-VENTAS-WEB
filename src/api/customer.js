import axios from "./axios.js";

export const getCustomerByCi = async (ci) => {
  return await axios.get(`/customer/ci/${ci}`);
};


export const getAllCustomer = ()=>axios.get('/customer');

export const getcustomerbyId =(id)=>axios.get(`/customer/${id}`)