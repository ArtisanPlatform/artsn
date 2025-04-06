import { eHttpResponse } from "@/enums/eHttpResponse";
import axios from "axios";

let initialized = false;

const axiosInit = () => {
  if (initialized) return;
  initialized = true;

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === eHttpResponse.Unauthorized) {
        localStorage.clear();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInit;
