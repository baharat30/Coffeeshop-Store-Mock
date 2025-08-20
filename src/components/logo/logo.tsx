// Logo.jsx
import React from 'react';
import '../logo/logo.css';

interface LogoProps {
  className?: string; 
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`logo ${className || ''}`}>
      <h1 className="logoH">H</h1>
      <span className="logoName">HESS Coffee</span>
      <span className="logoEsm"> قهوه حــِس</span>
    </div>
  );
};

export default Logo;
