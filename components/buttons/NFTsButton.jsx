import React, { useState, useEffect, useCallback } from "react";
import PopupMessageNFT from "../PopupMessageNFT";
import { useAccount, useContractRead } from "wagmi";
import { testabi, NFT_CONTRACT_ADDRESS } from "../contracts/1stCollection";

const abi = testabi;
const contractAddress = NFT_CONTRACT_ADDRESS;
const baseIpfsUrl = "https://bafybeihs4qgpvyutu3wdsc6kufy3z7lox5nwzetusso63snbfvhf2qw4fa.ipfs.nftstorage.link/";

const NFTsButton = ({ ethereumClient }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [nftsData, setNftsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { address, isConnected } = useAccount();

  const nftContract = {
    address: contractAddress,
    abi: abi,
  };

  const getCollectionName = {
    ...nftContract,
    functionName: "name",
    args: [],
  };

  const getOwnerTokenIds = useCallback((ownerAddress) => ({
    ...nftContract,
    functionName: "getTokenIdsByOwner",
    args: [ownerAddress],
  }), [nftContract]);

  const { data: collectionNameData } = useContractRead(getCollectionName);
  const { data: ownedTokenIdsData } = useContractRead(getOwnerTokenIds(address));

  const fetchNFTData = useCallback(async () => {
    try {
      if (!address) {
        setPopupMessage("Please connect your wallet first.");
        setShowPopup(true);
        setLoading(false);
        return;
      }

      if (!ownedTokenIdsData || ownedTokenIdsData.length === 0) {
        setPopupMessage("You don't own any NFTs.");
        setShowPopup(true);
        setLoading(false);
        return;
      }

      const fetchVideoUrl = async (tokenId) => {
        try {
          if (!address) {
            return "DEFAULT_VIDEO_URL";
          }

          const videoUrl = `${baseIpfsUrl}${tokenId}.mp4`;

          return videoUrl;
        } catch (error) {
          console.error("Error fetching video URL:", error);
          return "DEFAULT_VIDEO_URL";
        }
      };

      const nfts = await Promise.all(
        ownedTokenIdsData.map(async (tokenId) => {
          const videoUrl = await fetchVideoUrl(tokenId);
          return { tokenId, videoUrl, collectionName: collectionNameData };
        })
      );

      setNftsData(nfts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching NFT data:", error);
      setPopupMessage("An error occurred while fetching your NFTs.");
      setShowPopup(true);
      setLoading(false);
    }
  }, [address, ownedTokenIdsData, collectionNameData]);

  useEffect(() => {
    if (collectionNameData) {
      setCollectionName(collectionNameData);
    }
  }, [collectionNameData]);

  const handleButtonClick = () => {
    setShowPopup(true);
    fetchNFTData();
  };

  useEffect(() => {
    if (address && isConnected && ownedTokenIdsData) {
      setLoading(true);
      fetchNFTData();
    }
  }, [address, isConnected, ownedTokenIdsData, fetchNFTData]);

  useEffect(() => {
    if (showPopup && nftsData.length > 0) {
      const nftsDisplay = nftsData.map((nft) => (
        <div key={nft.tokenId}>
          <p>Collection Name: {nft.collectionName}</p>
          <p>Token ID: {nft.tokenId.toString()}</p>
          <video controls width="320" height="240">
            <source src={nft.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ));

      setPopupMessage(nftsDisplay);
    }
  }, [nftsData, showPopup]);

  return (
    <div>
      {!loading && address && isConnected ? (
        <button className="btn btn--primary" onClick={handleButtonClick}>
          View Your NFTs
        </button>
      ) : null}

      {showPopup && (
        <PopupMessageNFT message={popupMessage} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default NFTsButton;
