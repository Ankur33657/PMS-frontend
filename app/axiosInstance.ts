import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("token="))
      ?.split("=")
      .slice(1)
      .join("=");

    if (token) {
      config.headers.Authorization = `Bearer ${decodeURIComponent(token)}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiInstance;