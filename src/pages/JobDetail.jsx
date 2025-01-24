import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jobData from "../data/jobData.json";
import Navbar from "../components/Home/Navbar";

const JobDetail = () => {
  const { id } = useParams(); // Ambil ID dari parameter URL
  const job = jobData.find((job) => job.id === parseInt(id)); // Cari pekerjaan berdasarkan ID
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State login status
  const navigate = useNavigate();

  // Cek status login dari localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn ke true jika token ada
  }, []);

  // Tampilkan pesan jika pekerjaan tidak ditemukan
  if (!job) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-bold text-red-500">Job not found!</h2>
          <button
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            onClick={() => navigate("/")} // Arahkan ke halaman Home
          >
            Back to Home
          </button>
        </div>
      </>
    );
  }

  // Fungsi untuk handle tombol "Lamar Pekerjaan"
  const handleApply = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true); // Buka modal jika belum login
    } else {
      alert("Application submitted successfully!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8">
        {/* Bagian Atas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Kartu Job */}
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-gray-500">{job.type}</p>
            <p className="text-sm">{job.jobLevel}</p>
            <p className="text-gray-800">{job.education}</p>
            <p className="text-green-600 font-medium">{job.salary}</p>
            <button
              className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              onClick={handleApply} // Cek login sebelum membuka modal
            >
              Lamar Pekerjaan
            </button>
          </div>

          {/* Detail Perusahaan */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold">{job.company}</h3>
            <p className="text-sm text-gray-600">{job.companyDetails.location}</p>
            <p className="text-sm">{job.companyDetails.industry}</p>
            <p className="text-sm">{job.companyDetails.employees}</p>
            <p className="text-sm mt-4">{job.companyDetails.description}</p>
          </div>
        </div>

        {/* Bagian Bawah */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tentang Pekerjaan */}
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Tentang pekerjaan ini</h3>
            <h4 className="font-semibold">Tanggung jawab pekerjaan</h4>
            <ul className="list-decimal list-inside text-sm text-gray-700 mt-2">
              {job.responsibilities.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>

            <h4 className="font-semibold mt-4">Keahlian</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
              {job.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>

            <h4 className="font-semibold mt-4">Kualifikasi</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
              {job.qualifications.map((qualification, index) => (
                <li key={index}>{qualification}</li>
              ))}
            </ul>

            <h4 className="font-semibold mt-4">Waktu Bekerja</h4>
            <p className="text-sm text-gray-700">{job.workSchedule}</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96 relative">
            {/* Tombol Close */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setIsModalOpen(false)} // Tutup modal
            >
              ✕
            </button>

            {/* Konten Modal */}
            <h2 className="text-xl font-bold mb-4">Tertarik dengan Loker ini?</h2>
            <p className="text-gray-600 mb-6">
              Kamu harus sign in dulu agar bisa menyimpan atau melamar lowongan pekerjaan yang kamu inginkan.
            </p>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => setIsModalOpen(false)} // Tutup modal
              >
                CANCEL
              </button>
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                onClick={() => navigate("/login")} // Arahkan ke halaman login
              >
                SIGN IN
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobDetail;
