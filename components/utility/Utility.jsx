import Heading2 from "../headings/Heading2";
import Heading4 from "../headings/Heading4";

import Image from "next/image";
import { utilityData } from "../../data/utility";

const Utility = () => {
  return (
    <section className="mt-[65px] md:mt-[115px] px-4 sm:px-0" id="utility">
      <div className="max-w-[1296px] m-auto">
        <div className="w-full lg:w-1/2 m-auto text-center">
          <Heading2>Utility</Heading2>
          <p className="mt-[10px]">
            Mint and Win NFT offers real-world, game-changing advantages that
            maximize your investment.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-5 mt-[40px] md:mt-[60px]">
          {utilityData.map((item) => (
            <div
              key={item.id}
              className="w-[306px] flex flex-col items-center rounded-[15px] bg-[color:var(--bg-gray)] p-[30px] transition duration-300 hover:box-shadow "
            >
              <div className="w-[120px] lg:w-[160px] h-[120px] lg:h-[160px] flex items-center justify-center border border-round-gradient rounded-full">
                <Image
                  src={item.img}
                  alt={item.img}
                  className="hover:scale-95"
                />
              </div>
              <div className="mt-[30px] text-center">
                <Heading4>{item.title}</Heading4>
                <p className="mt-[30px]">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Utility;
