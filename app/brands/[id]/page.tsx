import { fetchModels } from "@/lib/fetchers/models";
import brands from "@data/brands.json";
import Timeline from "@components/Timeline";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BrandPage({ params }: Props) {
  const { id } = await params;
  const brand = brands.find((b) => b.id === id);

  if (!brand) notFound();

  const models = await fetchModels(id);

  return (
    <main className="min-h-screen pb-24">
      <div className="flex flex-col items-center gap-6 pt-16 pb-12">
        <Link
          href="/"
          className="text-sm opacity-40 hover:opacity-100 transition-opacity"
        >
          ← Back
        </Link>
        <Image
          src={`/images/${brand.logoPath}`}
          alt={brand.name}
          width={120}
          height={120}
          className="w-auto h-24"
        />
        <h1 className="text-6xl font-bold uppercase">{brand.name}</h1>
        <p className="text-xl opacity-50 italic">Timeline</p>
      </div>

      <Timeline models={models} brandName={brand.name} />
    </main>
  );
}
