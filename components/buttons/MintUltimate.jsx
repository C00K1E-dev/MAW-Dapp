import React, { useState } from "react";
import { parseEther } from 'viem';
import { useAccount } from 'wagmi';
import { prepareWriteContract, waitForTransaction, writeContract } from 'wagmi/actions';
import PopupMessage from "../PopupMessage";
import { NFT_CONTRACT_ADDRESS, testabi } from "../contracts/VIP";

function MintUltimate() {
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { address, isConnected } = useAccount();
  const [isLoading, setisLoading] = useState(false)

  const handleMint = async () => {
    setisLoading(true)
    try {
      if (!address) {
        setPopupMessage("Please connect your wallet first.");
        setShowPopup(true);
        return;
      }

      if (!isConnected) {
        setPopupMessage("Please connect your wallet first.");
        setShowPopup(true);
        return;
      }

      const { request: contractRequest } = await prepareWriteContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: testabi,
        functionName: 'mintUltimate',
        args: [],
        value: parseEther('1')
      })

      const { hash: contractHash } = await writeContract(contractRequest)

      const receipt = await waitForTransaction({
        hash: contractHash,
        confirmations: 1
      })

      // Check if the transaction was successful
      if (receipt.status === 1) {
        setPopupMessage("Your NFT has been minted successfully!");
      } else {
        setPopupMessage("Transaction canceled. Your balance has not been deducted.");
      }

      setShowPopup(true);

    } catch (error) {
      console.error('Error in handleMint:', error.message);
      setPopupMessage("Insufficient funds. Please make sure you have enough BNB in your wallet.");
      setShowPopup(true);
    } finally {
      setisLoading(false)
    }
  };

  return (
    <div>
      <button className="btn btn--primary" disabled={isLoading} onClick={handleMint} >
        {isLoading ? 'Minting...' : 'Mint Ultimate'}
      </button>

      {showPopup && <PopupMessage message={popupMessage} onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default MintUltimate;
