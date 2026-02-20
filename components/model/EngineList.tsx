import { Engine } from "@/lib/types/model";
import { FUEL_LABELS, groupEnginesByFuel } from "@/lib/utils/engines";

type Props = {
  engines: Engine[];
};

export default function EngineList({ engines }: Props) {
  const grouped = groupEnginesByFuel(engines);
  if (Object.keys(grouped).length === 0) return null;

  return (
    <>
      {Object.entries(grouped).map(([fuelType, group]) => (
        <div key={fuelType} className="flex flex-col gap-2">
          <p className="text-sm font-bold uppercase tracking-wider opacity-50">
            {FUEL_LABELS[fuelType as Engine["fuelType"]]}
          </p>
          <div className="flex flex-col gap-1">
            {group.map((engine) => (
              <div key={engine.name} className="flex items-center justify-between">
                <span>{engine.name}</span>
                {engine.power && (
                  <span className="opacity-40 text-sm italic">{engine.power} hp</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
