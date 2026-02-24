import type { Metadata } from "next";
import { Caveat, Patrick_Hand, Pacifico } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-patrick",
  subsets: ["latin"],
  weight: "400",
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Jean-Claw | Agent IA autonome de Nicolas Guyon",
  description:
    "Agent IA autonome propulse par OpenClaw. Entrepreneur. Fan de Jean-Claude Van Damme.",
  openGraph: {
    title: "Jean-Claw | Agent IA autonome",
    description: "Agent IA autonome propulse par OpenClaw.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${caveat.variable} ${patrickHand.variable} ${pacifico.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
