import React, { useEffect, useState } from "react";
import { CalendarDays, ClockFading } from "lucide-react"; 

const HomePage = ({ students }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <p className="text-xl font-semibold mb-3 text-orange-500">|| जय जय रघुवीर समर्थ ||</p>
      <h1 className="text-3xl font-bold text-blue-800 mb-4">
        Welcome, ADMIN!
      </h1>

      {/* Date */}
      <p className="text-lg mb-2 flex items-center gap-2">
        <CalendarDays className="text-blue-700" size={40}/> Date:{" "}
        <span className="font-semibold">
          {currentTime.toLocaleDateString()}
        </span>
      </p>

      {/* Live Time */}
      <p className="text-lg mb-2 flex items-center gap-2">
        <ClockFading className="text-blue-700" size={40}/> Time:{" "}
        <span className="font-semibold">
          {currentTime.toLocaleTimeString()}
        </span>
      </p>

      {/* Student Count */}
      <div className="bg-blue-100 text-blue-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold">Total Students</h2>
        <p className="text-4xl font-bold mt-2">{students.length}</p>
      </div>
    </div>
  );
};

export default HomePage;
