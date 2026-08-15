import axiosinstance from "../utils/axiosInstance";

export const signupapi = async (username, email, password) => {
  const { data } = await axiosinstance.post("/api/auth/signup", {
    username,
    email,
    password,
  });
  return data;
};

export const loginapi = async (email, password) => {
  const { data } = await axiosinstance.post("/api/auth/login", {
    email,
    password,
  });
  return data;
};

export const refreshapi = async () => {
  const { data } = await axiosinstance.post("/api/auth/refresh");
  return data;
};

export const meapi = async () => {
  const { data } = await axiosinstance.get("/api/auth/me");
  return data;
};

export const logoutapi = async () => {
  const { data } = await axiosinstance.post("/api/auth/logout");
  return data;
};
