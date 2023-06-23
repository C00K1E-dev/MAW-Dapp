import { useState, useEffect } from "react";
import { MetaMaskSDK } from "@metamask/sdk";
import Link from "next/link";

const WalletButton = ({ children, clr, hrf = "/", contractAddress }) => {
  const [connected, setConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);

  async function connectToMetamask() {
    const userAgent = navigator.userAgent.toLowerCase();

    // Inform the user
    alert("We are attempting to open the MetaMask app. Please give permission if prompted.");

    if (/iphone|ipad|ipod/.test(userAgent)) {
      // Handling for iOS devices
      window.location.href = 'https://metamask.app.link/dapp/www.mintandwin.com/'; // Replace with actual iOS deep link
    } else if (/android/.test(userAgent)) {
      // Handling for Android devices
      window.location.href = 'https://metamask.app.link/dapp/www.mintandwin.com/'; // Replace with actual Android deep link
    } else if (window.ethereum) {
      try {
        const { ethereum } = window;

        // Check if MetaMask is already connected
        if (ethereum.selectedAddress !== null) {
          console.log("MetaMask is already connected");
          setConnected(true);
          setAddress(ethereum.selectedAddress);
          return;
        }

        // Request account access
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        const address = accounts[0];

        // Instantiate the MetaMask SDK
        const MMSDK = new MetaMaskSDK({ ethereum });

        // Get provider
        const provider = MMSDK.getProvider();

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

  async function disconnectFromMetamask() {
    if (provider) {
      provider.removeAllListeners("accountsChanged");
    }

    setAddress(null);
    setConnected(false);
  }

  return (
    <Link href={hrf}>
      <a
        className={`btn ${clr || "btn--primary"}`}
        onTouchStart={connected ? null : connectToMetamask}
        onClick={connected ? disconnectFromMetamask : connectToMetamask}
      >
        {connected ? "Connected" : children}
      </a>
    </Link>
  );
};

export default WalletButton;
