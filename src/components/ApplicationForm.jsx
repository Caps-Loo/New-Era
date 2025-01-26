import React, { useState } from "react";

const ApplicationForm = ({ jobTitle, jobId, userId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    expectedSalary: "",
    education: "",
    experience: "",
    message: "",
    resume: null,
    photo: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Aktifkan loading

    const data = new FormData();

    for (const key in formData) {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    }
    data.append("job_id", jobId);
    data.append("user_id", userId); // Kirim userId

    try {
      const response = await fetch("http://localhost:5001/api/applications", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Lamaran berhasil dikirim!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          linkedin: "",
          expectedSalary: "",
          education: "",
          experience: "",
          message: "",
          resume: null,
          photo: null,
        });
      } else {
        alert("Terjadi kesalahan saat mengirim lamaran.");
      }
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim lamaran.");
    } finally {
      setLoading(false); // Nonaktifkan loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h3 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Lamar Pekerjaan: <span className="text-gray-800">{jobTitle}</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Nomor Telepon */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
              Nomor Telepon
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Alamat */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="address">
              Alamat
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="2"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="linkedin">
              Profil LinkedIn atau Portofolio
            </label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gaji yang Diharapkan */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="expectedSalary">
              Gaji yang Diharapkan (Rp)
            </label>
            <input
              type="number"
              id="expectedSalary"
              name="expectedSalary"
              value={formData.expectedSalary}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pendidikan Terakhir */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="education">
              Pendidikan Terakhir
            </label>
            <select
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Pendidikan</option>
              <option value="SMA">SMA</option>
              <option value="D3">D3</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
            </select>
          </div>

          {/* Upload CV */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="resume">
              Upload CV/Resume
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Upload Foto */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="photo">
              Upload Pas Foto
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tombol Kirim */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Mengirim Lamaran..." : "Kirim Lamaran"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
