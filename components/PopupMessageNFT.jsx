import React from "react";


const PopupMessageNFT = ({ message, onClose }) => {
  return (
    <div className="popup-container"> 
      <div className="popup-content  backdrop-blur-xl">
        <div className="popup-message grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5  ">{message}</div>
        <button className="btn btn--primary" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default PopupMessageNFT;

