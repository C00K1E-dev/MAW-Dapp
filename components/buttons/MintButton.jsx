import React, { useState } from "react";
import { parseEther } from 'viem';
import { useAccount } from 'wagmi';
import { prepareWriteContract, waitForTransaction, writeContract } from 'wagmi/actions';
import PopupMessage from "../PopupMessage";
import { NFT_CONTRACT_ADDRESS, testabi } from "../contracts/1stCollection";

function MintNFT() {
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { address, isConnected } = useAccount();
  const [isLoading, setisLoading] = useState(false);

  const handleMint = async () => {
    setisLoading(true);
    try {
      if (!address || !isConnected) {
        setPopupMessage("Please connect your wallet first.");
        setShowPopup(true);
        return;
      }

      const { request: contractRequest } = await prepareWriteContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: testabi,
        functionName: 'mintNFT',
        args: [],
        value: parseEther('0.13')
      });

      const { hash: contractHash } = await writeContract(contractRequest);

      await waitForTransaction({
        hash: contractHash,
        confirmations: 1
      });

      setPopupMessage("Your NFT has been minted successfully!");
      setShowPopup(true);

    } catch (error) {
      console.error('Error in handleMint:', error.message);
      if (error.message.includes("insufficient funds for gas * price + value")) {
        setPopupMessage("Insufficient funds. Please make sure you have enough BNB in your wallet.");
      } else if (error.message.includes("User rejected")) {
        setPopupMessage("You have rejected the transaction. No funds were deducted.");
      } else {
        setPopupMessage(error.message);
      }
      setShowPopup(true);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div>
      <button className="btn btn--primary" disabled={isLoading} onClick={handleMint}>
        {isLoading ? 'Minting...' : 'Mint'}
      </button>
      {showPopup && <PopupMessage message={popupMessage} onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default MintNFT;
