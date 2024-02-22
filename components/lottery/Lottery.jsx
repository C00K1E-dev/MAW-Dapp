import { FaTelegram } from "react-icons/fa";
import TelegramButton from "../buttons/TelegramButton";
import LotteryCard from "../cards/LotteryCard";
import Heading2 from "../headings/Heading2";
import Heading3 from "../headings/Heading3";

const Lottery = ({ ethereumClient }) => (
  <section className="mt-[70px] sm:mt-[115px] px-4 xl:px-0" id="Lottery">
    <div className="max-w-[1296px] m-auto text-center mb-8">
      <Heading2>Collections</Heading2>
      <div className="flex flex-col md:flex-row items-center gap-0 md:gap-5">
        <div className="w-full md:w-10/12 lg:w-6/12 mt-[35px] md:mt-[55px]">
          <Heading3>Mint and Win NFT Giveaway</Heading3>
          <p className="mt-[15px]">
            Discover Mint and Win, where exciting surprises await you! We're
            thrilled to present 1000 exclusive video NFTs, each offering a
            chance to get rewarded with fantastic prizes. Join us now and mint
            your exclusive video NFTs promptly. Wishing you success on your
            rewarding journey with Mint and Win!
          </p>
          <p className="mt-[10px]">Check out the list of incredible rewards:</p>
          <div className="flex gap-2 flex-wrap justify-center lg:justify-start rounded-[15px] bg-[#2A3246] p-[20px_15px] sm:p-[30px_20px] mt-[10px]">
            {[
              ["1 Reward Pack of", "25"],
              ["1Reward Pack of", "10"],
              ["1 Reward Pack of", "3"],
              ["25 Reward Packs of", "1"],
              ["21 Reward Packs of ", "0.5"],
              ["51 Reward packs of", "0.32"],
            ].map(([place, bnb], i) => (
              <div
                key={i}
                className={`flex items-center ${
                  i % 2 !== 0 && "md:flex-row"
                }`}
              >
                <span className="w-[9px] h-[9px] rounded-full bg-[#0adab9] text-green-500 text-3xl mr-2 ml-auto"></span>

                <p>
                  {place}:{" "}
                  <span className="text-[color:var(--color-primary)]">
                    {bnb}BNB
                  </span>{" "}
                  <span className="text-green-500 text-3xl"></span>
                </p>
              </div>
            ))}
          </div>
          <div className="mt-[30px] md:mt-[40px]">
            <TelegramButton>
              <FaTelegram className="text-[24px]" />JOIN OUR Telegram
            </TelegramButton>
          </div>
        </div>
        <div className="w-1/12 hidden lg:block"></div>
        <LotteryCard ethereumClient={ethereumClient} />
      </div>
    </div>
  </section>
);

export default Lottery;
