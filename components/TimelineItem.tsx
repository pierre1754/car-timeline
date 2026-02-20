import { Model } from "@/lib/types/model";
import { toRoman } from "@/lib/utils/roman";
import Image from "next/image";

type Props = {
  model: Model;
  brandName: string;
  index: number;
};

export default function TimelineItem({ model, brandName, index }: Props) {
  const isLeft = index % 2 === 0;
  const isFacelift = model.facelift === true;

  const card = (
    <div
      className={`flex flex-col gap-2 ${isFacelift ? "w-64" : "w-80"} ${isLeft ? "items-end text-right" : "items-start text-left"}`}
    >
      <div
        className={`w-full ${isFacelift ? "h-32" : "h-44"} bg-foreground/10 rounded-sm overflow-hidden flex items-center justify-center`}
      >
        {model.imagePath ? (
          <Image
            src={`/images/${model.imagePath}`}
            alt={`${brandName} ${model.name}`}
            width={320}
            height={176}
            className="w-full h-full object-cover"
          />
        ) : (
          <span
            className={`${isFacelift ? "text-3xl" : "text-5xl"} opacity-10 font-bold`}
          >
            {model.name}
          </span>
        )}
      </div>

      <div>
        <div
          className={`flex items-center gap-2 ${isLeft ? "flex-row-reverse" : "flex-row"}`}
        >
          <h3 className={`${isFacelift ? "text-xl" : "text-2xl"} font-bold`}>
            {brandName} {model.name}
          </h3>
          {isFacelift && (
            <span className="text-xs uppercase tracking-widest border border-foreground/30 px-2 py-0.5 rounded-sm opacity-60">
              Facelift
            </span>
          )}
        </div>

        {model.generation !== undefined && (
          <p className={`${isFacelift ? "text-sm" : "text-base"} opacity-40 font-bold uppercase tracking-wider`}>
            Gen {toRoman(model.generation)}
          </p>
        )}

        <p className={`${isFacelift ? "text-sm" : "text-base"} opacity-50 italic`}>
          {model.releaseDate}
          {model.endDate ? ` – ${model.endDate}` : " – present"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex items-center w-full">
      <div className="flex w-1/2 justify-end pr-10">{isLeft && card}</div>

      <div
        className={`shrink-0 rounded-full bg-foreground z-10 ${isFacelift ? "w-2.5 h-2.5 opacity-50" : "w-4 h-4"}`}
      />

      <div className="flex w-1/2 justify-start pl-10">{!isLeft && card}</div>
    </div>
  );
}
