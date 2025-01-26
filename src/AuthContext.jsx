import React, { createContext, useState, useEffect } from "react";

// Membuat Context
export const AuthContext = createContext();

// Provider untuk AuthContext
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Status login
  const [user, setUser] = useState(null); // Informasi user

  // Cek token di localStorage saat pertama kali aplikasi dimuat
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = JSON.parse(localStorage.getItem("user")); // Ambil user info
    if (token) {
      setIsLoggedIn(true);
      setUser(userInfo); // Set user jika ada
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
