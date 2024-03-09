import React, { useState, useEffect } from "react";
import { parseEther } from 'viem';
import { useAccount } from 'wagmi';
import { prepareWriteContract, waitForTransaction, writeContract, readContract } from 'wagmi/actions';
import PopupMessage from "../PopupMessage";
import { VIP_CONTRACT_ADDRESS, vipabi } from "../contracts/VIP";


function ClaimTokens() {

  const { address, isConnected } = useAccount();
  const [isLoading, setisLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [unclaimedTokens, setUnclaimedTokens] = useState(null);
  const [lastClaim, setlastClaim] = useState(null);

  // Read unclaimed Tokens
  useEffect(() => {
    const readUnclaimed = async () => {
      try {
        const result = await readContract({
          address: VIP_CONTRACT_ADDRESS,
          abi: vipabi,
          functionName: 'tokensAvailableForClaim',
          args: [address]
        })
        const value = result.toString();
        setUnclaimedTokens(value);
      } catch (err) {
        console.log(err);
      }
    };
    readUnclaimed();
  }, [address, isConnected, popupMessage]);

  // Read claim time in Epoch timestamp
  useEffect(() => {
    const readClaimTime = async () => {
      try {
        const result = await readContract({
          address: VIP_CONTRACT_ADDRESS,
          abi: vipabi,
          functionName: 'getLastClaim',
          args: [address]
        })

        const value = result.toString();
        setlastClaim(value);
      } catch (err) {
        console.log(err);
      }
    };
    readClaimTime();
  }, [address, isConnected]);

  // Claim Tokens
  const handleClaim = async () => {
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

      if (unclaimedTokens < 1) {
        setPopupMessage("Sorry, you don't have tokens to claim.");
        setShowPopup(true);
        return;
      }

      const { request: contractRequest } = await prepareWriteContract({
        address: VIP_CONTRACT_ADDRESS,
        abi: vipabi,
        functionName: 'claimTokens',
        args: [],
      })

      const { hash: contractHash } = await writeContract(contractRequest)

      await waitForTransaction({
        hash: contractHash,
        confirmations: 1
      })

      setPopupMessage("Your tokens have been claimed successfully!");
      setShowPopup(true);

    } catch (error) {
      console.error('Error in handleClaim:', error.message);
      if (error.message.includes("insufficient funds for gas * price + value")) {
        setPopupMessage("Insufficient funds. Please make sure you have enough BNB in your wallet.");
      } else if (error.message.includes("User rejected") || error.message.includes("User denied")) {
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
      <div>
        <p>You have {unclaimedTokens} $MAW tokens to claim.</p>
      </div>
      <button className="btn btn--primary" disabled={isLoading} onClick={handleClaim}>
        {isLoading ? 'Claiming...' : 'Claim Tokens'}
      </button>

      {showPopup && <PopupMessage message={popupMessage} onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default ClaimTokens;
