import axios from "../instance";

export const createInvoice = (data) => axios.post("/invoice", data);

export const getAllProducts = () => axios.get("/product");
export const getCustomerByCi = (ci) => axios.get(`/customer/ci/${ci}`);
