import { FaDiscord } from "react-icons/fa";
import DiscordButton from "../DiscordButton";
import LotteryCard from "../cards/LotteryCard";
import Heading2 from "../headings/Heading2";
import Heading5 from "../headings/Heading5";

const Lottery = () => {
  return (
    <section className="mt-[70px] sm:mt-[115px] px-4 xl:px-0" id="lottery">
      <div className="max-w-[1296px] m-auto flex flex-col lg:flex-row items-center gap-0 md:gap-5 lg:gap-0">
        <LotteryCard />

        <div className="w-1/12 hidden lg:block"></div>

        <div className="w-full md:w-10/12 lg:w-6/12 mt-[35px] md:mt-[55px]">
          <Heading5>Welcome to Mint and Win</Heading5>
          <div className="mt-[10px]">
            <Heading2>Mint and Win NFT Lottery Platform</Heading2>
          </div>
          <p className="mt-[15px]">
          Welcome to Mint and Win, where valuable prizes await you! With 1000 exclusive NFTs, we're giving away 100 incredible prizes. Even if you don't win, stay tuned for exciting plans involving non-winning tickets. Join us and mint your NFTs promptly. Good luck on your rewarding journey with Mint and Win!
          </p>
          <p className="mt-[10px]">
          We eagerly anticipate your participation. Here is the list of prizes:
          </p>

          <div className="flex gap-2 flex-wrap justify-center lg:justify-start rounded-[15px] bg-[#2A3246] p-[20px_15px] sm:p-[30px_20px] mt-[10px]">
            {[
              ["1st", "25"],
              ["2nd", "10"],
              ["3rd", "3"],
              ["4th-28th", "1"],
              ["29th-49th", "0.5"],
              ["50th-100th", "0.32"],
            ].map(([place, bnb], i) => (
              <p key={i} className="border-r pr-2 last:border-0">
                {place} place:{" "}
                <span className="text-[color:var(--color-primary)]">
                  {bnb}BNB
                </span>
              </p>
            ))}
          </div>

          <div className="mt-[30px] md:mt-[40px]">
            <DiscordButton>
              <FaDiscord className="text-[24px]" />
              JOIN OUR DISCORD
            </DiscordButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lottery;
