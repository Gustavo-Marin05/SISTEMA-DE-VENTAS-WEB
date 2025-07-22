import axios from "../instance";

export const getproducts = ()=>axios.get('/product');

export const createProduct =(data)=> axios.post('/product',data)

export const getProductById=(id) =>axios.get(`/product/${id}`)

export const updateProduct =(data,id)=>axios.patch(`/product/${id}`,data)

export const delteProduct=(id)=>axios.delete(`/product/${id}`)