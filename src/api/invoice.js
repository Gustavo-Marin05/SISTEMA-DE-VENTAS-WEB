import axios from "./axios.js";

//creacion de una factura 
export const createInvoice = (invoiceData) =>axios.post('/invoice',invoiceData)

export const getallinvoice =()=>axios.get('/invoice');