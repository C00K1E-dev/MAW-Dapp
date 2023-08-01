import '../styles/globals.css';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, avalanche, bscTestnet, mainnet, polygon } from 'wagmi/chains';
import { Web3Modal } from '@web3modal/react';

const chains = [arbitrum, mainnet, polygon, bscTestnet, avalanche];
const projectId = 'aca932c97e3f9bc59a1636dc1aeae670';

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function MyApp({ Component, pageProps }) {
  return (
    
      <WagmiConfig config={wagmiConfig}>
        <Web3Modal
          themeMode="dark"
          themeVariables={{
            '--w3m-logo-image-url': './images/walletlogo.png',
            '--w3m-overlay-backdrop-filter': 'blur(5px)',
            '--w3m-overlay-background-color': 'rgba(0, 0, 0, 0.1)',
            '--w3m-background-color': '#0adab9',
            '--w3m-accent-fill-color': '#1a1f2c',
            '--w3m-accent-color': '#0adab9',
            '--w3m-font-family': 'jost',
          }}
          projectId={projectId}
          ethereumClient={ethereumClient}
        />
        <Component {...pageProps} />
      </WagmiConfig>
    
  );
}

export default MyApp;
