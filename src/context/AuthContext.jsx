import React, { createContext, useContext, useEffect, useState } from "react";
import authApi from "../api/authApi";
import jwtDecode from "jwt-decode";
import userApi from "../api/userApi";
import { toast } from "react-toastify";

const AuthContext = createContext();

const tokenFromLs = () => {
  return localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : "";
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      if (tokenFromLs()) {
        try {
          const user = await userApi.verifyUser();

          if (user) {
            setUser(user);
          } else {
            toast.error("Cannot verify");
          }
        } catch (err) {
          toast.error("someting wrong");
        }
      }
    };
    getUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthCtx = () => useContext(AuthContext);
