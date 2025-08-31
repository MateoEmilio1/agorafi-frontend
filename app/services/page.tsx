"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RoleToggle from "@/components/RoleToggle";
import ConnectButton from "@/components/ConnectButton";

export default function ServicesPage() {
  const router = useRouter();
  const { state, createOrder } = useApp();

  const handleHire = (serviceId: string) => {
    createOrder(serviceId);
    router.push(`/order/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="text-muted-foreground hover:text-foreground"
            >
              ← Inicio
            </Button>
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">
                🔒
              </span>
            </div>
            <h1 className="text-lg font-semibold">Agorafi</h1>
          </div>

          <div className="flex items-center gap-4">
            <RoleToggle />
            <ConnectButton />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Servicios Disponibles</h1>
          <p className="text-muted-foreground">
            Encuentra profesionales verificados para tus proyectos. Pagos
            confidenciales con escrow seguro.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {state.services.map((service) => (
            <Card
              key={service.id}
              className="hover:shadow-lg transition-shadow border-2 hover:border-primary/20"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-lg leading-tight text-balance">
                    {service.title}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="text-xs whitespace-nowrap"
                  >
                    {service.category}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground text-balance">
                  {service.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">📍</span>
                    <span>{service.area}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">👤</span>
                    <span className="font-mono text-xs">
                      {service.providerAlias}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      ({service.provider.slice(0, 6)}...
                      {service.provider.slice(-4)})
                    </span>
                  </div>
                </div>

                {service.publicBaseFrom && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">
                      Precio referencial desde
                    </p>
                    <p className="text-lg font-semibold">
                      ${service.publicBaseFrom.toLocaleString()}
                    </p>
                  </div>
                )}

                <Button
                  onClick={() => handleHire(service.id)}
                  className="w-full"
                  size="lg"
                >
                  Contratar Servicio
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Demo Notice */}
        <div className="text-center pt-8">
          <Badge variant="outline" className="text-xs px-4 py-2">
            🧪 Demo: {state.services.length} servicios ficticios • Estado en
            memoria
          </Badge>
        </div>
      </main>
    </div>
  );
}
