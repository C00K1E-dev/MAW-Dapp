import TokenCard from "../cards/TokenCard";
import Heading2 from "../headings/Heading2";
import Heading5 from "../headings/Heading5";

const Token = () => {
  return (
    <section className="mt-[70px] sm:mt-[115px] px-4 xl:px-0" id="token">
      <div className="max-w-[1296px] m-auto">
        <div className="text-center mb-20"> {/* Add mb-8 for margin-bottom */}
          <Heading2>Token</Heading2>
        </div>

        <div className="max-w-[1296px] m-auto flex flex-col lg:flex-row items-center gap-0 md:gap-5 lg:gap-0">
          <TokenCard />

          <div className="w-1/12 hidden lg:block"></div>

          <div className="w-full md:w-10/12 lg:w-6/12 mt-[35px] md:mt-[55px]">
            <Heading5>Mint and Win Token</Heading5>
            <ul> {/* Move the <ul> outside the <p> element */}
              <li>Total 150 million</li>
              <li>Presale: 10% (15 million tokens)</li>
              <li>Staking Rewards: 20% (30 million tokens)</li>
              <li>Team: 10% (15 million tokens)</li>
              <li>Marketing (including airdrops): 20% (30 million tokens)</li>
              <li>Liquidity Pool: 20% (30 million tokens)</li>
              <li>Development Fund: 5% (7.5 million tokens)</li>
              <li>Reserve: 10% (15 million tokens)</li>
            </ul>
            <p className="mt-[10px]">
              Learn more about our tokenomics here:
            </p>

            <div className="mt-[30px] md:mt-[40px]">
              <a href="/tokenomics" className="btn btn--primary">
                VIEW TOKENOMICS
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Token;
