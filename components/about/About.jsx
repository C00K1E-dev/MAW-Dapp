import Image from "next/image";
import Heading5 from "../headings/Heading5";
import Heading6 from "../headings/Heading6";

import draw from "../../public/images/draw.png";
import ticket from "../../public/images/ticket.png";
import wallet from "../../public/images/wallet.png";

const aboutData = [
  {
    id: "01",
    title: "Connect Wallet",
    img: wallet,
  },
  {
    id: "02",
    title: "Mint NFT Ticket",
    img: ticket,
  },
  {
    id: "03",
    title: "See your prize",
    img: draw,
  },
];

const About = () => {
  return (
    <section className="-mt-[150px] px-4 2xl:px-0 z-20 relative" id="about">
      <div className="max-w-[1296px] m-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {aboutData.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-center flex-col bg-[#2A3246] rounded-[15px] pt-[40px] lg:pt-[60px] pb-[35px] lg:pb-[55px]"
            >
              <div className="flex items-center justify-center w-[120px] h-[120px] bg-[#414D6C] rounded-full relative">
                <Image
                  src={item.img}
                  alt={item.title}
                  className="hover:scale-95"
                />

                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[color:var(--color-primary)] absolute top-full -translate-y-full right-0">
                  <Heading6 clr="text-black">{item.id}</Heading6>
                </div>
              </div>
              <div className="mt-[25px]">
                <Heading5 clr="text-white">{item.title}</Heading5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
