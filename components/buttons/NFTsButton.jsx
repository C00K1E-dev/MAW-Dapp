import React, { useState, useEffect } from "react";
import PopupMessageNFT from "../PopupMessageNFT";
import { useAccount, useContractRead } from "wagmi";
import { testabi, NFT_CONTRACT_ADDRESS } from "../contracts/1stCollection";

const abi = testabi;
const contractAddress = NFT_CONTRACT_ADDRESS;
const baseIpfsUrl = "https://silver-elegant-aphid-155.mypinata.cloud/ipfs/QmYLXeozAax14dbx2taDRgp3NC8RA9oVTYQvXuCvQRUx7Q/";

const NFTsButton = ({ ethereumClient }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [nftsData, setNftsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { address, isConnected } = useAccount();

  // Define the contract and the functions you want to call
  const nftContract = {
    address: contractAddress,
    abi: abi,
  };

  const getCollectionName = {
    ...nftContract,
    functionName: "name",
    args: [],
  };

  const getOwnerTokenIds = (ownerAddress) => ({
    ...nftContract,
    functionName: "getTokenIdsByOwner",
    args: [ownerAddress],
  });

  // Fetch collection name using useContractRead
  const { data: collectionNameData } = useContractRead(getCollectionName);
  const { data: ownedTokenIdsData } = useContractRead(getOwnerTokenIds(address));


  const fetchNFTData = async () => {
    try {
      if (!address) {
        setPopupMessage("Please connect your wallet first.");
        setShowPopup(true);
        setLoading(false);
        return;
      }

      // Fetch and set the NFT data
      const nfts = await Promise.all(
        ownedTokenIdsData.map(async (tokenId) => {
          const videoUrl = await fetchVideoUrl(tokenId);
          return { tokenId, videoUrl, collectionName: collectionNameData };
        })
      );

      console.log(nfts)

      setNftsData(nfts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching NFT data:", error);
      setPopupMessage("An error occurred while fetching your NFTs.");
      setShowPopup(true);
      setLoading(false);
    }
  };

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

  useEffect(() => {
    if (collectionNameData) {
      setCollectionName(collectionNameData);
    }
  }, [collectionNameData]);

  const handleButtonClick = async () => {
    if (!address) {
      setPopupMessage("Please connect your wallet first.");
      setShowPopup(true);
      return;
    }

    if (!ownedTokenIdsData || ownedTokenIdsData.length === 0) {
      setPopupMessage("You don't own any NFTs.");
      setShowPopup(true);
      return;
    }

    

    setShowPopup(true);
    setLoading(true); // Reset loading state before fetching NFT data
    await fetchNFTData();
  };

  useEffect(() => {
    if (address && isConnected && ownedTokenIdsData) {
      setLoading(true); // Reset loading state before fetching NFT data
      fetchNFTData();
    }
  }, [address, isConnected, ownedTokenIdsData]);

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

  return (
    <div>
      <button className="btn btn--primary" onClick={handleButtonClick}>
        View Your NFTs
      </button>

      {showPopup && (
        <PopupMessageNFT message={popupMessage} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default NFTsButton;
