import { Brand } from "@/lib/types/brand";
import Image from "next/image";
import Link from "next/link";

type Props = {
  brand: Brand;
};

export default function BrandImage({ brand }: Props) {
  return (
    <Link href={`/brands/${brand.id}`}>
      <div className="hover:scale-110 transition-transform duration-500">
        <Image src={`/images/${brand.logoPath}`} alt={brand.id} width={200} height={200} className="w-auto h-50" />
      </div>
    </Link>
  );
}
