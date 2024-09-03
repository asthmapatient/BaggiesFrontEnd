import axios from "axios";

//baseurl and axios instance
export const baseUrl = "http://localhost:4000/"; //conditionally; define dev localhost: 4949; prod www.herald.edu.np/

export const Axios = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
});

Axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
