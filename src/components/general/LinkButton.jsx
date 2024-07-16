import React from 'react'

import { Link } from 'react-router-dom';

const LinkButton = ({ to, text, gradientFrom, gradientTo, textColor, onClick }) => {
  return (
    <Link
      to={to}
      className={`px-5 py-3 rounded-lg text-${textColor} bg-gradient-to-r from-${gradientFrom} to-${gradientTo} hover:shadow-md text-xl font-medium
                  max-sm:text-[18px] max-sm:py-2 sm:px-4   ` }
      onClick={onClick}
    >
      {text}
    </Link>
  );
};

export default LinkButton;