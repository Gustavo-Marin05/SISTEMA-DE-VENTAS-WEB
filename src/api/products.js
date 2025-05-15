import axios from "./axios.js";

//creacion del producto 
export const createProduct = async (data) => {
  const res = await axios.post('/product', data);
  return res.data;
};

//obtener todos los productos

export const getAllProducts = ()=>axios.get('/product')

//obtener solo un producto
export const getProductById =(id)=>axios.get(`/product/${id}`)

//editar un  producto 

export const updateProduct = (id,product)=>axios.put(`/product/${id}`,product)

//borrar el producto 
export const delteProduct = (id)=> axios.delete(`/product/${id}`)
