"use client";

import { Snowflake } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center gap-4">
      <div className="relative w-48 h-48">
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-pulse"
        >
          {/* Night Sky */}
          <rect width="100" height="100" fill="#001d3d" />
          
          {/* Stars */}
          <circle cx="20" cy="15" r="0.5" fill="white" />
          <circle cx="35" cy="10" r="0.5" fill="white" />
          <circle cx="50" cy="20" r="0.5" fill="white" />
          <circle cx="65" cy="5" r="0.5" fill="white" />
          <circle cx="80" cy="12" r="0.5" fill="white" />
          <circle cx="90" cy="25" r="0.5" fill="white" />
          <circle cx="10" cy="30" r="0.5" fill="white" />

          {/* Moon */}
          <circle cx="85" cy="20" r="15" fill="#fefae0" />

          {/* Clouds */}
          <path d="M-5 100 Q 20 70, 50 80 T 105 100 Z" fill="#6c757d" />

          {/* Sleigh */}
          <path d="M20 75 C 15 85, 60 88, 65 75 L 70 65 C 60 62, 35 62, 25 70 Z" fill="#d90429" />
          <path d="M18 75 L 67 75" stroke="#ffd500" strokeWidth="1" />
          <rect x="17" y="77" width="51" height="1.5" fill="#ffd500" />

          {/* Santa */}
          <circle cx="45" cy="60" r="4" fill="#fff" />
          <path d="M45 64 L 45 73" stroke="#fff" strokeWidth="2.5" />
          <path d="M42 58 L 48 58 L 45 52 Z" fill="#ef233c" />
          <circle cx="45" cy="51" r="1.2" fill="#fff" />
          
          {/* Snowman */}
          <circle cx="32" cy="62" r="4" fill="#fff" />
          <circle cx="32" cy="61" r="0.5" fill="black" />
          <circle cx="34" cy="61" r="0.5" fill="black" />
          <path d="M31 63 Q 33 64, 35 63" fill="none" stroke="black" strokeWidth="0.3" />

          {/* Reindeer */}
          <g transform="translate(70, 60)">
             <path d="M5,0 C10,-5 15,5 20,0" fill="none" stroke="#a67c52" strokeWidth="1" />
             <path d="M12,2 L12,10 L10,14" fill="none" stroke="#a67c52" strokeWidth="1" />
             <path d="M12,2 L14,-2 M12,2 L10,-2" fill="none" stroke="#c49a6c" strokeWidth="1" />
             <circle cx="20" cy="0" r="0.7" fill="red" />
             <rect x="1" y="0" width="18" height="4" fill="#d90429" rx="1"/>
          </g>
        </svg>
      </div>
      <div className="flex items-center gap-2 text-lg font-medium text-primary">
          <Snowflake className="animate-spin-slow" />
          <span>Spreading Christmas Cheer...</span>
      </div>
    </div>
  );
}
