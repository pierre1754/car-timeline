import { Model } from "@/lib/types/model";

export async function useModels(brandId: string): Promise<Model[]> {
  const res = await fetch(
    `http://localhost:3000/api/brands/${brandId}/models`,
    { next: { revalidate: 86400 } },
  );

  if (!res.ok) return [];

  const models: Model[] = await res.json();
  return models;
}
