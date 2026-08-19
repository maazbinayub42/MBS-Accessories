import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MBS Islamic Accessories — Premium Islamic Accessories & Fragrances",
  description:
    "MBS Fragrance & Faith Collection — Premium Kufis, Imamas, Attars, Fragrances and Islamic accessories. Nationwide delivery across Pakistan.",
  keywords: [
    "MBS",
    "Islamic accessories",
    "Kufi",
    "Imama",
    "Attar",
    "Fragrance",
    "Pakistani brand",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
