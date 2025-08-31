"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import RoleToggle from "@/components/RoleToggle";
import ConnectButton from "@/components/ConnectButton";

const statusConfig = {
  CREATED: {
    label: "Orden Creada",
    color: "bg-yellow-500",
    icon: "📝",
    description: "Esperando depósito de seña",
  },
  DOWNPAYED: {
    label: "Seña Depositada",
    color: "bg-blue-500",
    icon: "💰",
    description: "Esperando depósito de diferencia",
  },
  READY_TO_RELEASE: {
    label: "Listo para Liberar",
    color: "bg-green-500",
    icon: "✅",
    description: "Servicio completado, fondos listos",
  },
  RELEASED: {
    label: "Fondos Liberados",
    color: "bg-emerald-600",
    icon: "🎉",
    description: "Pago completado exitosamente",
  },
  REFUNDED: {
    label: "Reembolsado",
    color: "bg-gray-500",
    icon: "↩️",
    description: "Fondos devueltos al cliente",
  },
};

export default function OrderPage() {
  const router = useRouter();
  const params = useParams();
  const { state, updateOrderStatus } = useApp();
  const [downPaymentAmount, setDownPaymentAmount] = useState("");
  const [remainingAmount, setRemainingAmount] = useState("");

  const serviceId = params.serviceId as string;
  const service = state.services.find((s) => s.id === serviceId);
  const order = state.orders.find((o) => o.serviceId === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Servicio no encontrado</p>
            <Button onClick={() => router.push("/services")} className="mt-4">
              Volver a Servicios
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Orden no encontrada</p>
            <Button onClick={() => router.push("/services")} className="mt-4">
              Volver a Servicios
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusInfo = statusConfig[order.status];
  const isClient = state.currentRole === "CLIENT";
  const isProvider = state.currentRole === "PROVIDER";

  const handleDownPayment = () => {
    const amount = Number.parseFloat(downPaymentAmount);
    if (amount > 0) {
      updateOrderStatus(order.id, "DOWNPAYED", { downPayment: amount });
      setDownPaymentAmount("");
    }
  };

  const handleRemainingPayment = () => {
    const amount = Number.parseFloat(remainingAmount);
    if (amount > 0) {
      const total = (order.downPaymentAmount || 0) + amount;
      updateOrderStatus(order.id, "READY_TO_RELEASE", {
        remaining: amount,
        total,
      });
      setRemainingAmount("");
    }
  };

  const handleRelease = () => {
    updateOrderStatus(order.id, "RELEASED");
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
              onClick={() => router.push("/services")}
              className="text-muted-foreground hover:text-foreground"
            >
              ← Servicios
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

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Order Status */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                <span className="text-2xl">{statusInfo.icon}</span>
                <div>
                  <h1 className="text-2xl">{statusInfo.label}</h1>
                  <p className="text-sm text-muted-foreground font-normal">
                    {statusInfo.description}
                  </p>
                </div>
              </CardTitle>
              <Badge className={`${statusInfo.color} text-white`}>
                {order.status}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Service Details */}
        <Card>
          <CardHeader>
            <CardTitle>Detalles del Servicio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>

            <Separator />

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-muted-foreground">Categoría</Label>
                <p className="font-medium">{service.category}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Zona</Label>
                <p className="font-medium">{service.area}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Proveedor</Label>
                <p className="font-medium font-mono">{service.providerAlias}</p>
                <p className="text-xs text-muted-foreground">
                  {service.provider.slice(0, 10)}...{service.provider.slice(-8)}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Cliente</Label>
                <p className="font-medium font-mono">{order.clientAlias}</p>
                <p className="text-xs text-muted-foreground">
                  {order.clientAddress.slice(0, 10)}...
                  {order.clientAddress.slice(-8)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Flow */}
        {isClient && (
          <Card>
            <CardHeader>
              <CardTitle>Flujo de Pago Confidencial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Down Payment */}
              <div
                className={`p-4 rounded-lg border-2 ${
                  order.status === "CREATED"
                    ? "border-primary bg-primary/5"
                    : order.downPaymentAmount
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span>1️⃣</span> Depositar Seña
                  </h4>
                  {order.downPaymentAmount && (
                    <Badge variant="secondary">
                      🔒 ${order.downPaymentAmount.toLocaleString()}
                    </Badge>
                  )}
                </div>

                {order.status === "CREATED" ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="downPayment">
                        Monto de Seña (será cifrado)
                      </Label>
                      <Input
                        id="downPayment"
                        type="number"
                        placeholder="Ej: 1000"
                        value={downPaymentAmount}
                        onChange={(e) => setDownPaymentAmount(e.target.value)}
                      />
                    </div>
                    <Button
                      onClick={handleDownPayment}
                      disabled={
                        !downPaymentAmount ||
                        Number.parseFloat(downPaymentAmount) <= 0
                      }
                      className="w-full"
                    >
                      🔐 Depositar Seña Cifrada
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    ✅ Seña depositada y cifrada en blockchain
                  </p>
                )}
              </div>

              {/* Step 2: Remaining Payment */}
              <div
                className={`p-4 rounded-lg border-2 ${
                  order.status === "DOWNPAYED"
                    ? "border-primary bg-primary/5"
                    : order.remainingAmount
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span>2️⃣</span> Depositar Diferencia
                  </h4>
                  {order.remainingAmount && (
                    <Badge variant="secondary">
                      🔒 ${order.remainingAmount.toLocaleString()}
                    </Badge>
                  )}
                </div>

                {order.status === "DOWNPAYED" ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="remaining">
                        Monto Restante (será cifrado)
                      </Label>
                      <Input
                        id="remaining"
                        type="number"
                        placeholder="Ej: 1500"
                        value={remainingAmount}
                        onChange={(e) => setRemainingAmount(e.target.value)}
                      />
                    </div>
                    <Button
                      onClick={handleRemainingPayment}
                      disabled={
                        !remainingAmount ||
                        Number.parseFloat(remainingAmount) <= 0
                      }
                      className="w-full"
                    >
                      🔐 Depositar Diferencia Cifrada
                    </Button>
                  </div>
                ) : order.status === "CREATED" ? (
                  <p className="text-sm text-muted-foreground">
                    ⏳ Primero deposita la seña
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    ✅ Diferencia depositada y cifrada
                  </p>
                )}
              </div>

              {/* Step 3: Release */}
              <div
                className={`p-4 rounded-lg border-2 ${
                  order.status === "READY_TO_RELEASE"
                    ? "border-primary bg-primary/5"
                    : order.status === "RELEASED"
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <span>3️⃣</span> Liberar Fondos
                  </h4>
                  {order.totalAmount && (
                    <Badge variant="secondary">
                      🔒 Total: ${order.totalAmount.toLocaleString()}
                    </Badge>
                  )}
                </div>

                {order.status === "READY_TO_RELEASE" ? (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      El servicio está completo. Libera los fondos al proveedor.
                    </p>
                    <Button
                      onClick={handleRelease}
                      className="w-full"
                      variant="default"
                    >
                      💸 Liberar Todos los Fondos
                    </Button>
                  </div>
                ) : order.status === "RELEASED" ? (
                  <p className="text-sm text-muted-foreground">
                    🎉 Fondos liberados exitosamente al proveedor
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    ⏳ Completa los pasos anteriores
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Provider View */}
        {isProvider && (
          <Card>
            <CardHeader>
              <CardTitle>Vista del Proveedor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Estado del Escrow</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Seña recibida:</span>
                    <span>
                      {order.downPaymentAmount ? "🔒 Cifrado" : "❌ Pendiente"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Diferencia recibida:</span>
                    <span>
                      {order.remainingAmount ? "🔒 Cifrado" : "❌ Pendiente"}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total disponible:</span>
                    <span>
                      {order.totalAmount
                        ? `🔒 ${order.totalAmount.toLocaleString()}`
                        : "❌ Pendiente"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  • Los montos están cifrados con FHE - solo tú podrás verlos
                  una vez liberados
                </p>
                <p>
                  • El cliente debe completar el pago antes de que puedas
                  acceder a los fondos
                </p>
                <p>
                  • Una vez liberados, los fondos se transferirán
                  automáticamente a tu wallet
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Success State */}
        {order.status === "RELEASED" && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center space-y-4">
              <div className="text-4xl">🎉</div>
              <h3 className="text-xl font-semibold text-green-800">
                ¡Transacción Completada!
              </h3>
              <p className="text-green-700">
                Los fondos han sido liberados exitosamente.
                {isClient && " Gracias por usar Agorafi."}
                {isProvider && " Los fondos están en camino a tu wallet."}
              </p>
              <Button
                onClick={() => router.push("/services")}
                variant="outline"
                className="border-green-300 text-green-800 hover:bg-green-100"
              >
                Volver a Servicios
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
