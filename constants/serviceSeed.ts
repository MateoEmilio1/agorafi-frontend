export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  area: string;
  provider: string;
  providerAlias: string;
  publicBaseFrom?: number;
}

export const servicesSeed: Service[] = [
  {
    id: "1",
    title: "Cambio de cuerito de canilla",
    description:
      "Reemplazo profesional de cuerito de canilla que gotea. Incluye materiales y mano de obra.",
    category: "Plomería",
    area: "CABA - Palermo",
    provider: "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8C",
    providerAlias: "PlomeroExpert",
    publicBaseFrom: 2500,
  },
  {
    id: "2",
    title: "Revisión de tablero eléctrico",
    description:
      "Inspección completa del tablero eléctrico, verificación de conexiones y reporte de estado.",
    category: "Electricidad",
    area: "CABA - Villa Crespo",
    provider: "0x8ba1f109551bD432803012645Hac136c30C6213f",
    providerAlias: "ElectroTech",
    publicBaseFrom: 4000,
  },
  {
    id: "3",
    title: "Pintura de pared interior",
    description:
      "Pintado profesional de pared interior (hasta 15m²). Incluye preparación de superficie y pintura.",
    category: "Pintura",
    area: "CABA - Recoleta",
    provider: "0x1234567890123456789012345678901234567890",
    providerAlias: "PintorPro",
    publicBaseFrom: 8000,
  },
  {
    id: "4",
    title: "Reparación de mueble de cocina",
    description:
      "Arreglo de bisagras, ajuste de puertas y restauración menor de muebles de cocina.",
    category: "Carpintería",
    area: "CABA - San Telmo",
    provider: "0x9876543210987654321098765432109876543210",
    providerAlias: "CarpinteroMaster",
    publicBaseFrom: 3500,
  },
  {
    id: "5",
    title: "Revisión de calefón a gas",
    description:
      "Mantenimiento preventivo de calefón a gas, limpieza y verificación de funcionamiento.",
    category: "Gas",
    area: "CABA - Belgrano",
    provider: "0x5555555555555555555555555555555555555555",
    providerAlias: "GasSeguro",
    publicBaseFrom: 5500,
  },
];
