"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

const transports = {
  [mainnet.id]: process.env.NEXT_PUBLIC_RPC_MAINNET
    ? http(process.env.NEXT_PUBLIC_RPC_MAINNET)
    : http(), // público si no seteaste RPC
  [sepolia.id]: process.env.NEXT_PUBLIC_RPC_SEPOLIA
    ? http(process.env.NEXT_PUBLIC_RPC_SEPOLIA)
    : http(), // público si no seteaste RPC
};

const config = getDefaultConfig({
  appName: "Tu dApp",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet, sepolia],
  transports,
  ssr: true, // Next.js (SSR) ✅
});

export default function Web3Providers({ children }: { children: ReactNode }) {
  // Evitamos recrear QueryClient en cada render
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
