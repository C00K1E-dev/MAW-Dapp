'use client';
import React from "react";
import Heading2 from "../headings/Heading2";

const Footer = () => {
  const handleClick = (file) => {
    window.open(`/docs/${file}.html`, "_blank");
  };

  return (
    <section className="footer-bg bg-[#2D364D] mt-[70px] md:mt-[120px] pt-[60px] md:pt-[105px]">
      <div className="max-w-[1296px] m-auto">
        <div className="w-10/12 md:w-6/12 m-auto text-center">
          <Heading2>Don&lsquo;t Miss Out, Stay Updated</Heading2>
        </div>
        <div className="w-11/12 md:w-8/12 m-auto mt-[35px] md:mt-[55px]">
          <form>
            <div className="relative">
              <input
                className="input-form"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                required
              />
              <button
                className="p-[10px] rounded-[10px] text-[color:var(--bg-dark)] bg-[color:var(--color-primary)] heading-6 absolute top-1/2 right-[13px] -translate-y-1/2"
                type="submit"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
      <footer className="mt-[70px] md:mt-[120px] px-4 2xl:px-0 border-t border-[#3D3C6B]">
        <div className="max-w-[1296px] m-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between py-[30px]">
            <p className="text-center">
              Copyright © 2023, Mint and Win - All Rights Reserved
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
    </section>
  );
};

export default Footer;
