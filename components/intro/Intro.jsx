import React from "react";
import Heading5 from "../headings/Heading5";

const Intro = ({ imageUrl, text }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <div className="max-w-[800px] mt-4 sm:mt-6 px-4 sm:px-0 mx-auto text-center">
                <Heading5 className="text-[var(--color-primary)] text-lg font-bold mb-2">
                    What is Mint and Win
                </Heading5>
                <p className="max-w-[800px] mt-4 sm:mt-6 px-4 sm:px-0 mx-auto">
                    Mint and Win is poised to revolutionize the BSC ecosystem, offering a unique fusion of NFTs, Metaverse, Rewards, DeFi, and DeSo all in one platform for unparalleled user experience and substantial gains.
                </p>
                <p className="max-w-[800px] mt-4 sm:mt-6 px-4 sm:px-0 mx-auto">
                    Unlike many projects, we believe in transparency and utility. Our team doesn't hide behind gimmicky images of monkeys or dogs or any other meme token NFTs, nor do we use nicknames. We are dedicated to building a project that stands on its merits and delivers real value to our community.
                </p>
                <p className="max-w-[800px] mt-4 sm:mt-6 px-4 sm:px-0 mx-auto">
                    Our token not only offers utility within the Mint and Win ecosystem but also provides an opportunity for users to generate passive income through our upcoming staking platform.
                </p>
                <p className="max-w-[800px] mt-4 sm:mt-6 px-4 sm:px-0 mx-auto">
                    We are proud to announce that we are integrating ChainLink oracles for the automation of our smart contracts, ensuring reliability and security in our ecosystem. Additionally, Mint and Win has partnered with NFT Calendar for the verification of NFT collections, ensuring authenticity and trust for our users.
                </p>
            </div>
        </div>
    );
};

export default Intro;
