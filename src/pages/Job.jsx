// src/pages/Job.jsx
import React, { useContext, useEffect } from "react";
import jobData from "../data/jobData.json";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext"; // Import SearchContext

const Job = () => {
  const { searchTerm, setSearchTerm, filteredJobs, setFilteredJobs } =
    useContext(SearchContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Filter data pekerjaan berdasarkan teks pencarian
    const filtered = jobData.filter((job) => {
      return (
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });
    setFilteredJobs(filtered); // Set hasil filter
  }, [searchTerm, setFilteredJobs]);

  return (
    <section className="relative">
      <h1 className="p-8 text-4xl">Lowongan Kerja</h1>
      <div className="flex justify-between items-center px-8">
        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <input
            className="text-black bg-gray-100 border border-gray-300 rounded-lg p-4"
            type="search"
            placeholder="Cari Loker..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update state saat user mengetik
          />
          <button className="p-4 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m3-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* JobCard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-8 mt-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
            <div
              key={index}
              className="block bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => navigate(`/job-detail/${job.id}`)}
            >
              <h2 className="text-xl font-bold">{job.title}</h2>
              <p className="text-sm text-gray-600">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
              <p className="text-sm font-medium text-green-600">{job.salary}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {job.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 text-sm px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-3">
            Tidak ada pekerjaan yang cocok dengan pencarian "{searchTerm}".
          </p>
        )}
      </div>
    </section>
  );
};

export default Job;
