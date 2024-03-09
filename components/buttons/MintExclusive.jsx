import React, { useState } from "react";
import { parseEther } from 'ethers/lib/utils';
import { useAccount } from 'wagmi';
import { prepareWriteContract, waitForTransaction, writeContract } from 'wagmi/actions';
import PopupMessage from "../PopupMessage";
import { VIP_CONTRACT_ADDRESS, vipabi } from "../contracts/VIP";

function MintExclusive() {
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

      const mintAmount = parseEther('0.05').toString();
      
      const { request: contractRequest } = await prepareWriteContract({
        address: VIP_CONTRACT_ADDRESS,
        abi: vipabi,
        functionName: 'mintExclusive',
        args: [],
        value: mintAmount
      });

      // Increase gasLimit and add nonce management
      const { hash: contractHash } = await writeContract(contractRequest, { gasLimit: 500000, nonceManager: true });

      const receipt = await waitForTransaction({
        hash: contractHash,
        confirmations: 1
      });

      // Check if the transaction was successful
      if (receipt.status === 1) {
        setPopupMessage("Your NFT has been minted successfully!");
      } else {
        setPopupMessage("Transaction failed or canceled. Your balance has not been deducted.");
      }

      setShowPopup(true);

    } catch (error) {
      console.error('Error in handleMint:', error.message);
      setPopupMessage(`Error minting NFT: ${error.message}`);
      setShowPopup(true);
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
      <button className="btn btn--primary" disabled={isLoading} onClick={handleMint}>
        {isLoading ? 'Minting...' : 'Mint Exclusive'}
      </button>

      {showPopup && <PopupMessage message={popupMessage} onClose={handleClosePopup} />}
    </div>
  );
}

export default MintExclusive;
