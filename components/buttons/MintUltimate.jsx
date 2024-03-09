import React, { useState } from "react";
import { parseEther } from 'viem';
import { useAccount } from 'wagmi';
import { prepareWriteContract, waitForTransaction, writeContract } from 'wagmi/actions';
import PopupMessage from "../PopupMessage";
import { VIP_CONTRACT_ADDRESS, vipabi } from "../contracts/VIP";

function MintUltimate() {
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { address, isConnected } = useAccount();
  const [isLoading, setisLoading] = useState(false)

  const handleMint = async () => {
    setisLoading(true)
    try {
      if (!address || !isConnected) {
        setPopupMessage("Please connect your wallet first.");
        setShowPopup(true);
        return;
      }
      
      const mintAmount = parseEther('1').toString();

      const { request: contractRequest } = await prepareWriteContract({
        address: VIP_CONTRACT_ADDRESS,
        abi: vipabi,
        functionName: 'mintUltimate',
        args: [],
        value: mintAmount
      })

// Increase gasLimit and add nonce management
const { hash: contractHash } = await writeContract(contractRequest, { gasLimit: 500000, nonceManager: true });
  
// Wait for the transaction to be mined
const receipt = await waitForTransaction({ hash: contractHash });

// Check if the receipt is valid
if (receipt) {
  setPopupMessage("Your NFT has been minted successfully!");
  setShowPopup(true); // Show popup only if message is set
}


} catch (error) {
  console.error('Error in handleMint:', error.message);
  if (error.message.includes("insufficient funds for gas * price + value")) {
    setPopupMessage("Insufficient funds. Please make sure you have enough BNB in your wallet.");
  } else if (error.message.includes("User rejected")) {
    setPopupMessage("You have rejected the transaction. No funds were deducted.");
  } else {
    setPopupMessage(`Error minting NFT: ${error.message}`);
  }
  setShowPopup(true); // Show popup for error cases as well
} finally {
  setisLoading(false);
}
};

const handleClosePopup = () => {
  setShowPopup(false);
  setPopupMessage(""); // Clear message when closing popup
};

  return (
    <div>
      <button className="btn btn--primary" disabled={isLoading} onClick={handleMint} >
        {isLoading ? 'Minting...' : 'Mint Ultimate'}
      </button>

      {showPopup && <PopupMessage message={popupMessage} onClose={handleClosePopup} />}
    </div>
  );
}

export default MintUltimate;
