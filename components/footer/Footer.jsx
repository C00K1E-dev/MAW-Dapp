import React from "react";

const Footer = () => {
  const handleClick = (file) => {
    window.open(`/docs/${file}.html`, "_blank");
  };

  return (
    <footer className="mt-[70px] md:mt-[120px] px-4 2xl:px-0 border-t border-[#3D3C6B]">
      <div className="max-w-[1296px] m-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between py-[30px]">
          <p className="text-center">
            Copyright © 2024, Mint and Win - All Rights Reserved
          </p>

          <div className="copy-right mt-2 md:mt-0">
            <ul className="flex gap-3 xl:gap-[20px]">
              <button onClick={() => handleClick("Disclaimer")}>Disclaimer</button>
              <button onClick={() => handleClick("Terms")}>Terms</button>
              <button onClick={() => handleClick("Privacy")}>Privacy</button>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
