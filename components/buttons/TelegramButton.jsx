'use client';
import React from "react";
import { FaTelegram } from "react-icons/fa";

const TelegramButton = ({ onClick, children }) => {
  const handleJoinTelegram = () => {
    window.open("https://t.me/mintandwin", "_blank");
  };

  return (
    <button className="btn btn--primary" onClick={handleJoinTelegram}>
      {children}
    </button>
  );
};

export default TelegramButton;