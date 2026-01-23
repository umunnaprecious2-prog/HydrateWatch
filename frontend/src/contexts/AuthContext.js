"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "@/src/lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      console.log("Login attempt for:", email);
      const params = new URLSearchParams();
      params.append("username", email);
      params.append("password", password);

      console.log("Sending login request to:", api.defaults.baseURL + "/auth/login");
      const response = await api.post("/auth/login", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log("Login response:", response.data);
      const { access_token, token_type, user: userData } = response.data;

      setToken(access_token);
      setUser(userData);

      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(userData));

      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      return { success: true };
    } catch (error) {
      console.error("Login error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });
      return {
        success: false,
        error: error.response?.data?.detail || error.message || "Invalid email or password",
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      console.log("Registration attempt for:", email);
      console.log("Sending registration request to:", api.defaults.baseURL + "/auth/register");

      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log("Registration response:", response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Registration error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });
      return {
        success: false,
        error: error.response?.data?.detail || error.message || "Registration failed",
      };
    }
  };

  const googleAuth = async (credential) => {
    try {
      const response = await api.post("/auth/google", {
        credential,
      });

      const { access_token, token_type, user: userData } = response.data;

      setToken(access_token);
      setUser(userData);

      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(userData));

      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      return { success: true };
    } catch (error) {
      console.error("Google auth error:", error);
      return {
        success: false,
        error: error.response?.data?.detail || "Google authentication failed",
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    register,
    googleAuth,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
