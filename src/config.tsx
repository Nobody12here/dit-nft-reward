import { WagmiProvider, createConfig, http } from "wagmi";
import { bsc, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from "react";

interface Web3ProviderProps {
  children: ReactNode;
}
export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [bsc,sepolia],
    transports: {
      // RPC URL for each chain
      [bsc.id]: http(
        `https://bnb-mainnet.g.alchemy.com/v2/"demm1uAdY6S0v_bLwu_B_mHUX5MtExmE`
      ),
      [sepolia.id]: http(
        `https://eth-sepolia.g.alchemy.com/v2/demm1uAdY6S0v_bLwu_B_mHUX5MtExmE`
      ),  
    },
    
    // Required API Keys
    walletConnectProjectId: "a184a3972bd373f81a425026c69e42c4",

    // Required App Info
    appName: "Your App Name",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
