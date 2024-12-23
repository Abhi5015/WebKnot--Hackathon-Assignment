import React from 'react';

const Button = ({ label, onClick, type = 'button', variant = 'primary' }) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium text-white transition';
  const variants = {
    primary: 'bg-primary hover:bg-blue-700',
    secondary: 'bg-secondary hover:bg-gray-700',
    accent: 'bg-accent hover:bg-yellow-600',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
