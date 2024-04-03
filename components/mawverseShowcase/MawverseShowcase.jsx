import React from "react";
import Image from "next/image";
import Heading5 from "../headings/Heading5";

const MawverseShowcase = ({ imageUrl, text }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="relative w-full max-w-[100%] sm:max-w-[400px] mx-auto">
        <Image
          src={imageUrl}
          alt="Mawverse Image"
          width={400}
          height={300}
          layout="responsive"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="max-w-[800px] mt-4 sm:mt-6 px-4 sm:px-0 mx-auto text-center">
        <Heading5 className="text-[color:var(--color-primary)] text-lg font-bold mb-2">
          Decentralized Social Platform MAWVerse
        </Heading5>
        <p className="text-center sm:text-left">
          {text}
        </p>
      </div>
    </div>
  );
};

export default MawverseShowcase;
