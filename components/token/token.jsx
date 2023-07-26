import TokenCard from "../cards/TokenCard";
import Heading2 from "../headings/Heading2";
import Heading5 from "../headings/Heading5";
import ApacheChart from "../chart/ApacheChart";
import Headingcontract from "../headings/HeadingContract";

const Token = () => {
  return (
    <section className="mt-[70px] sm:mt-[115px] px-4 xl:px-0 token" id="token">
      <div className="max-w-[1296px] m-auto">
        <div className="text-center mb-20"> {/* Add mb-8 for margin-bottom */}
          <Heading2>Token</Heading2>
        </div>

        <div className="max-w-[1296px] m-auto flex flex-col lg:flex-row items-center gap-0 md:gap-5 lg:gap-0">

          <div className="w-full md:w-10/12 lg:w-6/12 mt-[-40px] md:mt-[-100px]">
            <div className="flex flex-col items-center"> {/* Center the title */}
              <Heading5>Mint and Win Token</Heading5>
              <Headingcontract>0x4546dFFA8dC8D1D7044BEC469650a95306C2C086</Headingcontract>
              <div className="mt-[-100px] md:mt-[20px]" style={{ width: '100%', height: '500px' }}>
                <ApacheChart />
              </div>
            </div>
          </div>

          <div className="w-1/12 hidden lg:block"></div>

          <TokenCard />

        </div>
      </div>
    </section>
  );
};

export default Token;
