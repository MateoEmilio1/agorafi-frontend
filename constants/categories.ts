export const categories = [
  "Plomería",
  "Electricidad",
  "Pintura",
  "Carpintería",
  "Gas",
  "Limpieza",
  "Jardinería",
  "Cerrajería",
] as const;

export type Category = (typeof categories)[number];
