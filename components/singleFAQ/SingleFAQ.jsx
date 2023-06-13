'use client';
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import Heading5 from "../headings/Heading5";

const SingleFAQ = ({ question, answer }) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="faq">
      <div
        tabIndex="0"
        className={`flex items-center justify-between gap-5 cursor-pointer ${
          showInfo && "rounded-b-none border-b-0"
        } rounded-[10px] py-[15px] md:py-[30px] px-[15px] md:px-[40px] bg-[#2D364D]`}
        onClick={() => setShowInfo(!showInfo)}
      >
        <Heading5 clr="text-white">{question}</Heading5>
        <div className="">
          <button
            type="button"
            className="w-6 lg:w-[40px] h-6 lg:h-[40px] rounded-full flex items-center justify-center text-white bg-[#414E6F]"
          >
            {showInfo ? <FaMinus /> : <FaPlus />}
          </button>
        </div>
      </div>
      {showInfo && (
        <AnimatePresence>
          <motion.div className="py-5 px-[30px] border-t border-[#546180] rounded-b-[10px] bg-[#414E6F]">
            <motion.p
              key="ans"
              initial={{
                maxHeight: 0,
                opacity: 0,
              }}
              animate={{
                maxHeight: "200px",
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              {answer}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default SingleFAQ;
