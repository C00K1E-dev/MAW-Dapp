import { upcomingData } from "../../data/upcoming";
import UpcomingLotteryCard from "../cards/UpcomingLotteryCard";
import Heading2 from "../headings/Heading2";

const Upcoming = () => {
  return (
    <div>
      <div className="bg-[color:var(--bg-dark)] text-center p-[15px_0_75px] md:p-[30px_0_100px]">
        <Heading2>Upcoming Collections</Heading2>
      </div>

      <div className="max-w-[1296px] m-auto px-4 2xl:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {upcomingData.map((item) => (
            <UpcomingLotteryCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
