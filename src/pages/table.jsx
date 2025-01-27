import React from "react";

const JobTable = () => {
  const jobs = [
    { id: 1, name: "Software Engineer" },
    { id: 2, name: "Data Analyst" },
    { id: 3, name: "Data Scientist" },
    { id: 4, name: "Product Manager" },
    { id: 5, name: "UI/UX Designer" },
  ];

  return (
    <div className="container mx-auto mt-8 max-w-4xl"> {/* Tambahkan max-w-4xl untuk membatasi lebar */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full table-auto bg-white border border-gray-200" style={{ tableLayout: "auto" }}>
          <thead className="bg-custom-yellow">
            <tr>
              <th className="px-2 py-2 text-left text-sm font-medium text-gray-600">No</th>
              <th className="px-2 py-2 text-left text-sm font-medium text-gray-600">Nama Pekerjaan</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job.id} className="border-b hover:bg-gray-50">
                <td className="px-2 py-2 text-sm text-gray-700">{index + 1}</td>
                <td className="px-2 py-2 text-sm text-gray-700 truncate">{job.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobTable;
