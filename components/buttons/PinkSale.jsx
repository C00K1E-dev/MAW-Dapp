'use client';
import React from "react";

const PinkSaleButton = ({ children }) => {
  const openPinkSalePage = () => {
    window.open("https://www.pinksale.finance/launchpad/0x051840a1519D178958c27047D11c727EE758B1e6?chain=BSC", "_blank");
  };

  return (
    <button className="btn btn--primary2" onClick={openPinkSalePage}>
            Pinksale
          </button>
  );
};

export default PinkSaleButton;
