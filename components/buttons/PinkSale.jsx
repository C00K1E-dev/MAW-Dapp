'use client';
import React from "react";

const PinkSaleButton = ({ children }) => {
  const openPinkSalePage = () => {
    window.open("https://www.pinksale.finance/launchpads?chain=BSC", "_blank");
  };

  return (
    <button className="btn btn--primary2" onClick={openPinkSalePage}>
            Pinksale
          </button>
  );
};

export default PinkSaleButton;
