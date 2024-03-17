import Image from "next/image";
import Heading2 from "../headings/Heading2";
import { useRouter } from "next/router";

const Partners = () => {
  const router = useRouter();

  const handleImageClick = (link) => {
    window.open(link, "_blank");
  };

  // Array of partners' image sources
  const partnerImages = [
    "/images/partners/partners1.png",  // Chainlink
    "/images/partners/partners2.png",  // Binance Smart Chain
    "/images/partners/partners4.png",  // NFT Calendar
    "/images/partners/partners5.png",  // OpenSea
  ];

  // Array of links corresponding to each partner image
  const partnerLinks = [
    "https://chain.link/",
    "https://www.bnbchain.org/en/bnb-smart-chain",
    "https://nftcalendar.io/event/mint-and-win/",
    "https://opensea.io/collection/maw-2",
  ];

  return (
    <section className="mt-[55px] sm:mt-[110px] px-4 2xl:px-0">
      <div className="max-w-[1296px] m-auto">
        <div className="text-center">
          <Heading2>Collaborators And Partners</Heading2>
        </div>
        <div className="flex flex-wrap justify-center gap-5 mt-[35px] md:mt-[55px]">
          {partnerImages.map((imageSrc, i) => (
            <Image
              key={i}
              src={imageSrc}
              alt={`partners${i + 1}`}
              width="196"
              height="70"
              className="cursor-pointer"
              onClick={() => handleImageClick(partnerLinks[i])}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
