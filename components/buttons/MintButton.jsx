import React, { useState, useEffect } from "react";
import { useAccount } from 'wagmi';
import { testabi, NFT_CONTRACT_ADDRESS } from "../contracts/1stCollection";
import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import { parseEther } from 'viem';
import PopupMessage from "../PopupMessage";

function MintNFT({ ethereumClient }) {

  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
 
  const { address, isConnected } = useAccount();

  const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
    address: NFT_CONTRACT_ADDRESS,
    abi: testabi,
    functionName: 'mintNFT',
    value: parseEther('0.13'),
  });

  const { write, isLoading, isSuccess, isError, error, data } = useContractWrite(config);

  const handleMint = async () => {
    try {
      if (!address || !isConnected) {
        setPopupMessage("Please connect your wallet first.");
        setShowPopup(true);
        return;
      }

      const result = await write({
        args: [],
        value: parseEther('0.13'),
      });

      if (result.error) {
        setPopupMessage("An error occurred during the contract execution.");
        setShowPopup(true);
        return;
      }

      if (result.data) {
        const { events, transactionHash } = result.data;
        setPopupMessage(`Your NFT has been minted successfully! Transaction Hash: ${transactionHash}`);
        setShowPopup(true);
        console.log("Events:", events);
        console.log("Transaction Hash:", transactionHash);
      }

    } catch (error) {
      console.error('Error in handleMint:', error);
      setPopupMessage("An error occurred while minting your NFT.");
      setShowPopup(true);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      // No need to set the popup message here
    }
  }, [isSuccess]);

  return (
    <div>
      <button className="btn btn--primary" disabled={isLoading} onClick={handleMint} >
        {isLoading ? 'testMinting...' : 'testMint'}
      </button>
      
      {showPopup && <PopupMessage message={popupMessage} onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default MintNFT;
