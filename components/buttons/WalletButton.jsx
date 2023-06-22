import { useState, useEffect } from "react";
import { MetaMaskSDK } from "@metamask/sdk";
import Link from "next/link";

const WalletButton = ({ children, clr, hrf = "/", contractAddress }) => {
  const [connected, setConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);

  function handleEthereum() {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
      console.log("MetaMask successfully detected!");
      // Instantiate the MetaMask SDK
      const MMSDK = new MetaMaskSDK({ ethereum });

      // Get provider
      const provider = MMSDK.getProvider();

      // Check if there is a connected account
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          const isConnected = accounts.length > 0;

          // Set state
          setProvider(provider);
          setAddress(isConnected ? accounts[0] : null);
          setConnected(isConnected);
        })
        .catch((error) => {
          console.error(error);
        });

      // Add event listener for account changes
      provider.on("accountsChanged", function (accounts) {
        if (accounts.length === 0) {
          setConnected(false);
          setAddress(null);
        } else {
          setConnected(true);
          setAddress(accounts[0]);
        }
      });
    } else {
      console.log("Please install MetaMask!");
    }
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const { ethereum } = window;
  
        // Check if MetaMask is already connected
        if (ethereum.selectedAddress !== null) {
          console.log("MetaMask is already connected");
          return;
        }
  
        // Request account access
        await ethereum.request({ method: "eth_requestAccounts" });
  
        // Instantiate the MetaMask SDK
        const MMSDK = new MetaMaskSDK({ ethereum });
  
        // Get provider
        const provider = MMSDK.getProvider();
  
        // Get address
        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });
  
        const address = accounts[0];
  
        // Set state
        setProvider(provider);
        setAddress(address);
        setConnected(true);
  
        // Add event listener for account changes
        provider.on("accountsChanged", function (accounts) {
          if (accounts.length === 0) {
            setConnected(false);
            setAddress(null);
          } else {
            setConnected(true);
            setAddress(accounts[0]);
          }
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("MetaMask not detected");
    }
  }

  return (
    <Link href={hrf}>
      <a
        className={`btn ${clr || " btn--primary"}`}
        onTouchStart={connected ? null : connectToMetamask}
        onClick={connectToMetamask} // Add onClick event handler
      >
        {connected ? "Connected" : children}
      </a>
    </Link>
  );
};

export default WalletButton;
