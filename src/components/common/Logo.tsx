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
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* House Roof Top */}
      <path
        d="M15 42 L50 18 L68 29.5 L68 15 L74 15 L74 33.3 L85 42 L77 46 L50 28.5 L23 46 Z"
        fill="currentColor"
      />
      {/* Stylized Hexagonal Mirrored S with Door/Window Slots */}
      <path
        d="M75 58 L50 40 L25 58 L25 74 L50 92 L25 92 L25 102 L50 120 L75 102 L75 86 L50 68 L75 68 Z M46 68 L46 50 L54 50 L54 68 Z M46 92 L54 92 L54 110 L46 110 Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
};
