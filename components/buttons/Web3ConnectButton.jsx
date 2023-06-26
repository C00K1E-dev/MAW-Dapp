import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal, useWeb3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';

const chains = [arbitrum, mainnet, polygon];
const projectId = 'aca932c97e3f9bc59a1636dc1aeae670';

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 2, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const Web3ConnectButton = () => {
  const { open } = useWeb3Modal();
  const [connected, setConnected] = useState(false);

  const handleConnect = async () => {
    try {
      const provider = await open();
      setConnected(!!provider);
    } catch (error) {
      console.error("Failed to connect", error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setConnected(accounts.length > 0);
      });

      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);

  const handleClick = (event) => {
    if (!connected) {
      handleConnect();
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <Link href="#">
        <a
          className="btn btn--primary"
          onClick={handleClick}
          onTouchStart={handleClick}
        >
          {connected ? 'Connected' : 'Connect Wallet'}
        </a>
      </Link>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </WagmiConfig>
  );
};

export default Web3ConnectButton;
