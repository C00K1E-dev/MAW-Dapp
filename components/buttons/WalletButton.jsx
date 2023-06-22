import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import Link from "next/link";

const WalletButton = ({ children, clr, hrf = "/", contractAddress }) => {
  const [connected, setConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    checkConnectionStatus();
  }, []);

  async function checkConnectionStatus() {
    if (window.ethereum) {
      try {
        // Get provider and signer
        const provider = new Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Check if there is a connected account
        const accounts = await provider.listAccounts();
        const isConnected = accounts.length > 0;

        // Set state
        setProvider(provider);
        setAddress(isConnected ? accounts[0] : null);
        setConnected(isConnected);

        // Add event listener for disconnect and account changes
        window.ethereum.on("disconnect", handleDisconnect);
        window.ethereum.on("accountsChanged", function (accounts) {
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
      console.error("Metamask not detected");
    }
  }

  function handleDisconnect(error) {
    setConnected(false);
    setAddress(null);
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Get provider and signer
        const provider = new Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Get address
        const address = await signer.getAddress();

        // Set state
        setProvider(provider);
        setAddress(address);
        setConnected(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Metamask not detected");
    }
  }

  return (
    <Link href={hrf}>
      <a className={`btn ${clr || " btn--primary"}`} onClick={connected ? null : connectToMetamask}>
        {connected ? "Connected" : children}
      </a>
    </Link>
  );
};

export default WalletButton;
