import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import btn_icon from "../../public/images/icon/btn_icon.png";
import video from "../../public/videos/thumbnailvid.mp4";
import MintButton from "../buttons/MintButton";
import Heading4 from "../headings/Heading4";
import Heading6 from "../headings/Heading6";
import PopupMessage from "../PopupMessage";
import NFTsButton from "../buttons/NFTsButton";
import { useContractRead } from "wagmi";
import { abi1, NFT_CONTRACT_ADDRESS1 } from "../contracts/1stCollection";

const abi = abi1;
const NFTTotalSupplyQuery = {
  address: NFT_CONTRACT_ADDRESS1,
  abi: abi1,
  functionName: "totalSupply",
};

const LotteryCard = ({ ethereumClient }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalNFTsSold, setTotalNFTsSold] = useState(0); // State to hold the sold NFT count

  const { data: totalSupplyData, isError, isLoading } = useContractRead(NFTTotalSupplyQuery);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
    setIsLoaded(true);
  }, []);

useEffect(() => {
  if (!isLoading && totalSupplyData !== undefined) {
    console.log("Updated total supply data:", totalSupplyData);
    setTotalNFTsSold(totalSupplyData.toString(10) || "0");
  }
}, [totalSupplyData, isLoading]);

  if (!isLoaded) {
    return null; // Don't render until data is loaded and video is ready
  }

  return (
    <div className="w-full sm:w-8/12 md:w-7/12 lg:w-5/12 inline-flex flex-col text-center rounded-[10px] bg-[#2A3246]">
      <div className="p-[20px_20px_15px] lg:p-[40px_40px_30px]">
        <video
          src={video}
          alt="avt_img"
          className="rounded-[10px] hover:scale-95 transition duration-500 ease-in-out"
          autoPlay
          loop
          muted // Add the muted attribute
          playsInline
          ref={videoRef}
        />
      </div>
      <div className="px-[20px] lg:px-[40px]">
        <Heading4>Mint and Win</Heading4>
        <div className="flex justify-center gap-2 mt-[20px]">
          <Heading6 clr="text-white">
            <span className="text-[color:var(--color-primary)]">
              {totalNFTsSold}/1000{" "}
            </span>
            NFTs Sold
          </Heading6>
        </div>
        <div className="border-y border-[#4A587B] mt-4 p-[10px_0_8px]">
          <Heading6 clr="text-white">
            NFT Price ={" "}
            <span className="text-[color:var(--color-primary)]">0.13 BNB</span>
          </Heading6>
        </div>
        <div className="my-[30px]">
          <MintButton ethereumClient={ethereumClient}>
            <Image src={btn_icon} alt="btn_icon" />
            Mint NFT
            {/* Add PopupMessage component as child component */}
            <PopupMessage>
              Congratulations! You have successfully minted.
            </PopupMessage>
          </MintButton>
          <div className="mt-4"></div>
          <NFTsButton ethereumClient={ethereumClient} />
        </div>
      </div>
    </div>
  );
};

export default LotteryCard;
