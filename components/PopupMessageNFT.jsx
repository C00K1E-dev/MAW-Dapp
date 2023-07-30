import React from "react";


const PopupMessageNFT = ({ message, onClose }) => {
  return (
    <div className="popup-container"> 
      <div className="popup-content  backdrop-blur-xl">
        <div className="popup-message flex gap-6  ">{message}</div>
        <button className="btn btn--primary" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default PopupMessageNFT;

