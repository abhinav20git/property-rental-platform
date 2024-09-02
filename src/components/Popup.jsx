"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const PopupCard = ({ message, color, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-75 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-sm sm:w-80 relative">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-black dark:text-white">
            Server Message
          </span>
          <button
            className="text-xl font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            onClick={handleClose}
          >
            ×
          </button>
        </div>
        <div
          className="text-center mb-4 dark:text-white text-black"
          
        >
          {message}
        </div>
        <button
          className="bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 dark:hover:bg-blue-800 mx-auto block"
          onClick={handleClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

PopupCard.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default PopupCard;
