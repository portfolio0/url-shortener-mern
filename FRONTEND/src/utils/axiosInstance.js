import axios from "axios";

let accesstoken = null;

export const setaccesstoken = (token) => {
  accesstoken = token;
};

export const getaccesstoken = () => accesstoken;

const axiosinstance = axios.create({
  baseURL: "http://localhost:3000",
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
          "http://localhost:3000/api/auth/refresh",
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
