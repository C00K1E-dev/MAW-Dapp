import React from 'react';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';
import { Web3Button } from '@web3modal/react';

const chains = [arbitrum, mainnet, polygon];
const projectId = 'aca932c97e3f9bc59a1636dc1aeae670';

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function Web3ConnectButton() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Web3Button label="Connect Wallet" balance="show"  />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default Web3ConnectButton;
