import axios from "axios";

let accesstoken = null;

export const setaccesstoken = (token) => {
  accesstoken = token;
};

export const getaccesstoken = () => accesstoken;

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

const axiosinstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosinstance.interceptors.request.use((config) => {
  if (accesstoken) {
    config.headers.Authorization = `Bearer ${accesstoken}`;
  }
  return config;
});

let isrefreshing = false;
let refreshsubscribers = [];

const subscribetokenrefresh = (cb) => {
  refreshsubscribers.push(cb);
};

const onrefreshed = (token) => {
  refreshsubscribers.forEach((cb) => cb(token));
  refreshsubscribers = [];
};

axiosinstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalrequest = error.config;
    if (error.response?.status === 401 && !originalrequest._retry) {
      if (isrefreshing) {
        return new Promise((resolve) => {
          subscribetokenrefresh((token) => {
            originalrequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosinstance(originalrequest));
          });
        });
      }

      originalrequest._retry = true;
      isrefreshing = true;

      try {
        const { data } = await axios.post(
          `${API_BASE_URL}/api/auth/refresh`,
          {},
          { withCredentials: true },
        );
        setaccesstoken(data.accesstoken);
        onrefreshed(data.accesstoken);
        isrefreshing = false;
        originalrequest.headers.Authorization = `Bearer ${data.accesstoken}`;
        return axiosinstance(originalrequest);
      } catch (err) {
        isrefreshing = false;
        setaccesstoken(null);
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosinstance;
