import Image from "next/image";
import Heading2 from "../headings/Heading2";
import Heading5 from "../headings/Heading5";

import { leaderboardData } from "../../data/leaderboard";

const LeaderBoard = () => {
  return (
    <section
      className="mt-[65px] sm:mt-[115px] px-4 2xl:px-0 leaderboard"
      id="leaderBoard"
    >
      <div className="max-w-[1296px] m-auto">
        <div className="w-full lg:w-1/2 m-auto text-center">
          <Heading5>Latest Winners</Heading5>
          <Heading2>Leaderboard</Heading2>
          <p className="mt-[10px]">
            The leaderboard shows the top 10 minters of the collection determined
            by the number of NFT TICKET they have won.
          </p>
        </div>

        <div className="w-full md:w-8/12 m-auto overflow-x-auto relative mt-[35px] md:mt-[50px] pb-0 md:pb-[120px]">
          <table className="w-full border-separate border-spacing-y-[2px]">
            <thead className="text-white uppercase bg-[#3B4763]">
              <tr className="text-center">
                <th scope="col" className="p-[17px_24px]">
                  USER
                </th>
                <th scope="col" className="p-[17px_24px] text-end">
                  USER ID
                </th>
                <th scope="col" className="p-[17px_24px]">
                  NFT TICKET
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((singleData, i) => (
                <tr
                  key={singleData.user_id}
                  className="text-center text-white bg-[#2A3246]"
                >
                  {i <= 2 ? (
                    <td className="p-[15px_24px_15px]">
                      <div className="w-[90px] h-[90px] m-auto flex items-center justify-center rounded-[15px] bg-[#3B4763]">
                        <Image src={singleData.user} alt={singleData.user} />
                      </div>
                    </td>
                  ) : (
                    <td className="p-[15px_24px_15px] text-center">
                      #{singleData.user}
                    </td>
                  )}
                  <td className="p-[15px_24px_15px] text-end">
                    {singleData.user_id}
                  </td>
                  <td className="p-[15px_24px_15px] text-[color:var(--color-primary)]">
                    {singleData.nftlottery}BNB
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default LeaderBoard;
