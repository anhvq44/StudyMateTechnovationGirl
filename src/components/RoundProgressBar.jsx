import React from "react";

const RoundProgressBar = ({percentage, radius, color, size}) => {
    const circumference = 2 * Math.PI * radius;
    const strokeDashOffset = circumference - ((percentage/100) * circumference);

    return (
        <div className={`relative flex items-center justify-center ${size} mt-4 mb-4`}>
          <svg className="rotate-[-90deg] w-full h-full" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#e0e0e0"
              strokeWidth="8"
              opacity="0.3"
            />
            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke={color}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashOffset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-in-out"
            />
          </svg>
          {/* Percentage Text */}
          <span className={`absolute text-sm md:text-2xl font-semibold text-gray-800`}>
            {percentage}%
          </span>
        </div>
      );
}

export default RoundProgressBar