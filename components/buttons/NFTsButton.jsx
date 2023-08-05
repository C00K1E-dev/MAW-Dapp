import React, { useState, useEffect } from "react";
import PopupMessageNFT from "../PopupMessageNFT";
import { useAccount } from "wagmi";
import { testabi, NFT_CONTRACT_ADDRESS } from "../contracts/1stCollection";
import Web3 from "web3"; // Import web3 library

const abi = testabi;
const contractAddress = NFT_CONTRACT_ADDRESS;
const baseIpfsUrl = "https://bafybeibdf2ow6opelj2xcfkrfgbrzz42bzruudwxemo3zb7rtdsmgo26ra.ipfs.dweb.link/";

const NFTsButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [ownerTokenIds, setOwnerTokenIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { address, isConnected } = useAccount();

  const fetchCollectionName = async () => {
    try {
      if (!isConnected) {
        return;
      }

      const web3 = new Web3(window.ethereum);
      const nftContract = new web3.eth.Contract(abi, contractAddress);
      const name = await nftContract.methods.name().call();
      setCollectionName(name);
    } catch (error) {
      console.error("Error fetching collection name:", error);
    }
  };

  const fetchOwnerTokenIds = async () => {
    try {
      if (!isConnected) {
        setOwnerTokenIds([]);
        setLoading(false);
        return;
      }

      const web3 = new Web3(window.ethereum);
      const nftContract = new web3.eth.Contract(abi, contractAddress);
      const accounts = await web3.eth.getAccounts();
      const ownerAddress = accounts[0];
      const tokenIds = await nftContract.methods.getTokenIdsByOwner(ownerAddress).call();
      setOwnerTokenIds(tokenIds);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching owner's token IDs:", error);
      setOwnerTokenIds([]);
      setLoading(false);
    }
  };

  const fetchVideoUrl = async (tokenId) => {
    try {
      if (!isConnected) {
        return "DEFAULT_VIDEO_URL";
      }

      const videoUrl = `${baseIpfsUrl}${tokenId}.mp4`;

      return videoUrl;
    } catch (error) {
      console.error("Error fetching video URL:", error);
      return "DEFAULT_VIDEO_URL";
    }
  };

  const fetchNFTData = async () => {
    let nfts = [];

    try {
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

      for (const tokenId of ownerTokenIds) {
        const videoUrl = await fetchVideoUrl(tokenId);
        const nft = { tokenId, videoUrl, collectionName };
        nfts.push(nft);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      const nftsDisplay = nfts.map((nft) => (
        <div key={nft.tokenId}>
          <p>Collection Name: {collectionName}</p>
          <p>Token ID: {nft.tokenId}</p>
          <video controls width="320" height="240">
            <source src={nft.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ));

      setPopupMessage(nftsDisplay);
      setShowPopup(true);
    } catch (error) {
      console.error("Error fetching NFT data:", error);
      setPopupMessage("An error occurred while fetching your NFTs.");
      setShowPopup(true);
    }
  };

  useEffect(() => {
    fetchCollectionName();
    if (isConnected) {
      fetchOwnerTokenIds();
    }
  }, [isConnected]);

  return (
    <div>
      {!loading && isConnected && (
        <button className="btn btn--primary" onClick={fetchNFTData}>
          View Your NFTs
        </button>
      )}

      {showPopup && (
        <PopupMessageNFT message={popupMessage} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default NFTsButton;
