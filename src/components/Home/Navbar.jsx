import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Tambahkan useNavigate untuk logout
import LogoImage from "../../assets/Logo.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State untuk cek login
  const navigate = useNavigate();

  // Cek token saat Navbar dimuat
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Fungsi Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Hapus token dari localStorage
    setIsLoggedIn(false); // Update state
    alert("You have been logged out.");
    navigate("/"); // Arahkan ke halaman login
  };

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo Section */}
        <a href="/" className="flex items-center">
          <img src={LogoImage} alt="Logo" className="w-36" />
        </a>

        {/* Buttons Section */}
        <div className="flex gap-4">
          {!isLoggedIn ? (
            <>
              {/* Tombol Sign In dan Sign Up jika user belum login */}
              <Link
                to="/login"
                className="bg-[#DEE9E5] text-black font-bold px-6 py-4 rounded-md hover:bg-opacity-80 transition"
                style={{ width: "120px", textAlign: "center" }}
              >
                SIGN IN
              </Link>
              <Link
                to="/register"
                className="bg-[#2D2D2D] text-white font-semibold px-6 py-4 rounded-md hover:bg-opacity-80 transition"
                style={{ width: "120px", textAlign: "center" }}
              >
                SIGN UP
              </Link>
            </>
          ) : (
            <>
              {/* Tombol Logout jika user sudah login */}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white font-semibold px-6 py-4 rounded-md hover:bg-opacity-80 transition"
                style={{ width: "120px", textAlign: "center" }}
              >
                LOGOUT
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
