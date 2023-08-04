import React, { useState, useEffect } from "react";
import Head from "next/head";
import CookieConsent from "../components/CookieConsent"; 
import About from "../components/about/About";
import Community from "../components/community/Community";
import Faq from "../components/faq/Faq";
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import LeaderBoard from "../components/leaderBoard/LeaderBoard";
import Lottery from "../components/lottery/Lottery";
import Utility from "../components/utility/Utility";
import Partners from "../components/partners/Partners";
import NavBar from "../components/NavBar";
import Roadmap from "../components/roadmap/Roadmap";
import Team from "../components/team/Team";
import Upcoming from "../components/upcoming/Upcoming";
import VIP from "../components/VIP/VIP";
import Token from "../components/token/token";
import { Web3Modal } from '@web3modal/react';
import { arbitrum, avalanche, bscTestnet, mainnet, polygon } from 'wagmi/chains';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import Modal from '../components/modal/Modal';

const chains = [arbitrum, mainnet, polygon, bscTestnet, avalanche];
const projectId = 'aca932c97e3f9bc59a1636dc1aeae670';
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <div>
      <Head>
        <title>
          Mint and Win
        </title>
        <meta name="google-site-verification" content="jAp8jtSY-cZHgCHVYvP_0tz6uFbowEEXinYB1JKwr8s" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WagmiConfig config={wagmiConfig}> {/* Wrap the entire content with WagmiConfig */}
        <main>
          <Web3Modal
            themeMode="dark"
            themeVariables={{
              '--w3m-logo-image-url': './images/walletlogo.png',
              '--w3m-overlay-backdrop-filter': 'blur(5px)',
              '--w3m-overlay-background-color': 'rgba(0, 0, 0, 0.1)',
              '--w3m-background-color': '#0adab9',
              '--w3m-accent-fill-color': '#1a1f2c',
              '--w3m-accent-color': '#0adab9',
              '--w3m-font-family': 'jost',
            }}
            projectId={projectId}
            ethereumClient={ethereumClient}
          />
          <NavBar />
          <CookieConsent />
          <Hero />
          <About />
          <Lottery ethereumClient={ethereumClient} />
          <LeaderBoard />
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
