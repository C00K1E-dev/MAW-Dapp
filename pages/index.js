import React, { useState, useEffect } from "react";
import Head from "next/head";
import CookieConsent from "../components/CookieConsent"; 
import About from "../components/about/About";
import Community from "../components/community/Community";
import Faq from "../components/faq/Faq";
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import Lottery from "../components/lottery/Lottery";
import Utility from "../components/utility/Utility";
import Partners from "../components/partners/Partners";
import NavBar from "../components/NavBar";
import Roadmap from "../components/roadmap/Roadmap";
import Team from "../components/team/Team";
import Upcoming from "../components/upcoming/Upcoming";
import VIP from "../components/VIP/VIP";
import Token from "../components/token/token";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { arbitrum, avalanche, bsc, fantom, mainnet, optimism, polygon } from "wagmi/chains";
import Modal from '../components/modal/Modal';

const chains = [bsc, mainnet, polygon, avalanche, arbitrum, optimism, fantom];
const projectId = "aca932c97e3f9bc59a1636dc1aeae670";
const metadata = {
  name: "Mint and Win",
  description: "Mint and Win",
  url: "https://mintandwin.com",
  icons: './images/walletlogo.png',
};
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ metadata, wagmiConfig, projectId, chains, themeMode: 'dark', themeVariables: {
  '--w3m-accent-fill-color': '#1a1f2c',
  '--w3m-accent': '#0adab9',
  '--w3m-font-family': 'jost',
}});

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Set initial state to false

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsModalOpen(false); // Set to false on mount
  }, []);

  return (
    <div>
      <Head>
        <title>
        MAW | Mint and Win
        </title>
        <meta name="google-site-verification" content="jAp8jtSY-cZHgCHVYvP_0tz6uFbowEEXinYB1JKwr8s" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WagmiConfig config={wagmiConfig}> {/* Wrap the entire content with WagmiConfig */}
        <main>
          <NavBar />
          <CookieConsent />
          <Hero />
          <About />
          <Lottery/>
          <Upcoming />
          <VIP />
          <Token />
          <Utility />
          <Roadmap />
          <Community />
          <Team />
          <Faq />
          <Partners />
          <Footer />
          <Modal isOpen={isModalOpen} closeModal={closeModal} />
        </main>
      </WagmiConfig>
    </div>
  );
};

export default Home;
