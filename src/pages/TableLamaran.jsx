import React, { useState, useEffect } from "react";

const LamaranTable = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await import("../data/jobData.json");
                setJobs(response.default);
            } catch (error) {
                console.error("Error fetching job data:", error);
            }
        };

        fetchJobs();
    }, []);

    const handleStatusChange = (jobId, status) => {
        // Handle logic for status change here
        console.log(`Lamaran ${jobId} ${status}`);
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-center text-gray-700 font-semibold">No</th>
                            <th className="px-4 py-2 text-center text-gray-700 font-semibold">Nama</th>
                            <th className="px-4 py-2 text-center text-gray-700 font-semibold">File</th>
                            <th className="px-4 py-2 text-center text-gray-700 font-semibold">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job, index) => (
                            <tr key={job.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                <td className="border px-4 py-2">{job.id}</td>
                                <td className="border px-4 py-2">{job.name}</td>
                                <td className="border px-4 py-2">{job.file}</td>
                                <td className="border px-4 py-2 flex justify-center gap-2">
                                    {/* Button Diterima */}
                                    <button 
                                        onClick={() => handleStatusChange(job.id, "Diterima")}
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        Diterima
                                    </button>
                                    {/* Button Ditolak */}
                                    <button 
                                        onClick={() => handleStatusChange(job.id, "Ditolak")}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Ditolak
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LamaranTable;
