import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();


  const loginAction = async (data) => {
    try {
      const response = await fetch("http://localhost:5001/api/v1/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();
      setUser(result.user);
      setToken(result.token);
      localStorage.setItem("token", result.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loginAction, logOut, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
