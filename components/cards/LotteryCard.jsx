import Image from "next/image";
import btn_icon from "../../public/images/icon/btn_icon.png";
import gif from "../../public/images/team/thumbnail.gif";
import MintButton from "../MintButton";
import Heading4 from "../headings/Heading4";
import Heading6 from "../headings/Heading6";
import PopupMessage from "../PopupMessage"; // Import PopupMessage component

const LotteryCard = () => {
  return (
    <div className="w-full sm:w-8/12 md:w-7/12 lg:w-5/12 inline-flex flex-col text-center rounded-[10px] bg-[#2A3246]">
      <div className="p-[20px_20px_15px] lg:p-[40px_40px_30px]">
        <Image
          src={gif}
          alt="avt_img"
          className="rounded-[10px] hover:scale-95 transition duration-500 ease-in-out"
        />
      </div>
      <div className="px-[20px] lg:px-[40px]">
        <Heading4>Mint and Win</Heading4>
        <div className="flex justify-center gap-2 mt-[20px]">
          <Heading6 clr="text-white">
            <span className="text-[color:var(--color-primary)]">9/1000 </span>
            Tickets Sold
          </Heading6>
        </div>
        <div className="border-y border-[#4A587B] mt-4 p-[10px_0_8px]">
          <Heading6 clr="text-white">
            Ticket Price ={" "}
            <span className="text-[color:var(--color-primary)]">0.13 BNB</span>
          </Heading6>
        </div>
        <div className="my-[30px]">
          <MintButton>
            <Image src={btn_icon} alt="btn_icon" />
            Mint Tickets
            {/* Add PopupMessage component as child component */}
            <PopupMessage>
              Congratulations! You have successfully minted a ticket.
            </PopupMessage>
          </MintButton>
        </div>
      </div>
    </div>
  );
};

export default LotteryCard;
