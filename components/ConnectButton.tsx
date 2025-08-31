"use client";

import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";

export default function ConnectButton() {
  return (
    <RainbowConnectButton
      label="Conectar Wallet"
      accountStatus={{
        smallScreen: "avatar",
        largeScreen: "full",
      }}
      chainStatus={{
        smallScreen: "icon",
        largeScreen: "full",
      }}
      showBalance={{
        smallScreen: false,
        largeScreen: true,
      }}
    />
  );
}
