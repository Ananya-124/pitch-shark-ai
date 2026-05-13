import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "@/styles/globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "700", "900"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PitchPilot AI — AI Venture Intelligence Platform",
  description:
    "Pitch your startup to elite AI investors. Get real-time analysis, simulation-grade feedback, and live deal negotiations.",
  keywords: ["startup", "AI", "investor", "pitch", "venture capital", "shark tank"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable}`}>
      <body>
        <div className="grid-bg" />
        {children}
      </body>
    </html>
  );
}
