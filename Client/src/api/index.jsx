import axios from "axios";

const URL = "http://localhost:5000";
export const fetchCustomer = () => axios.get(`${URL}/user`);
export const fetchProducts = () => axios.get(`${URL}/product`);
export const fetchProductDetail = (id) => axios.get(`${URL}/product/${id}`);
export const createProduct = (payload) => axios.post(`${URL}/product`, payload);
export const updateProduct = (payload) => axios.put(`${URL}/product/update/${payload._id}`,payload);
export const deleteProduct = (id) => axios.delete(`${URL}/product/${id}`);

