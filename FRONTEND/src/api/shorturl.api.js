import axiosinstance from "../utils/axiosInstance";

export const createshorturl = async (url, customalias) => {
  const { data } = await axiosinstance.post("/api/create", {
    url,
    customalias,
  });
  return data;
};

export const getmyurls = async () => {
  const { data } = await axiosinstance.get("/api/create/myurls");
  return data;
};
