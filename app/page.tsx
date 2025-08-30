"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RoleToggle from "@/components/RoleToggle";
import ConnectButton from "@/components/ConnectButton";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                🔒
              </span>
            </div>
            <h1 className="text-xl font-semibold">SecureWork</h1>
          </div>

          <div className="flex items-center gap-4">
            <RoleToggle />
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 py-16 text-center space-y-8">
        <div className="space-y-4">
          <Badge variant="secondary" className="text-sm px-4 py-2">
            🚀 MVP Demo - Pagos Confidenciales con FHE
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
            Marketplace de Servicios
            <span className="text-primary block">Confidenciales</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Contrata servicios profesionales con total privacidad. Los montos
            quedan cifrados en blockchain usando tecnología FHE.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardContent className="p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="font-semibold">Pagos Confidenciales</h3>
              <p className="text-sm text-muted-foreground">
                Los montos quedan cifrados. Nadie puede ver cuánto pagas excepto
                tú.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardContent className="p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-semibold">Escrow Seguro</h3>
              <p className="text-sm text-muted-foreground">
                Seña + diferencia protegidas hasta completar el servicio.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/20 transition-colors">
            <CardContent className="p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold">Sin Intermediarios</h3>
              <p className="text-sm text-muted-foreground">
                Conecta directamente con proveedores verificados.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="pt-8">
          <Button
            onClick={() => router.push("/services")}
            size="lg"
            className="text-lg px-8 py-6 rounded-xl"
          >
            Explorar Servicios
            <span className="ml-2">→</span>
          </Button>
        </div>

        {/* Demo Notice */}
        <div className="pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            🧪 <strong>Demo MVP:</strong> Datos en memoria • Montos simulados •
            Sin blockchain real
          </p>
        </div>
      </main>
    </div>
  );
}
