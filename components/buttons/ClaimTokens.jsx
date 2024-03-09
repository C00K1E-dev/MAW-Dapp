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
    const readUnlcaimed = async () => {
      try {
        const result = await readContract({
          address: VIP_CONTRACT_ADDRESS,
          abi: vipabi,
          functionName: 'tokensAvailableForClaim',
          args: [address]
        })
        const value = result.toString();
        setUnclaimedTokens(value);
        console.log(value);
      } catch (err) {
        console.log(err);
      }
    };
    readUnlcaimed();
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

      if (unclaimedTokens < 1) {
        setPopupMessage("Sorry, you dont have tokens to claim.");
        setShowPopup(true);
        return
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

      setPopupMessage("Your tokens has been claim successfully!");
      setShowPopup(true);

    } catch (error) {
      console.error('Error in handleMint:', error.message);
      // setPopupMessage(error.message);
      // setShowPopup(true);
    } finally {
      setisLoading(false)
    }
  };



  return (
    <div>
      <div>
        <p>You have {unclaimedTokens} $MAW tokens to claim.</p>
      </div>
      <button className="btn btn--primary" disabled={isLoading} onClick={handleMint} >
        {isLoading ? 'testClaiming...' : 'testClaim'}
      </button>

      {showPopup && <PopupMessage message={popupMessage} onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default ClaimTokens;