"use client";

import { useState, useEffect } from "react";
import { CarouselItem } from "./carouselInterface";

interface CarouselProps {
  items: CarouselItem[];
}

export default function Carousel({ items }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar se o texto está expandido
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Estado para detectar telas menores que lg

  // Detecta se a tela é menor que lg (1024px)
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    handleResize(); // Verifica o tamanho da tela ao carregar
    window.addEventListener("resize", handleResize); // Adiciona um listener para mudanças de tamanho
    return () => window.removeEventListener("resize", handleResize); // Remove o listener ao desmontar
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
    setIsExpanded(false); // Reseta o estado ao mudar de slide
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    setIsExpanded(false); // Reseta o estado ao mudar de slide
  };

  return (
    <div className="relative w-[95vw] h-auto lg:h-[80vh] lg:w-[90vw] mx-auto overflow-hidden rounded-lg shadow-xl transition-all">
      {/* Container principal responsivo */}
      <div className="relative w-full h-full flex flex-col md:flex-row">
        {/* Imagem (full width em mobile) */}
        <div className="w-full md:flex-1 relative h-[40vh] md:h-auto">
          <img
            src={items[activeIndex].image}
            alt={items[activeIndex].title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Área de texto (embaixo em mobile) */}
        <div className="w-full md:flex-1 p-2 md:p-12 flex flex-col justify-center bg-white">
          <h2 className="text-base md:text-4xl font-bold mb-0 md:mb-6 text-gray-800">
            {items[activeIndex].title}
          </h2>
          <p
            className={`text-sm md:text-lg text-gray-600 mb-4 lg:mr-6 ${
              isSmallScreen && !isExpanded ? "line-clamp-3" : "line-clamp-none"
            }`}
          >
            {items[activeIndex].description}
          </p>
          {isSmallScreen &&
            !isExpanded &&
            items[activeIndex].description.length > 100 && (
              <button
                onClick={() => setIsExpanded(true)}
                className="text-red-600 text-sm underline"
              >
                Ver mais
              </button>
            )}
          {isSmallScreen && isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="text-red-600 text-sm underline"
            >
              Ver menos
            </button>
          )}
          <button className="self-start px-6 py-2 md:px-8 md:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer text-sm md:text-base">
            {items[activeIndex].buttonText}
          </button>
        </div>
      </div>

      {/* Botões de navegação ajustados para mobile */}
      <button
        onClick={handlePrev}
        className="absolute left-2 md:left-4 top-[40%] md:top-1/2 -translate-y-1/2 bg-white/80 p-2 md:p-3 rounded-full shadow-lg hover:bg-white transition-colors cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 md:right-4 top-[40%] md:top-1/2 -translate-y-1/2 bg-white/80 p-2 md:p-3 rounded-full shadow-lg hover:bg-white transition-colors cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicadores ajustados para mobile */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              setIsExpanded(false); // Reseta o estado ao mudar de slide
            }}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
              index === activeIndex ? "bg-red-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
