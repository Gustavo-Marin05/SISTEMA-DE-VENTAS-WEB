import axios from '../instance';

export const getCustomers =()=>axios.get('/customer');

export const getInvoicesCustomer=(id)=>axios.get(`/customer/invoices/${id}`)

// api.js
export const printInvoiceCustomer = (id) =>
  axios.get(`/invoice/${id}/pdf`, {
    responseType: "blob",
    withCredentials: true, // si usas JWT en cookies
  });
