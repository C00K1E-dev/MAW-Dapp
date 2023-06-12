import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import Image from "next/image";
import Logo from "../public/images/logo.png";
import WalletButton from "./WalletButton";
import NavItems from "./navItems/NavItems";
import Social from "./social/Social";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", navBarTop);
    return () => {
      window.removeEventListener("scroll", navBarTop);
    };
  }, []);

  const navBarTop = () => {
    if (window !== undefined) {
      let height = window.scrollY;
      setWindowHeight(height);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 py-[5px] px-4 tablet:px-0 2xl:px-0 tablet:backdrop-blur-xl ${
        windowHeight > 50 && "backdrop-blur-xl"
      }`}
    >
      {/* navbar brand */}
      <div className="max-w-[1296px] m-auto tablet:ml-4 flex flex-row tablet:flex-col items-center tablet:items-start gap-7 xl:gap-[45px] 2xl:gap-[150px] relative">
        <div className="flex items-center cursor-pointer">
          <Link href="/" passHref>
            <div style={{ width: "200px", height: "50px", position: "relative" }}>
              <Image src={Logo} layout="fill" objectFit="contain" alt="Nav Bar Brand" />
            </div>
          </Link>
        </div>
        <div
          tabIndex={0}
          onClick={() => setOpen(!open)}
          className="absolute right-4 border-round-gradient rounded p-1 hidden tablet:block"
        >
          <FaBars className="text-xl" />
        </div>

        <div
          className={`flex flex-row tablet:flex-col items-center tablet:items-start justify-between w-full ${
            open ? "tablet:block" : "tablet:hidden"
          }`}
        >
          {/* nav items */}
          <div className="pb-0 tablet:pb-6">
            <ul className="flex flex-row tablet:flex-col gap-3 xl:gap-[20px]">
              {[
                ["Home", "#hero"],
                ["Collections", "#Lottery"],
                ["Token", "#token"],
                ["Roadmap", "#roadmap"],
                ["Team", "#team"],
                ["FAQ", "#faq"],
              ].map(([title, url]) => (
                <NavItems
                  key={title}
                  title={title}
                  url={url}
                  open={open}
                  setOpen={setOpen}
                />
              ))}
            </ul>
          </div>
          {/* right side items */}
          <div className="flex flex-row tablet:flex-col items-center tablet:items-start gap-4 xl:gap-8 2xl:gap-7">
            {/* Social icons */}
            <Social />
            {/* button */}
            <WalletButton>Connect Wallet</WalletButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
