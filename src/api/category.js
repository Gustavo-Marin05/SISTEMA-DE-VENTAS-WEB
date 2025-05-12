// src/api/auh.js
import axios from './axios.js';


export const getAllCategories = () => axios.get('/category');


export const createCategory = (category) =>
  axios.post("/category", category);

//editar la categoria 
export const updateCategory =(category,id)=>axios.put(`/category/${id}`,category)

//obtener una categoria por el id
export const getCategoryById = (id) => axios.get(`/category/${id}`);

//borrar la categoria 

export const deleteCategory =(id)=>axios.delete(`/category/${id}`);