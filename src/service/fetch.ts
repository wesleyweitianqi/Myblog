import axios, { AxiosRequestConfig, AxiosError } from "axios";

export interface LoginRequest extends AxiosRequestConfig {
  data: {
    phone: string;
    verifyCode: string;
  };
}

const request = axios.create({
  baseURL: "/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (
      config.url?.indexOf("register") < 0 &&
      config.url?.indexOf("login") < 0
    ) {
      const token = localStorage.getItem("accessToken");
      config.headers = config.headers || {};
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (res) => {
    if (res?.status === 200) {
      return res?.data;
    } else {
      return {
        code: 1,
        msg: "unknown",
        data: null,
      };
    }
  },
  (err) => Promise.reject(err)
);

export default request;
