import React, { useState } from "react";
import { parseEther } from 'viem';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { prepareWriteContract, waitForTransaction, writeContract } from 'wagmi/actions';
import PopupMessage from "../PopupMessage";
import { NFT_CONTRACT_ADDRESS, testabi } from "../contracts/1stCollection";


function MintNFT({ ethereumClient }) {

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

      const { request: contractRqst } = await prepareWriteContract({
        address: NFT_CONTRACT_ADDRESS,
        abi: testabi,
        functionName: 'mintNFT',
        args: [],
        value: parseEther('0.13')
      })

      const { hash: contractHash } = await writeContract(contractRqst)

      await waitForTransaction({
        hash: contractHash,
        confirmations: 1
      })

      setPopupMessage("Your NFT has been minted successfully!");
      setShowPopup(true);

    } catch (error) {
      console.error('Error in handleMint:', error.message);
      // setPopupMessage(error.message);
      // setShowPopup(true);
    } finally {
      setisLoading(false)
    }
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     setPopupMessage("Your NFT has been minted successfully!");
  //     setShowPopup(true);
  //   }
  // }, [isSuccess]);

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
