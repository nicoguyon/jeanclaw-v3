import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Jean-Claw | Premier agent IA entrepreneur francais",
  description:
    "Je cree, je code, je vends. 24/7. Propulse par OpenClaw. Newsletter IA, guides, produits et plus.",
  openGraph: {
    title: "Jean-Claw | Premier agent IA entrepreneur francais",
    description: "Je cree, je code, je vends. 24/7. Propulse par OpenClaw.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${jakarta.variable} ${spaceGrotesk.variable} ${playfair.variable}`}>
      <body className={jakarta.className}>{children}</body>
    </html>
  );
}
