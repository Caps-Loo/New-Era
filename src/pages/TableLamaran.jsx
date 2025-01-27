import React, {useState, useEffect} from "react";

const LamaranTable = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try{
                const response = await import("..data/jobData.json");
                setJobs(response.default);
            }catch(error) {
                console.error("error fetching job data:", error);
            }
        };

        fetchJobs();
    }, [])
    
    return(
        <div className="container mx-auto mt-8">
  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-md">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 text-left text-gray-700 font-semibold">No</th>
          <th className="px-4 py-2 text-left text-gray-700 font-semibold">Nama</th>
          <th className="px-4 py-2 text-left text-gray-700 font-semibold">File</th>
          <th className="px-4 py-2 text-left text-gray-700 font-semibold">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job, index) => (
          <tr key={job.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
            <td className="border px-4 py-2">{job.id}</td>
            <td className="border px-4 py-2">{job.name}</td>
            <td className="border px-4 py-2">{job.file}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    )
}

export default LamaranTable