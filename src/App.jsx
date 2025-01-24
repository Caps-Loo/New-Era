import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobDetail from "./pages/JobDetail";
import Footer from "./components/Home/Footer";
import { SearchProvider } from "./context/SearchContext"; 

const App = () => {
  return (
    // Bungkus seluruh aplikasi dengan SearchProvider
    <SearchProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/job-detail/:id" element={<JobDetail />} />
        </Routes>
        <Footer />
      </Router>
    </SearchProvider>
  );
};

export default App;
