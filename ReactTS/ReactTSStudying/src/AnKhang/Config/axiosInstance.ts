import axios from "axios";
import { useAuth } from "../GlobalUtils/AuthContext";
import { showConfirmDialog } from "./functionTSX";

const useAxios = () => {
  const { token, setUser, setToken } = useAuth();
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/ankhang", // Your backend API base URL
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request Interceptor: Automatically attach token
  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor: Handle unauthorized (401)
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        setUser(null);
        setToken(null);
        return window.location.href = "/"; // Redirect to login page
      }
      if(error.response.status === 403){
        return showConfirmDialog({
          message : "Bạn không có quyền thực hiện thao tác này !!!",
        });
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
