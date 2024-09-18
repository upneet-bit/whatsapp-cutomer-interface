import React, { useState, useEffect } from 'react';
import { ChevronDown, Bell } from 'lucide-react';

const Header = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#232F3E] text-white p-2 flex justify-between items-center">
      <div className="flex items-center">
        <span className="bg-[#37475A] text-sm px-2 py-1 rounded mr-2 flex items-center">
          Status: Online <ChevronDown size={16} className="ml-1" />
        </span>
        <span className="text-sm">{formatTime(seconds)}</span>
      </div>
      <div className="flex items-center">
        <button className="bg-[#37475A] text-sm px-3 py-1 rounded mr-2 flex items-center">
          <Bell size={16} className="mr-1" /> Alerts
        </button>
        <button className="bg-[#37475A] text-sm px-3 py-1 rounded flex items-center">
          Start working <ChevronDown size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Header;