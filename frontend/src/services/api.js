import axios from "axios";

const API_BASE_URL = "http://localhost:8080";
const BUSINESS_BASE_URL = "http://localhost:8081";
const TRANSACTION_BASE_URL = "http://localhost:8082";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const businessApi = axios.create({
  baseURL: BUSINESS_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const transactionApi = axios.create({
  baseURL: TRANSACTION_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const attachInterceptors = (instance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Cookie expired or invalid
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
};

attachInterceptors(api);
attachInterceptors(businessApi);
attachInterceptors(transactionApi);

export default api;
