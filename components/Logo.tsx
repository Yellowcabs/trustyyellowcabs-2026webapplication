import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = "h-10 w-auto"
}) => {
  return (
    <img
      src="/images/taxi-icon-512.png"
      alt="TrustyYellowCabs Logo"
      width="512"
      height="512"
      decoding="async"
      className={className}
    />
  );
};
