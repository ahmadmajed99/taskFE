import axios from "axios";

const BASE_URL = "https://localhost:7036/api";
const token = localStorage.getItem("token");

export const userLogin = async (data) => {
  const headers = { "Content-Type": "application/json" };
  const url = `${BASE_URL}/user`;

  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/product`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addProducts = async (data) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const url = `${BASE_URL}/product`;
  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editProducts = async (data, id) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const url = `${BASE_URL}/product/${id}`;
  try {
    const response = await axios.put(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProducts = async (id) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const url = `${BASE_URL}/product/${id}`;
  try {
    const response = await axios.delete(url, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
