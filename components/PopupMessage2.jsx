'use client';
import React from "react";
import Heading4 from "../components/headings/Heading4";

const PopupMessage = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-0 backdrop-filter"></div>
      <div className="relative backdrop-blur-xl rounded-lg px-4 py-3 sm:my-8 sm:max-w-lg sm:w-full">
        
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <Heading4>{message}</Heading4>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button 
            type="button"
            className={`btn ${ " btn--primary"}`}
            onClick={onClose}
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupMessage;
