import React from 'react';

const JobCard = ({ company, title, location, type, salary, tags }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h3 className="text-lg font-bold">{company}</h3>
      <h4 className="text-md text-gray-700">{title}</h4>
      <p className="text-sm text-gray-500">{location}</p>
      <div className="text-sm text-gray-700 mt-2">
        <p><strong>Type:</strong> {type}</p>
        <p><strong>Salary:</strong> {salary}</p>
      </div>
      <div className="flex gap-2 mt-2 flex-wrap">
        {tags.map((tag, index) => (         
          <span
            key={index}
            className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default JobCard;
