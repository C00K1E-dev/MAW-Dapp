import React, { useState, useEffect } from "react";
import { useAccount } from 'wagmi';
import { testabi, NFT_CONTRACT_ADDRESS } from "../contracts/1stCollection";
import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import { parseEther } from 'viem';
import PopupMessage from "../PopupMessage";

function MintNFT({ ethereumClient }) {
  console.log('ethereumClient:', ethereumClient); // Log the ethereumClient object

  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
 
  const { address, isConnected } = useAccount(); // Get the isConnected variable from useAccount hook
  console.log('address:', address); // Log the address
  console.log('isConnected:', isConnected); // Log the isConnected state

  const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
    address: NFT_CONTRACT_ADDRESS,
    abi: testabi,
    functionName: 'mintNFT', // add the function name
    value: parseEther('0.13') , // Convert the BNB amount to Wei
  });
  console.log('config:', config); // Log the config object
  console.log('prepareError:', prepareError); // Log the prepareError

  // Get the write function from useContractWrite
  const { write, isLoading, isSuccess, isError, error, data } = useContractWrite(config);
  console.log('write:', write); // Log the write function
  console.log('isLoading:', isLoading); // Log the isLoading state

  const handleMint = async () => {
    console.log('handleMint called'); // Log when handleMint is called
    try {
      if (!address) {
        console.log('Address is not defined.'); // Log when address is not defined
        setPopupMessage("Please connect your wallet first.");
        setShowPopup(true);
        return;
      }
  
      // Check if the user's account is connected
      if (!isConnected) {
        console.log('Wallet is not connected.'); // Log when wallet is not connected
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
      console.error('Error in handleMint:', error); // Log the error in handleMint
      setPopupMessage("An error occurred while minting your NFT.");
      setShowPopup(true);
    }
  };

  // Use useEffect to watch for changes in isSuccess
  useEffect(() => {
    console.log('isSuccess:', isSuccess); // Log the isSuccess state
    if (isSuccess) {
      setPopupMessage("Your NFT has been minted successfully!");
      setShowPopup(true);
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
