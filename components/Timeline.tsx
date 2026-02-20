import { Model } from "@/lib/types/model";
import TimelineItem from "@components/TimelineItem";

type Props = {
  models: Model[];
  brandName: string;
};

export default function Timeline({ models, brandName }: Props) {
  if (models.length === 0) {
    return (
      <p className="text-center opacity-40 italic py-20">
        No models available yet.
      </p>
    );
  }

  return (
    <div className="relative py-12 px-8 max-w-5xl mx-auto">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-foreground/20 -translate-x-1/2" />

      <div className="flex flex-col gap-16">
        {models.map((model, index) => (
          <TimelineItem
            key={`${model.name}-gen${model.generation ?? 0}-${model.facelift ? "facelift" : "base"}`}
            model={model}
            brandName={brandName}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
