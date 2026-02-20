import { fetchBrands } from "@/lib/fetchers/brands";
import BrandImage from "@components/BrandImage";

export default async function Home() {
  const brands = await fetchBrands();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/background.png')] bg-cover bg-center bg-background bg-blend-multiply">
      <main className="min-h-screen w-full flex flex-col items-center justify-center gap-24">
        <h1 className="text-8xl uppercase font-bold">Select your car brand</h1>

        <ul className="flex flex-row gap-40">
          {brands.map((brand) => (
            <li key={brand.id}>
              <BrandImage brand={brand} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
