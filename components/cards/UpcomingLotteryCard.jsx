import Image from "next/image";
import Heading5 from "../headings/Heading5";

const UpcomingLotteryCard = ({ title, tickets, price, avt_img }) => {
  return (
    <div className="inline-flex flex-col bg-[#2A3246] rounded-[10px]">
      <div className="inline-flex flex-col items-center p-[10px]">
        <Image
          className="rounded-[10px] hover:scale-95 transition duration-500 ease-in-out"
          src={avt_img}
          alt={title}
          placeholder="blur"
        />
        <label className="rounded-[15px] p-[10px_20px] font-[14px] leading-[18px] text-white uppercase bg-[#DC3446] -mt-5 z-10">
          Upcoming
        </label>
      </div>
      <div className="text-center p-[15px_10px_30px_10px]">
        <Heading5 clr="text-white">{title}</Heading5>
        <div className="flex justify-center gap-2 mt-[15px]">
          <h6 className="heading-6 font-normal">
            <span className="text-[color:var(--color-primary)]">
              {tickets}{" "}
            </span>
            Tickets
          </h6>
          <span className="border"></span>
          <h6 className="heading-6 font-normal">
            Ticket Price ={" "}
            <span className="text-[color:var(--color-primary)]">
              {price} ETH
            </span>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default UpcomingLotteryCard;
