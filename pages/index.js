import React from "react";
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

const Home = () => (
  <div>
    <Head>
      <title>
        Mint and Win
      </title>
      <meta name="google-site-verification" content="jAp8jtSY-cZHgCHVYvP_0tz6uFbowEEXinYB1JKwr8s" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <NavBar />
      <CookieConsent />
      <Hero />
      <About />
      <Lottery />
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
    </main>
  </div>
);

export default Home;
