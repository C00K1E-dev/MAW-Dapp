import { upcomingData } from "../../data/upcoming";
import UpcomingLotteryCard from "../cards/UpcomingLotteryCard";
import Heading2 from "../headings/Heading2";

const Upcoming = () => {
  return (
    <section className="mt-[70px] sm:mt-[115px]">
      <div className="bg-[color:var(--bg-gray)] text-center p-[60px_0_295px] md:p-[105px_0_345px]">
        <Heading2>Upcoming Collections</Heading2>
      </div>

      <div className="max-w-[1296px] m-auto -mt-64 px-4 2xl:px-0">
        <div className="flex justify-center flex-wrap gap-5">
          {upcomingData.map((item) => (
            <UpcomingLotteryCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Upcoming;
