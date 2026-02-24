import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
};

export default function BackLink({ href, children }: Props) {
  return (
    <Link href={href} className="text-sm opacity-40 hover:opacity-100 transition-opacity">
      ← {children}
    </Link>
  );
}
