import { FacelifChanges } from "@/lib/types/model";
import EngineList from "@components/model/EngineList";

type Props = {
  facelift: FacelifChanges;
};

export default function FaceliftSection({ facelift }: Props) {
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
