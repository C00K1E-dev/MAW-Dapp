import React, { useState, useEffect } from "react";
import PopupMessageNFT from "../PopupMessageNFT";
import { readContract } from "wagmi/actions";
import { useAccount } from 'wagmi';
import { abi1, NFT_CONTRACT_ADDRESS1 } from "../contracts/1stCollection";
import { vipabi, VIP_CONTRACT_ADDRESS } from "../contracts/VIP";

const baseIpfsUrl1stCollection = "https://silver-elegant-aphid-155.mypinata.cloud/ipfs/QmcjALMQb2m9uVCGPECJTMhCmFx4J5D6piiCdyUadSoDYU/";
const baseIpfsUrlVIP = "https://silver-elegant-aphid-155.mypinata.cloud/ipfs/QmPsAaaXzzpxJGbaBp8kPDAAUsRWeunHwvhxX83dVkyGWR/";

const NFTsButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [nftsData, setNftsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { address, isConnected } = useAccount();

  const nftContract1stCollection = {
    address: NFT_CONTRACT_ADDRESS1,
    abi: abi1,
    baseIpfsUrl: baseIpfsUrl1stCollection,
  };

  const nftContractVIP = {
    address: VIP_CONTRACT_ADDRESS,
    abi: vipabi,
    baseIpfsUrl: baseIpfsUrlVIP,
  };

  useEffect(() => {
    // Create the display content for the popup message
    if (nftsData.length > 0 && showPopup) {
      const nftsDisplay = nftsData.map((nft) => {
        // Construct the display content for each NFT
        return (
          <div key={nft.tokenId}>
            <p>Collection Name: {nft.collectionName}</p>
            <p>Token ID: {nft.tokenId.toString()}</p>
            <video controls width="320" height="240">
              <source src={nft.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      });

      // Show the popup with the NFTs data
      setPopupMessage(nftsDisplay);
    }
  }, [nftsData, showPopup]);

 const fetchNFTData = async (contract) => {
  try {
    console.log("Inside fetchNFTData");

    // Fetch contract data from the given collection
    const [name, balance, ownedTokenIdsData] = await Promise.all([
      readContract({
        address: contract.address,
        abi: contract.abi,
        functionName: 'name',
      }),
      readContract({
        address: contract.address,
        abi: contract.abi,
        functionName: 'balanceOf',
        args: [address],
      }),
      readContract({
        address: contract.address,
        abi: contract.abi,
        functionName: 'getOwnedTokenIds',
        args: [address],
      }),
    ]);

    console.log("Contract Data:", { name, balance });
    console.log("Owned Token IDs Data:", ownedTokenIdsData);

    // Handle contract NFTs
    if (!Array.isArray(ownedTokenIdsData)) {
      throw new Error("Contract: Owned Token IDs data is not an array.");
    }

    const nfts = ownedTokenIdsData.map((tokenId) => {
      const videoUrl = `${contract.baseIpfsUrl}${tokenId}.mp4`;
      return {
        tokenId: tokenId,
        videoUrl: videoUrl,
        collectionName: name,
      };
    });

    console.log("Contract NFTs:", nfts);

    setNftsData(nfts);
    setLoading(false);
    setShowPopup(true); // Show popup after data is fetched
  } catch (error) {
    console.error("Error fetching NFT data:", error);
    setPopupMessage("An error occurred while fetching your NFTs.");
    setShowPopup(true);
    setLoading(false);
  }
};

  const handleButtonClick = async () => {
    if (!address) {
      setPopupMessage("Please connect your wallet first.");
      setShowPopup(true);
      return;
    }

    setLoading(true);
    // Fetch NFTs for 1stCollection
    await fetchNFTData(nftContract1stCollection);
    // Fetch NFTs for VIP
    await fetchNFTData(nftContractVIP);
  };

  return (
    <div>
      {isConnected && (
        <button className="btn btn--primary" onClick={handleButtonClick}>
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
