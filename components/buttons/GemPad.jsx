'use client';
import React from "react";

const PinkSaleButton = ({ children }) => {
  const openPinkSalePage = () => {
    window.open("https://gempad.app/presale/0x6BF7A2271C07c70748f937b947CEc1d1f12622eD?network=BNB_Smart_Chain", "_blank");
  };

  return (
    <button className="btn btn--primary" onClick={openPinkSalePage}>
            GemPad
          </button>
  );
};

export default PinkSaleButton;
