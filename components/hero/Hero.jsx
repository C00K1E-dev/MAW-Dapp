import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import coin2 from "../../public/images/hero/coin2.webp";
import coin1 from "../../public/images/hero/coin1.webp";
import coin3 from "../../public/images/hero/coin3.webp";
import coin4 from "../../public/images/hero/coin4.webp";
import coin5 from "../../public/images/hero/coin5.webp";
import coin6 from "../../public/images/hero/coin6.webp";
import coin7 from "../../public/images/hero/coin7.webp";
import coin8 from "../../public/images/hero/coin8.webp";
import DiscordButton from "../buttons/DiscordButton";
import Heading2 from "../headings/Heading2";
import Heading5 from "../headings/Heading5";

const Hero = () => {
  return (
    <section className="hero relative px-4 xl:px-0" id="hero">
      <div className="coin1 animate-pulse hidden md:block">
        <Image src={coin1} alt="coin1" />
      </div>
      <div className="coin3 animate-[spin_4s_linear_infinite] hidden lg:block">
        <Image src={coin3} alt="coin3" />
      </div>
      <div className="coin5 hidden xl:block">
        <Image src={coin5} alt="coin5" />
      </div>
      <div className="coin4 animate-[spin_7s_linear_infinite] hidden md:block">
        <Image src={coin4} alt="coin4" />
      </div>
      <div className="max-w-[636px] m-auto text-center p-[291px_0_270px] md:p-[291px_0_370px] z-10 relative">
        <Heading5>It’s time to win</Heading5>
        <div className="mx-0 md:mx-20">
          <Heading2>Mint and Win, Stake and earn!</Heading2>
        </div>
        <p className="mt-[10px] text-white">
          Get a chance to win big by minting.We deploy on various blockchains Non
          Fungible Tokens as raffle tickets for art, collectibles, and other
          rare goods.
        </p>
        <div className="mt-[35px]">
          <DiscordButton>
            <FaDiscord className="text-[24px]" />
            JOIN OUR DISCORD
          </DiscordButton>
        </div>
      </div>

      <div className="coin8 animate-pulse">
        <Image src={coin8} alt="coin8" />
      </div>
      <div className="coin7 animate-[spin_5s_linear_infinite] hidden xl:block">
        <Image src={coin7} alt="coin7" priority />
      </div>
      <div className="coin6 animate-pulse hidden md:block">
        <Image src={coin6} alt="coin6" />
      </div>
      <div className="coin2 hidden md:block">
        <Image src={coin2} alt="coin2" />
      </div>
    </section>
  );
};

export default Hero;