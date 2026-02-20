import { BASE_URL } from "@/lib/config";
import { Brand } from "@/lib/types/brand";

export async function fetchBrands(): Promise<Brand[]> {
  const res = await fetch(`${BASE_URL}/api/brands`, {
    next: { revalidate: 86400 },
  });
  const brands: Brand[] = await res.json();
  return brands;
}
