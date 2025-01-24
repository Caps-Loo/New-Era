// src/context/SearchContext.jsx
import React, { createContext, useState } from "react";

// Membuat konteks untuk pencarian
export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Untuk menyimpan teks pencarian
  const [filteredJobs, setFilteredJobs] = useState([]); // Untuk menyimpan hasil filter

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        filteredJobs,
        setFilteredJobs,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
