import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import ball0 from "../../public/images/hero/ball0.png";
import ball01 from "../../public/images/hero/ball01.png";
import ball1 from "../../public/images/hero/ball1.png";
import ball2 from "../../public/images/hero/ball2.png";
import ball4 from "../../public/images/hero/ball4.png";
import ball5 from "../../public/images/hero/ball5.png";
import ball9 from "../../public/images/hero/ball9.png";
import frame1 from "../../public/images/hero/frame1.png";
import frame2 from "../../public/images/hero/frame2.png";
import DiscordButton from "../DiscordButton";
import Heading2 from "../headings/Heading2";
import Heading5 from "../headings/Heading5";

const Hero = () => {
  return (
    <section className="hero relative px-4 xl:px-0" id="hero">
      <div className="ball01 animate-pulse hidden md:block">
        <Image src={ball01} alt="ball01" />
      </div>
      <div className="ball1 animate-[spin_4s_linear_infinite] hidden lg:block">
        <Image src={ball1} alt="ball1" />
      </div>
      <div className="ball4 hidden xl:block">
        <Image src={ball4} alt="ball4" />
      </div>
      <div className="ball2 animate-[spin_7s_linear_infinite] hidden md:block">
        <Image src={ball2} alt="ball2" />
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

      <div className="frame2 animate-pulse">
        <Image src={frame2} alt="frame2" />
      </div>
      <div className="ball9 animate-[spin_5s_linear_infinite] hidden xl:block">
        <Image src={ball9} alt="ball9" priority />
      </div>
      <div className="ball5 animate-pulse hidden md:block">
        <Image src={ball5} alt="ball5" />
      </div>
      <div className="ball0 hidden md:block">
        <Image src={ball0} alt="ball0" />
      </div>
    </section>
  );
};

export default Hero;