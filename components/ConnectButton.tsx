"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ConnectButton() {
  // Por ahora es solo visual, en el futuro integrará RainbowKit
  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary" className="text-xs">
        🔗 Demo Mode
      </Badge>
      <Button variant="outline" size="sm" disabled>
        Conectar Wallet
      </Button>
    </div>
  );
}
