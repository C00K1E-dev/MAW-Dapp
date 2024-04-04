import Link from "next/link";
import {  FaTelegram, FaTiktok,  } from "react-icons/fa";
import CustomTwitterIcon from "../icons/CustomTwitterIcon";

const Social = () => (
  <div className="flex gap-2 xl:gap-3 2xl:gap-3 text-white">
    {[
      ["1", CustomTwitterIcon, "https://twitter.com/MAW_MintandWin"],
      ["2", FaTelegram, "https://t.me/mintandwin"],
      
    ].map(([id, SocialIcon, href]) => (
      <a
        key={id}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn__social"
      >
        <SocialIcon className="text-base xl:text-2xl" />
      </a>
    ))}
  </div>
);

export default Social;