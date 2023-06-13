'use client';
import React from "react";
import { FaDiscord } from "react-icons/fa";

const DiscordButton = ({ onClick, children }) => {
  const handleJoinDiscord = () => {
    window.open("https://discord.gg/bK6mwDSgxc", "_blank");
  };

  return (
    <button className="btn btn--primary" onClick={handleJoinDiscord}>
      {children}
    </button>
  );
};

export default DiscordButton;
