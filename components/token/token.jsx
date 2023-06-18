import TokenCard from "../cards/TokenCard";
import Heading2 from "../headings/Heading2";
import Heading5 from "../headings/Heading5";
import DoughnutChart from "../chart/DoughnutChart";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Token = () => {
  return (
    <section className="mt-[70px] sm:mt-[115px] px-4 xl:px-0" id="token">
      <div className="max-w-[1296px] m-auto">
        <div className="text-center mb-20"> {/* Add mb-8 for margin-bottom */}
          <Heading2>Token</Heading2>
        </div>

        <div className="max-w-[1296px] m-auto flex flex-col lg:flex-row items-center gap-0 md:gap-5 lg:gap-0">

          <div className="w-full md:w-10/12 lg:w-6/12 mt-[35px] md:mt-[55px]">
            <Heading5>Mint and Win Token</Heading5>
            <div className="mt-[30px] md:mt-[40px]">
            <DoughnutChart />
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
