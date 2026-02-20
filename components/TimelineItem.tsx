import { Model } from "@/lib/types/model";
import Image from "next/image";

type Props = {
  model: Model;
  brandName: string;
  index: number;
};

export default function TimelineItem({ model, brandName, index }: Props) {
  const isLeft = index % 2 === 0;

  const card = (
    <div
      className={`flex flex-col gap-3 w-80 ${isLeft ? "items-end text-right" : "items-start text-left"}`}
    >
      <div className="w-full h-44 bg-foreground/10 rounded-sm overflow-hidden flex items-center justify-center">
        {model.imagePath ? (
          <Image
            src={`/images/${model.imagePath}`}
            alt={`${brandName} ${model.name}`}
            width={320}
            height={176}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-5xl opacity-10 font-bold">{model.name}</span>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold">
          {brandName} {model.name}
        </h3>
        <p className="text-base opacity-50 italic">
          {model.releaseDate}
          {model.endDate ? ` – ${model.endDate}` : " – present"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex items-center w-full">
      <div className="flex w-1/2 justify-end pr-10">{isLeft && card}</div>

      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-foreground z-10" />

      <div className="flex w-1/2 justify-start pl-10">{!isLeft && card}</div>
    </div>
  );
}
