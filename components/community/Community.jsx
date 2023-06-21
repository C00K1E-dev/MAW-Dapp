import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import Heading2 from "../headings/Heading2";
import Heading4 from "../headings/Heading4";

import { communityData } from "../../data/community";

const Community = () => {
  return (
    <section className="mt-[70px] md:mt-[120px] px-4 2xl:px-0">
      <div className="max-w-[1296px] m-auto">
        <div className="w-full lg:w-1/2 m-auto text-center">
          <Heading2>Join Our Community</Heading2>
        </div>
        <div className="flex justify-center gap-[11px] md:gap-[22px] flex-wrap mt-[37px] md:mt-[55px]">
          {communityData.map((item) => (
            <div
              key={item.id}
              className="w-[130px] md:w-[307px] inline-flex flex-col items-center text-center gap-4 md:gap-6 border border-[#475579] rounded-[185px] p-[40px_20px] md:p-[80px_40px]"
            >
              <button
                className="btn-community w-[60px] md:w-[80px] h-[60px] md:h-[80px] bg-[#4B597B] text-[30px] md:text-[40px] text-white"
                onClick={() => window.open(item.link, "_blank")}
              >
                {item.icon}
              </button>
              <Heading4>
                <Link href={item.link} passHref>
                  <a className="link-styling" target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </Link>
              </Heading4>
              <p className="px-0 md:px-5 text-white">{item.desc}</p>
              {item.title === "Discord" ? (
                <button
                  className="btn-community w-[50px] h-[50px] bg-[color:var(--color-primary)] text-[30px] text-black"
                  onClick={() => window.open("https://discord.gg/bK6mwDSgxc", "_blank")}
                >
                  <BsArrowRight />
                </button>
              ) : (
                <Link href={item.link} passHref>
                  <a className="btn-community w-[50px] h-[50px] bg-[color:var(--color-primary)] text-[30px] text-black" target="_blank" rel="noopener noreferrer">
                    <BsArrowRight />
                  </a>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
