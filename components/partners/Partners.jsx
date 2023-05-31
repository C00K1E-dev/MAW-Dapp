import Image from "next/image";
import Heading2 from "../headings/Heading2";

const Partners = () => {
  return (
    <section className="mt-[55px] sm:mt-[110px] px-4 2xl:px-0">
      <div className="max-w-[1296px] m-auto">
        <div className="text-center">
          <Heading2>Investors And Partners</Heading2>
        </div>
        <div className="flex flex-wrap justify-center gap-5 mt-[35px] md:mt-[55px]">
          {[...Array(12)].map((item, i) => (
            <Image
              key={i}
              src={`/images/partners/partners${i + 1}.png`}
              alt={`partners${i + 1}`}
              width="196"
              height="70"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
