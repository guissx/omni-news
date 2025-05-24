"use client";

import { usePathname } from "next/navigation";
import Header from "../header/header";
import Footer from "../footer/footer";
import ParticlesBackground from "../particlesBackground/particlesBackground";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname === "/loginPage" || pathname === "/registerPage" || pathname === "/admin/CarouselSettingsPage" ;

  return (
    <>
      {!hideLayout && <ParticlesBackground />}
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}