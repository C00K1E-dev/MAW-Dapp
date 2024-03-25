import TokenCard from "../cards/TokenCard";
import Heading2 from "../headings/Heading2";
import Heading5 from "../headings/Heading5";
import ApacheChart from "../chart/ApacheChart";
import Headingcontract from "../headings/HeadingContract";

const Token = () => {
  return (
    <section className="mt-[70px] sm:mt-[115px] px-4 xl:px-0" id="token">
      <div className="max-w-[1296px] m-auto">
        <div className="text-center mb-20">
          <Heading2>Token</Heading2>
        </div>
        <div className="max-w-[1296px] m-auto flex flex-col lg:flex-row items-center gap-0 md:gap-5 lg:gap-0">
          <div className="w-full md:w-10/12 lg:w-6/12 mt-[-40px] md:mt-[-100px]">
            <div className="flex flex-col items-center">
              <Heading5>Mint and Win Token</Heading5>
              <Headingcontract>0xf3157603B6B76f051C0195369eaC1030a41af4d2</Headingcontract>
              <a href="/docs/Whitepaper.pdf" target="_blank" rel="noopener noreferrer">
                <button className="btn btn--primary">
                  View Whitepaper
                </button>
              </a>
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