import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top Part of E */}
      <path 
        d="M 32 15 L 75 15 L 71 32 L 42 32 C 34 32 29 36 25 47 L 32 15 Z" 
        fill="currentColor" 
      />
      
      {/* Arrow (Middle Part of E) */}
      <path 
        d="M 16 85 C 24 55 38 43 65 43 L 65 25 L 95 50 L 65 75 L 65 58 C 45 58 30 67 16 85 Z" 
        fill="currentColor" 
      />
      
      {/* Bottom Part of E */}
      <path 
        d="M 28 85 C 36 74 46 64 62 64 L 71 64 L 66 85 L 28 85 Z" 
        fill="currentColor" 
      />
    </svg>
  );
};
