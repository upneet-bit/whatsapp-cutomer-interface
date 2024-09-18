import React from 'react';

const InfoCard = () => (
  <div className="bg-white mt-4 p-3 rounded shadow-sm flex justify-between items-center">
    <div className="flex items-center">
      <span className="text-blue-500 mr-2">ⓘ</span>
      <span className="text-sm">Amazon Fresh - Safeist (Approve Concession)</span>
    </div>
    <button className="text-blue-500 text-sm">View Details</button>
  </div>
);

export default InfoCard;