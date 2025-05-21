import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/appLayout/appLayout";

// Fontes
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${orbitron.variable} ${inter.variable}`}>
      <head>
        <title>Omni News</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="As últimas notícias e atualizações."
        />
      </head>
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}