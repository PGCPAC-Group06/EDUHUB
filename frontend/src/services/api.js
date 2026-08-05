import axios from "axios";

const API_BASE_URL = "http://localhost:8080";
<<<<<<< HEAD
const BUSINESS_BASE_URL = "http://localhost:8081";
const TRANSACTION_BASE_URL = "http://localhost:8082";
=======
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
<<<<<<< HEAD
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
=======
});

// Interceptor to attach JWT token to every outgoing request
api.interceptors.request.use(
  (config) => {
    let token = null;

    const savedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        token = parsed.token;
      } catch (e) {
        console.error("Error parsing saved user token", e);
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a

export default api;
