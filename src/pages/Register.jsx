import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import LoginImage from "../assets/Login.png";
import LogoImage from "../assets/Logo.png";

const Register = () => {
  const [name, setName] = useState(""); // State untuk nama
  const [email, setEmail] = useState(""); // State untuk email
  const [password, setPassword] = useState(""); // State untuk password
  const [error, setError] = useState(""); // State untuk pesan error
  const navigate = useNavigate(); // Untuk navigasi halaman

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registrasi Berhasil!"); // Berikan notif
      navigate("/login"); // untuk mengarahkan ke halaman login
    } catch (error) {
      setError(error.response?.data?.message || "Registrasi Gagal!");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-custom-yellow flex items-center justify-center">
        <div className="text-center">
          <img alt="Logo" className="mx-auto mt-1" height="300" src={LogoImage} width="250" />
          <img alt="Illustration" className="mx-auto mt-9" height="300" src={LoginImage} width="500" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full h-screen items-center justify-center">
        <div className="w-96 p-8 bg-white shadow-md rounded">
          <h2 className="text-3xl font-bold text-center mb-8">SIGN UP</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)} // Update state name
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state email
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state password
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-custom-yellow hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-80"
              >
                SIGN UP
              </button>
            </div>
            <p className="text-center text-gray-500 text-xs mt-4">
              have an account?{""}
              <a className="text-blue-500" href="/login">
                Sign In!
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
