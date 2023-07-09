import React from "react";
import Navbar from "./components/Navbar";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { polygon, polygonMumbai, arbitrum } from "wagmi/chains";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import Minter from "./components/Minter";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const { chains, provider } = configureChains(
  [polygon, arbitrum, polygonMumbai],
  [
    jsonRpcProvider({
      rpc: (chainId) => {
        if (chainId.id == 137) {
          return {
            http: "https://polygon-mainnet.g.alchemy.com/v2/ZLSEk8HyDPO8GF7NmrIZpRxxxKAY1zgr",
          };
        } else if (chainId.id == 42161) {
          return {
            http: "https://arb-mainnet.g.alchemy.com/v2/eCm1C8c0ke-nbr-n7sZ9S_UUovDTlTV6",
          };
        } else if (chainId.id == 80001) {
          return {
            http: "https://polygon-mumbai.g.alchemy.com/v2/EaKu789oxhWzYFvzEzOPAkCqIl2CwKj5",
          };
        }
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "c0b87a741558f262a9b652a396a3adc4",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = () => {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <div className="container mx-auto">
            <ToastContainer />
            <Navbar />
            <Minter />
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
};

export default App;
