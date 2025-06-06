import axios from "./axios.js";

export const getCustomerByCi = async (ci) => {
  return await axios.get(`/customer/ci/${ci}`);
};
