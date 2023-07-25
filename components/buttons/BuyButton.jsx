import React, { useState, useEffect } from "react";
import Web3 from "web3";
import PopupMessage from "../PopupMessage";

const BuyButton = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [ethereumClient, setEthereumClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [amountInBNB, setAmountInBNB] = useState("0.1"); // Default amount set to 0.1 BNB

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      setEthereumClient(web3);
    }
  }, []);

  const checkWalletConnection = async () => {
    try {
      const accounts = await ethereumClient.eth.getAccounts();
      return accounts.length > 0;
    } catch (error) {
      console.error("Failed to check wallet connection", error);
      return false;
    }
  };

  const handleBuyTokens = async () => {
    try {
      if (!ethereumClient) {
        setPopupMessage("Please connect your wallet first.");
        setShowPopup(true);
        return;
      }

      // Check if the user is connected to a wallet
      const isConnected = await checkWalletConnection();
      if (!isConnected) {
        setPopupMessage("Please connect your wallet first.");
        setShowPopup(true);
        return;
      }

      // Get the Presale contract instance
      const presaleAddress = "0x3D4fCcF3aB346947eDa8F539Df5c73c31D7857e7"; // Replace with the actual deployed Presale contract address
      const presaleAbi = [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_tokenAddress",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "_pancakeSwapRouterAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_tokenPrice",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "buyer",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "TokensPurchased",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "buyTokens",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "maxPurchaseAmount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minPurchaseAmount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "pancakeSwapRouterAddress",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_newPrice",
              "type": "uint256"
            }
          ],
          "name": "setTokenPrice",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "token",
          "outputs": [
            {
              "internalType": "contract IToken",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "tokenPrice",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "withdrawBNB",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "withdrawTokens",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "stateMutability": "payable",
          "type": "receive"
        }
      ];

      const presaleContract = new ethereumClient.eth.Contract(presaleAbi, presaleAddress);

      // Convert the user input amount to wei
      const amountInWei = ethereumClient.utils.toWei(amountInBNB, "ether");

      // Send the transaction to the Presale contract
      const accounts = await ethereumClient.eth.getAccounts();
      const fromAddress = accounts[0]; // Use the first account as the 'from' address

      await presaleContract.methods.buyTokens().send({
        from: fromAddress,
        value: amountInWei,
      });

      setPopupMessage("Tokens purchased successfully!");
      setShowPopup(true);
    } catch (error) {
      console.error(error);
      setPopupMessage("An error occurred while purchasing tokens.");
      setShowPopup(true);
    }
  };

  const handleAmountChange = (event) => {
    setAmountInBNB(event.target.value);
  };

  return (
    <div>
      <input
        type="number"
        step="0.1"
        min="0.1"
        max="1"
        value={amountInBNB}
        onChange={handleAmountChange}
      />
      <button className="btn btn--primary" onClick={handleBuyTokens}>
        {children}
      </button>

      {showPopup && (
        <PopupMessage message={popupMessage} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default BuyButton;
