import { useState } from "react";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import Link from "next/link";

const WalletButton = ({ children, clr, hrf = "/", contractAddress }) => {
  const [connected, setConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        // Get provider and signer
        const provider = new Web3Provider(window.ethereum);
        const signer = provider.getSigner();
  
        // Get address
        const address = await signer.getAddress();
  
        // Set state
        setProvider(provider);
        setAddress(address);
        setConnected(true);
  
        // Add event listener for account changes
        window.ethereum.on('accountsChanged', function (accounts) {
          if (accounts.length === 0) {
            setConnected(false);
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

  return (
    <Link href={hrf}>
      <a className={`btn ${clr || " btn--primary"}`} onClick={connected ? null : connectToMetamask}>
        {connected ? "Connected" : children}
      </a>
    </Link>
  );
};

export default WalletButton;
