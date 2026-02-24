import { fetchModels } from "@/lib/fetchers/models";
import { toRoman } from "@/lib/utils/roman";
import { groupEnginesByFuel } from "@/lib/utils/engines";
import brands from "@data/brands.json";
import Badge from "@components/ui/Badge";
import BackLink from "@components/ui/BackLink";
import Section from "@components/ui/Section";
import Image from "next/image";
import EngineList from "@components/model/EngineList";
import FaceliftSection from "@components/model/FaceliftSection";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string; modelId: string }>;
};

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
        <BackLink href={`/brands/${id}`}>Back to {brand.name}</BackLink>

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
                <Badge className="text-sm px-2 py-1">
                  Gen {toRoman(model.generation)}
                </Badge>
              )}
              {model.facelift && (
                <Badge className="text-sm px-2 py-1">Facelift</Badge>
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
            <Section title="Body styles">
              <div className="flex flex-wrap gap-2">
                {model.bodyStyles.map((style) => (
                  <Badge key={style.type} className="text-sm px-3 py-1">
                    {style.type}
                  </Badge>
                ))}
              </div>
            </Section>
          )}

          {/* Engines at launch */}
          {Object.keys(enginesByFuel).length > 0 && (
            <Section title="Engines at launch" gap="gap-4">
              <EngineList engines={model.engines ?? []} />
            </Section>
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
