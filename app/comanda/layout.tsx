import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finalizare comandă | Folii Timișoara",
  robots: { index: false, follow: true },
};

export default function ComandaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
