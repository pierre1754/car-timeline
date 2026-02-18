import { useBrands } from "@/lib/hooks/useBrands";
import BrandImage from "@components/BrandImage";
import Image from "next/image";

export default function Home() {
  const brands = useBrands();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/background.png')] bg-cover">
      <main className="min-h-screen w-full flex flex-col items-center justify-center gap-24">
        <h1 className="text-8xl uppercase font-bold">Select your car brand</h1>

        <ul className="flex flex-row gap-40">
          {brands.then((brandsData) =>
            brandsData.map((brand) => (
              <li key={brand.id}>
                <BrandImage brand={brand} />
              </li>
            )),
          )}
        </ul>
      </main>
    </div>
  );
}
