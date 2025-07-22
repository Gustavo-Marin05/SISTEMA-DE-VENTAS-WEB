import axios from '../instance.js';

export const Categories = ()=> axios.get('/category')

export const getCategoryById =(id) =>axios.get(`/category/${id}`);

export const createCategory =(data) =>axios.post('/category',data)
export const updateCategory = (data, id) => axios.put(`/category/${id}`, data);

export const deleteCategory = (id)=> axios.delete(`/category/${id}`)