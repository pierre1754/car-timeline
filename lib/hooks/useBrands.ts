import { Brand } from "@/lib/types/brand";

export async function useBrands(): Promise<Brand[]> {
  const res = await fetch("http://localhost:3000/api/brands", { next: { revalidate: 86400 } });
  const brands: Brand[] = await res.json();

  return brands;
}
