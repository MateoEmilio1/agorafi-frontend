import type React from "react";
import type { Metadata } from "next";
import { AppProvider } from "@/context/AppContext";
import { Suspense } from "react";
import Web3Providers from "@/providers/Web3Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agorafi - Marketplace de Servicios Confidenciales",
  description:
    "Plataforma descentralizada para contratar servicios profesionales con pagos confidenciales y escrow seguro",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <Suspense fallback={null}>
          <Web3Providers>
            <AppProvider>{children}</AppProvider>
          </Web3Providers>
        </Suspense>
      </body>
    </html>
  );
}
