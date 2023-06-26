import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { EthereumClient, WalletConnectProvider } from '@walletconnect/client';
import { Web3Modal, useWeb3Modal } from 'web3modal';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';

const chains = [arbitrum, mainnet, polygon];
const projectId = 'aca932c97e3f9bc59a1636dc1aeae670';

const { publicClient } = configureChains(chains);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    {
      name: 'walletconnect',
      provider: new WalletConnectProvider({
        rpc: { [mainnet.chainId]: mainnet.rpcUrls[0] }, // Replace with your desired chain configuration
        qrcodeModalOptions: {
          mobileLinks: ['metamask', 'trust', 'rainbow', 'argent'],
        },
        bridge: 'https://bridge.walletconnect.org',
        qrcode: true,
      }),
      default: true,
    },
  ],
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const Web3ConnectButton = () => {
  const { open, close } = useWeb3Modal();
  const [connected, setConnected] = useState(false);

  const handleConnect = async () => {
    try {
      await open();
    } catch (error) {
      console.error('Failed to connect', error);
    }
  };

  useEffect(() => {
    const updateConnectionStatus = (accounts) => {
      setConnected(accounts.length > 0);
    };

    const updateChainId = (chainId) => {
      window.location.reload();
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', updateConnectionStatus);
      window.ethereum.on('chainChanged', updateChainId);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', updateConnectionStatus);
        window.ethereum.removeListener('chainChanged', updateChainId);
      }
    };
  }, []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <Link href="#">
        <a
          className="btn btn--primary"
          onClick={!connected ? handleConnect : null}
          onTouchStart={!connected ? handleConnect : null}
        >
          {connected ? 'Connected' : 'Connect Wallet'}
        </a>
      </Link>
      <Web3Modal ethereumClient={ethereumClient} />
    </WagmiConfig>
  );
};

export default Web3ConnectButton;
