//api.js
import axios from "axios";

const API_URL = "http://localhost:8789";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = async (username, password) => {
  const response = await api.post("/auth/signup", { username, password });
  return response.data;
};

export const login = async (username, password) => {
  const response = await api.post("/auth/login", { username, password });
  return response.data;
};

export const getAllTransactions = async () => {
  const response = await api.get("/api/transactions");
  return response.data;
};

export const getTransactionsBySchool = async (schoolId) => {
  const response = await api.get(`/api/transactions/school/${schoolId}`);
  return response.data;
};
