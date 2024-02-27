import { useState } from "react";
import Image from "next/image";
import tokenImage from "../../public/images/tokenImage.png"; // Import an image for your token
import Heading4 from "../headings/Heading4";
import Heading6 from "../headings/Heading6";
import PinkSaleButton from "../buttons/PinkSale";

const TokenCard = () => {
  const [showPopup, setShowPopup] = useState(false); // Create the showPopup state variable

  return (
    <div className="w-full sm:w-8/12 md:w-7/12 lg:w-5/12 inline-flex flex-col text-center rounded-[10px] bg-[#2A3246]">
      <div className="p-[20px_20px_15px] lg:p-[40px_40px_30px]">
        <Image
          src={tokenImage}
          alt="Token Image"
          className="rounded-[10px] hover:scale-95 transition duration-500 ease-in-out"
        />
      </div>
      <div className="px-[20px] lg:px-[40px]">
        <Heading4>MAW Token</Heading4>
        <div className="flex justify-center gap-2 mt-[20px]">
          <Heading6 clr="text-white">
            <span className="text-[color:var(--color-primary)]">15 milion </span>
            Available in this presale phase
          </Heading6>
        </div>
        <div className="border-y border-[#4A587B] mt-4 p-[10px_0_8px]">
          <Heading6 clr="text-white">
            Token Price ={" "}
            <span className="text-[color:var(--color-primary)]">0.05 $ in BNB</span>
          </Heading6>
        </div>
        <div className="my-[30px]">
          <PinkSaleButton/>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
