import React, { createContext, useContext, useEffect, useState } from "react";
import { setaccesstoken } from "../utils/axiosInstance";
import { refreshapi, meapi, logoutapi } from "../api/auth.api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const trypersistentlogin = async () => {
      try {
        const data = await refreshapi();
        setaccesstoken(data.accesstoken);
        const meres = await meapi();
        setuser(meres.user);
      } catch (err) {
        setuser(null);
        setaccesstoken(null);
      } finally {
        setloading(false);
      }
    };
    trypersistentlogin();
  }, []);

  const login = (accesstoken, userdata) => {
    setaccesstoken(accesstoken);
    setuser(userdata);
  };

  const logout = async () => {
    try {
      await logoutapi();
    } catch (err) {
      // ignore
    }
    setaccesstoken(null);
    setuser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
