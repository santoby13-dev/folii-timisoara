import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/lib/cart";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Folii Timișoara | Închidere terase cu folie PVC transparentă",
  description:
    "Folie PVC transparentă pentru închidere terase, la prețuri avantajoase. Consultanță, livrare și montaj în Timișoara și împrejurimi.",
  openGraph: {
    title: "Folii Timișoara",
    description:
      "Folie PVC transparentă pentru închidere terase, la prețuri avantajoase. Consultanță, livrare și montaj în Timișoara și împrejurimi.",
    url: siteConfig.url,
    siteName: "Folii Timișoara",
    images: ["/products/folie-cristal-flex/01.jpg"],
    locale: "ro_RO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <CartDrawer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
