import { BASE_URL } from "@/lib/config";
import { Model } from "@/lib/types/model";

export async function fetchModels(brandId: string): Promise<Model[]> {
  const res = await fetch(`${BASE_URL}/api/brands/${brandId}/models`, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) return [];

  const models: Model[] = await res.json();
  return models;
}
