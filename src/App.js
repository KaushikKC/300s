import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Prediction from './pages/Prediction';
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { zkSync,zkSyncTestnet,sepolia,mainnet } from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const chain = [zkSync,zkSyncTestnet,sepolia,mainnet];

const { chains, publicClient, webSocketPublicClient } = configureChains(
  chain,
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '...',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})



function App() {
    return (
      <WagmiConfig config={config}>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Prediction />} />
        </Routes>
        </BrowserRouter>
        </WagmiConfig>
      
    );
  
}

export default App;
