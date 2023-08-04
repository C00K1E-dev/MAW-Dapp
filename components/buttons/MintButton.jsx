import React, { useState, useEffect } from "react";
import { useAccount } from 'wagmi';
import { testabi, NFT_CONTRACT_ADDRESS } from "../contracts/1stCollection";
import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import { parseEther } from 'viem';
import PopupMessage from "../PopupMessage";

function MintNFT({ ethereumClient }) {
 

  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
 
  const { address, isConnected } = useAccount(); // Get the isConnected variable from useAccount hook

  const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
    address: NFT_CONTRACT_ADDRESS,
    abi: testabi,
    functionName: 'mintNFT', // add the function name
    value: parseEther('0.13') , // Convert the BNB amount to Wei
  });

  // Get the write function from useContractWrite
  const { write, isLoading, isSuccess, isError, error, data } = useContractWrite(config);

  const handleMint = async () => {
    try {
      if (!address) {
        setPopupMessage("Please connect your wallet first.");
        setShowPopup(true);
        return;
      }
  
      // Check if the user's account is connected
      if (!isConnected) {
        setPopupMessage("Please connect your wallet first.");
        setShowPopup(true);
        return;
      }
  
      // Call the mintNFT function using the write function
      await write({
        args: [], // No arguments required for the mintNFT function
        value: parseEther('0.13') , // Convert the BNB amount to Wei
      });
  
    } catch (error) {
      console.error(error);
      setPopupMessage("An error occurred while minting your NFT.");
      setShowPopup(true);
    }
  };

  // Use useEffect to watch for changes in isSuccess
  useEffect(() => {
    if (isSuccess) {
      setPopupMessage("Your NFT has been minted successfully!");
      setShowPopup(true);
    }
  }, [isSuccess]);

  return (
    <div>
      <button className="btn btn--primary" disabled={!write || isLoading} onClick={handleMint} >
        {isLoading ? 'testMinting...' : 'testMint'}
      </button>
      
      {showPopup && <PopupMessage message={popupMessage} onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default MintNFT;
