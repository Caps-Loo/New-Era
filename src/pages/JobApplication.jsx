import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import jobData from '../data/jobData.json';
import ApplicationForm from '../components/ApplicationForm'; // Form Lamaran

const JobApplication = () => {
  const { id } = useParams(); // Ambil ID pekerjaan dari URL
  const job = jobData.find((job) => job.id === parseInt(id)); // Cari pekerjaan berdasarkan ID

  if (!job) {
    return <h2>Job not found!</h2>; // Jika pekerjaan tidak ditemukan
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Lamar Pekerjaan</h1>

      {/* Detail Pekerjaan (Langsung Ditampilkan Tanpa Reusable Component) */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold">{job.title}</h2>
        <p className="text-gray-600">{job.company}</p>
        <p className="text-gray-500">{job.location}</p>
        <p className="text-green-600 font-medium">{job.salary}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {job.tags.map((tag, index) => (
            <span key={index} className="bg-gray-200 text-sm px-2 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Form Lamaran */}
      <ApplicationForm jobTitle={job.title} />
    </div>
  );
};

export default JobApplication;
