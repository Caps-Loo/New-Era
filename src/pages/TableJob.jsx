import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const JobTable = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await import("../data/jobData.json");
        setJobs(response.default);
      } catch (error) {
        console.error("error fetching job data:", error);
      }
    };

    fetchJobs();
  }, []);

  
  const handleJobClick = (jobId) => {
    navigate(`/job-detail/${jobId}`); 
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Daftar Pekerjaan</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-custom-yellow">
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">No</th>
              <th className="px-4 py-2 text-left text-gray-700 font-semibold">Nama Pekerjaan</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="border px-4 py-2">{job.id}</td>
              
                <td
                  className="border px-4 py-2 text-black cursor-pointer"
                  onClick={() => handleJobClick(job.id)}
                >
                  {job.title}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobTable;
