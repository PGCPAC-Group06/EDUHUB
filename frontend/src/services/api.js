import axios from "axios";

export const AUTH_BASE_URL = import.meta.env.VITE_AUTH_API_URL || "http://localhost:8080/api";
export const INSTITUTE_BASE_URL = import.meta.env.VITE_INSTITUTE_API_URL || "http://localhost:8081/api";
export const COURSE_BASE_URL = import.meta.env.VITE_COURSE_API_URL || "http://localhost:8082/api";

const createServiceApi = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("eduhub_token") || localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export const authApi = createServiceApi(AUTH_BASE_URL);
export const instituteApi = createServiceApi(INSTITUTE_BASE_URL);
export const courseApi = createServiceApi(COURSE_BASE_URL);

// Default fallback export for legacy imports
export default authApi;
