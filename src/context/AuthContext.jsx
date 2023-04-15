import React, { createContext, useContext, useState } from "react";
import authApi from "../api/authApi";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

const tokenFromLs = () => {
  return localStorage.getItem("token");
};
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(tokenFromLs);
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  console.log(token);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthCtx = () => useContext(AuthContext);
