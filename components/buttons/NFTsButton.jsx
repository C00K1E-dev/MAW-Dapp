import React, { useState, useEffect } from "react";
import Web3 from "web3";
import PopupMessageNFT from "../PopupMessageNFT";

const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
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
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MAX_SUPPLY",
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
    "name": "NFT_PRICE",
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
    "name": "WITHDRAWAL_LIMIT",
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
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
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
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "getOwnedTokenIds",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "getTokenIdsByOwner",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mintNFT",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "nftData",
    "outputs": [
      {
        "internalType": "string",
        "name": "videoUrl",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "jsonData",
        "type": "string"
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
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
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
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
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const contractAddress = "0x27e25A7630a9C68c97aF93c394EE788E6c0160F8";
const baseIpfsUrl = "https://bafybeibdf2ow6opelj2xcfkrfgbrzz42bzruudwxemo3zb7rtdsmgo26ra.ipfs.dweb.link/";

function NFTsButton() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [ethereumClient, setEthereumClient] = useState(null);
  const [nftsData, setNFTsData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [ownerTokenIds, setOwnerTokenIds] = useState([]);

  useEffect(() => {
    const initializeEthereumClient = async () => {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        const web3 = new Web3(window.ethereum);
        setEthereumClient(web3);
      }
    };

    initializeEthereumClient();
  }, []);

  const checkWalletConnection = async () => {
    try {
      const accounts = await ethereumClient?.eth.getAccounts();
      return accounts && accounts.length > 0;
    } catch (error) {
      console.error("Failed to check wallet connection", error);
      return false;
    }
  };

  const fetchCollectionName = async () => {
    try {
      if (!ethereumClient) {
        return;
      }

      const nftContract = new ethereumClient.eth.Contract(abi, contractAddress);
      const name = await nftContract.methods.name().call();
      setCollectionName(name);
    } catch (error) {
      console.error("Error fetching collection name:", error);
    }
  };

  const fetchOwnerTokenIds = async () => {
    try {
      if (!ethereumClient) {
        return;
      }

      // Check if the user is connected to a wallet
      const isConnected = await checkWalletConnection();
      if (!isConnected) {
        return;
      }

      const nftContract = new ethereumClient.eth.Contract(abi, contractAddress);
      const accounts = await ethereumClient.eth.getAccounts();
      const ownerAddress = accounts[0]; // Use the first account as the owner address

      // Call your contract's function to get token IDs owned by the user
      const tokenIds = await nftContract.methods.getTokenIdsByOwner(ownerAddress).call();
      console.log("Token IDs owned by the user:", tokenIds); // Debugging statement
      setOwnerTokenIds(tokenIds);
    } catch (error) {
      console.error("Error fetching owner's token IDs:", error);
    }
  };

  const fetchVideoUrl = async (tokenId) => {
    try {
      // Implement the logic to fetch the video URL for the given tokenId
      // For example, you can fetch the data from your smart contract's `nftData` function
      if (!ethereumClient) {
        return "DEFAULT_VIDEO_URL";
      }

      // Check if the user is connected to a wallet
      const isConnected = await checkWalletConnection();
      if (!isConnected) {
        return "DEFAULT_VIDEO_URL";
      }

      const nftContract = new ethereumClient.eth.Contract(abi, contractAddress);
      const nftDataFunction = nftContract.methods.nftData(tokenId);
      const nftData = await nftDataFunction.call();
      const videoUrl = `${baseIpfsUrl}${tokenId}.mp4`; // Append the token ID to the URL

      return videoUrl;
    } catch (error) {
      console.error("Error fetching video URL:", error);
      // Return a default or placeholder video URL in case of an error
      return "DEFAULT_VIDEO_URL";
    }
  };

  const fetchNFTData = async () => {
    let nfts = []; // Declare nfts here

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

      if (ownerTokenIds.length === 0) {
        setPopupMessage("You don't own any NFTs.");
        setShowPopup(true);
        return;
      }

      // Fetch the NFT data for each token ID
      for (const tokenIdWithN of ownerTokenIds) {
        const tokenId = tokenIdWithN.toString();
        const videoUrl = await fetchVideoUrl(tokenId);
        const nft = { tokenId, videoUrl, collectionName }; // Include collectionName in each nft object
        nfts.push(nft);

        // Add a delay of 1 second before fetching the next video URL
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Store the fetched NFT data in state
      setNFTsData(nfts);
      setShowPopup(true); // Display the fetched NFT data in the popup
    } catch (error) {
      console.error("Error fetching NFT data:", error);
      setPopupMessage("An error occurred while fetching your NFTs.");
      setShowPopup(true);
    }
  };

  useEffect(() => {
    fetchCollectionName();
    fetchOwnerTokenIds();
  }, [ethereumClient]);

  return (
    <div>
      <button className="btn btn--primary" onClick={fetchNFTData}>
        View Your NFTs
      </button>

      {showPopup && (
        <PopupMessageNFT message={popupMessage} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}

export default NFTsButton;
