"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../logo/logo";
import SearchBar from "../searchBar/searchBar";
import { isWindowWidthAtLeast } from "./headerUtils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      if (isWindowWidthAtLeast(window.innerWidth, 768)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/searchPage?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 px-4 md:px-12 transition-all duration-300 shadow-md ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent shadow-none"
      }`}
    >
      <div className="flex w-full justify-between items-center p-4">
        <Logo />

        {/* Hamburger Menu (Mobile) */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {/* Barra de busca sempre visível (Desktop) */}
          <SearchBar isVisible={true} onSearch={handleSearch} />

          {/* Menu tradicional (Desktop) com linha vermelha progressiva */}
          <ul className="flex gap-8 orbitron-text text-xl">
            <li>
              <Link
                href="/"
                className="relative hover:text-red-500 transition-colors group"
              >
                Home
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                href="/contactPage"
                className="relative hover:text-red-500 transition-colors group"
              >
                Contact
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                href="/aboutPage"
                className="relative hover:text-red-500 transition-colors group"
              >
                About
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden fixed inset-0 bg-black/50 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={toggleMenu}
        />

        {/* Mobile Menu Content */}
        <div
          className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            {/* Search Bar Mobile */}
            <SearchBar
              onSearch={handleSearch}
              onSearchClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu Items */}
            <ul className="flex flex-col gap-4 mt-8 orbitron-text text-xl">
              <li>
                <Link
                  href="/"
                  className="hover:text-red-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/contactPage"
                  className="hover:text-red-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/aboutPage"
                  className="hover:text-red-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
