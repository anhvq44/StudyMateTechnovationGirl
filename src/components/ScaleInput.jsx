import React from 'react';

export function ScaleInput({ value, onChange, min = 1, max = 10 }) {
  return (
    <div className="flex items-center gap-4">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-[#FFF9F0] rounded-lg appearance-none cursor-pointer"
      />
      <span className="text-[#3A3A90] font-medium">{value}</span>
    </div>
  );
}