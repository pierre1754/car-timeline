import { Engine } from "@/lib/types/model";

export const FUEL_LABELS: Record<Engine["fuelType"], string> = {
  petrol: "Petrol",
  diesel: "Diesel",
  hybrid: "Hybrid",
  phev: "Plug-in Hybrid",
  electric: "Electric",
};

export const FUEL_ORDER: Engine["fuelType"][] = [
  "petrol",
  "diesel",
  "hybrid",
  "phev",
  "electric",
];

export function groupEnginesByFuel(engines: Engine[]): Record<string, Engine[]> {
  return FUEL_ORDER.reduce<Record<string, Engine[]>>((acc, fuelType) => {
    const group = engines.filter((e) => e.fuelType === fuelType);
    if (group.length > 0) acc[fuelType] = group;
    return acc;
  }, {});
}
