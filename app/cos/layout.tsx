import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coș de cumpărături | Folii Timișoara",
  robots: { index: false, follow: true },
};

export default function CosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
