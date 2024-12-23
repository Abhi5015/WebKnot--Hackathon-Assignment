import React from 'react';

const Card = ({ title, description, children }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      {children}
    </div>
  );
};

export default Card;
