import { fetchModels } from "@/lib/fetchers/models";
import { Engine, FacelifChanges } from "@/lib/types/model";
import { toRoman } from "@/lib/utils/roman";
import brands from "@data/brands.json";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string; modelId: string }>;
};

const FUEL_LABELS: Record<Engine["fuelType"], string> = {
  petrol: "Petrol",
  diesel: "Diesel",
  hybrid: "Hybrid",
  phev: "Plug-in Hybrid",
  electric: "Electric",
};

const FUEL_ORDER: Engine["fuelType"][] = [
  "petrol",
  "diesel",
  "hybrid",
  "phev",
  "electric",
];

function groupEnginesByFuel(engines: Engine[]): Record<string, Engine[]> {
  return FUEL_ORDER.reduce<Record<string, Engine[]>>((acc, fuelType) => {
    const group = engines.filter((e) => e.fuelType === fuelType);
    if (group.length > 0) acc[fuelType] = group;
    return acc;
  }, {});
}

function EngineList({ engines }: { engines: Engine[] }) {
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

function FaceliftSection({ facelift }: { facelift: FacelifChanges }) {
  const hasChanges =
    (facelift.addedEngines?.length ?? 0) > 0 ||
    (facelift.removedEngines?.length ?? 0) > 0;
  if (!hasChanges) return null;

  return (
    <div className="flex flex-col gap-4 border-l-2 border-foreground/20 pl-5">
      <h2 className="text-xs uppercase tracking-widest opacity-40">
        Facelift — {facelift.releaseDate}
      </h2>

      {facelift.addedEngines && facelift.addedEngines.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold uppercase tracking-wider opacity-50">Added</p>
          <EngineList engines={facelift.addedEngines} />
        </div>
      )}

      {facelift.removedEngines && facelift.removedEngines.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold uppercase tracking-wider opacity-50">Removed</p>
          <div className="flex flex-col gap-1">
            {facelift.removedEngines.map((name) => (
              <span key={name} className="opacity-50 line-through">{name}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default async function ModelPage({ params }: Props) {
  const { id, modelId } = await params;

  const brand = brands.find((b) => b.id === id);
  if (!brand) notFound();

  const models = await fetchModels(id);
  const model = models.find((m) => m.id === modelId);
  if (!model) notFound();

  const enginesByFuel = groupEnginesByFuel(model.engines ?? []);

  return (
    <main className="min-h-screen pb-24">
      <div className="max-w-2xl mx-auto px-8 pt-16">
        <Link
          href={`/brands/${id}`}
          className="text-sm opacity-40 hover:opacity-100 transition-opacity"
        >
          ← Back to {brand.name}
        </Link>

        <div className="mt-12 flex flex-col gap-6">
          {/* Image */}
          <div className="w-full h-64 bg-foreground/10 rounded-sm overflow-hidden flex items-center justify-center">
            {model.imagePath ? (
              <Image
                src={`/images/${model.imagePath}`}
                alt={`${brand.name} ${model.name}`}
                width={672}
                height={256}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-7xl opacity-10 font-bold">{model.name}</span>
            )}
          </div>

          {/* Header */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h1 className="text-5xl font-bold">
                {brand.name} {model.name}
              </h1>
              {model.generation !== undefined && (
                <span className="text-sm uppercase tracking-widest border border-foreground/30 px-2 py-1 rounded-sm opacity-60">
                  Gen {toRoman(model.generation)}
                </span>
              )}
              {model.facelift && (
                <span className="text-sm uppercase tracking-widest border border-foreground/30 px-2 py-1 rounded-sm opacity-60">
                  Facelift
                </span>
              )}
            </div>
            <p className="text-lg opacity-50 italic">
              {model.releaseDate}
              {model.endDate ? ` – ${model.endDate}` : " – present"}
            </p>
          </div>

          <div className="w-full h-px bg-foreground/15" />

          {/* Body styles */}
          {model.bodyStyles && model.bodyStyles.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="text-xs uppercase tracking-widest opacity-40">
                Body styles
              </h2>
              <div className="flex flex-wrap gap-2">
                {model.bodyStyles.map((style) => (
                  <span
                    key={style.type}
                    className="border border-foreground/20 px-3 py-1 text-sm rounded-sm"
                  >
                    {style.type}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Engines at launch */}
          {Object.keys(enginesByFuel).length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xs uppercase tracking-widest opacity-40">
                Engines at launch
              </h2>
              <EngineList engines={model.engines ?? []} />
            </div>
          )}

          {/* Facelift changes */}
          {model.facelifts?.map((facelift) => (
            <FaceliftSection key={facelift.releaseDate} facelift={facelift} />
          ))}
        </div>
      </div>
    </main>
  );
}
