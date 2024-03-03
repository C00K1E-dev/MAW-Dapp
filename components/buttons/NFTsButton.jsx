import React, { useState, useEffect } from "react";
import PopupMessageNFT from "../PopupMessageNFT";
import { readContract } from "wagmi/actions";
import { useAccount } from 'wagmi';
import { testabi, NFT_CONTRACT_ADDRESS } from "../contracts/1stCollection";

const abi = testabi;
const contractAddress = NFT_CONTRACT_ADDRESS;
const baseIpfsUrl = "https://silver-elegant-aphid-155.mypinata.cloud/ipfs/QmcjALMQb2m9uVCGPECJTMhCmFx4J5D6piiCdyUadSoDYU/";

const NFTsButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [nftsData, setNftsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { address, isConnected,  } = useAccount();
  

  const nftContract = {
    address: contractAddress,
    abi: abi,
  };

  const fetchNFTData = async () => {
    try {
      console.log("Inside fetchNFTData");

      // Fetch contract data
      const [name, totalSupply, symbol, balance, getOwnedTokenIds] = await Promise.all([
        readContract({
          ...nftContract,
          functionName: 'name',
        }),
        readContract({
          ...nftContract,
          functionName: 'totalSupply',
        }),
        readContract({
          ...nftContract,
          functionName: 'symbol',
        }),
        readContract({
          ...nftContract,
          functionName: 'balanceOf',
          args: [address],
        }),
        readContract({
          ...nftContract,
          functionName: 'getOwnedTokenIds',
          args: [address],
        }),
      ]);

      console.log("Contract Data:", { name, totalSupply, symbol, balance, getOwnedTokenIds });

      const { data: collectionNameData } = await readContract(name);

      if (!collectionNameData || !name) {
        setPopupMessage("Could not fetch NFT data.");
        setShowPopup(true);
        setLoading(false);
        return;
      }

      const ownedTokenIdsData = getOwnedTokenIds || [];

      console.log("Owned Token IDs:", ownedTokenIdsData);

      const nfts = [];
      ownedTokenIdsData.forEach((tokenId) => {
        const videoUrl = `${baseIpfsUrl}${tokenId}.mp4`;
        nfts.push({
          tokenId: tokenId,
          videoUrl: videoUrl,
          collectionName: collectionNameData,
        });
      });

      console.log("NFTs:", nfts);

      setNftsData(nfts);
      setLoading(false);
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
    await fetchNFTData();
  };

  return (
    <div>
      {isConnected && (
        <button className="btn btn--primary" onClick={handleButtonClick}>
          View Your NFTs
        </button>
      )}

      {showPopup && (
        <div>
          {nftsData.length > 0 ? (
            nftsData.map((nft) => (
              <div key={nft.tokenId}>
                <p>Collection Name: {nft.collectionName}</p>
                <p>Token ID: {nft.tokenId.toString()}</p>
                <video controls width="320" height="240">
                  <source src={nft.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))
          ) : (
            <PopupMessageNFT message={popupMessage} onClose={() => setShowPopup(false)} />
          )}
        </div>
      )}
    </div>
  );
};

export default NFTsButton;
