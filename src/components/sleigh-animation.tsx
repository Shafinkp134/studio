"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function SleighAnimation({ className }: { className?: string }) {
  const [isDecember, setIsDecember] = useState(false);

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    setIsDecember(currentMonth === 11);
  }, []);

  if (!isDecember) {
    return null;
  }
  
  return (
    <div
      className={cn(
        "fixed top-20 -left-[400px] z-50 animate-sleigh-fly pointer-events-none",
        className
      )}
    >
      <svg
        width="300"
        height="150"
        viewBox="0 0 400 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Reindeer 1 */}
        <g transform="translate(50, 80)">
          <path d="M20,0 C40,-20 60,20 80,0" fill="none" stroke="#8B4513" strokeWidth="4" />
          <path d="M50,10 L50,40 L40,60" fill="none" stroke="#8B4513" strokeWidth="4" />
          <path d="M50,10 L60, -10 M50,10 L40,-10" fill="none" stroke="#A0522D" strokeWidth="4" />
          <circle cx="80" cy="0" r="3" fill="red" />
        </g>
        {/* Sleigh */}
        <path
          d="M150,120 C140,150 280,160 300,120 L320,80 C280,70 180,70 150,100 Z"
          fill="#c0392b"
        />
        <path d="M145,120 L305,120" stroke="#f1c40f" strokeWidth="5" />
        <rect x="140" y="125" width="170" height="5" fill="#f1c40f" />
        {/* Santa */}
        <circle cx="220" cy="80" r="15" fill="#fff" />
        <path d="M220,95 L220,115" stroke="#fff" strokeWidth="10" />
        <path d="M210,70 L230,70 L220,50 Z" fill="#e74c3c" />
        <circle cx="220" cy="48" r="5" fill="#fff" />
        {/* Gifts */}
        <rect x="240" y="90" width="20" height="30" fill="#27ae60" />
        <rect x="265" y="100" width="25" height="20" fill="#2980b9" />
      </svg>
    </div>
  );
}
