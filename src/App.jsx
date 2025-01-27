import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobDetail from "./pages/JobDetail";
import Footer from "./components/Home/Footer";
import { SearchProvider } from "./context/SearchContext";
import { AuthProvider } from "./AuthContext"; // Path diperbarui sesuai lokasi di folder src
import JobApplication from "./pages/JobApplication";
import JobTable from "./pages/TableJob";
import LamaranTable from "./pages/TableLamaran";

const App = () => {
  return (
    // Bungkus aplikasi dengan AuthProvider dan SearchProvider
    <AuthProvider>
      <SearchProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" elem
            ent={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/job-detail/:id" element={<JobDetail />} />
            <Route path="/apply/:id" element={<JobApplication />} />
          </Routes>
          <JobTable/>
          {/* <LamaranTable/> */}
          <Footer />
        </Router>
     
      </SearchProvider>
      
    </AuthProvider>
  );
};

export default App;
