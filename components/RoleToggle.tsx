"use client";

import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function RoleToggle() {
  const { state, toggleRole } = useApp();

  return (
    <div className="flex items-center gap-3">
      <Badge
        variant={state.currentRole === "CLIENT" ? "default" : "secondary"}
        className="text-xs"
      >
        {state.currentRole === "CLIENT" ? "👤 Cliente" : "🔧 Proveedor"}
      </Badge>

      <Button
        onClick={toggleRole}
        variant="outline"
        size="sm"
        className="text-xs bg-transparent"
      >
        Cambiar a {state.currentRole === "CLIENT" ? "Proveedor" : "Cliente"}
      </Button>

      <div className="text-xs text-muted-foreground">
        <span className="font-mono">{state.currentUser.alias}</span>
      </div>
    </div>
  );
}
