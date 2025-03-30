"use client";
import { useState } from "react";

interface CarouselItem {
  image: string;
  title: string;
  description: string;
  buttonText: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

export default function Carousel({ items }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="relative w-[95vw] h-[60vh] lg:w-[90vw] lg:h-[80vh] mx-auto overflow-hidden rounded-lg shadow-xl">
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
        <div className="w-full md:flex-1 p-6 md:p-12 flex flex-col justify-center bg-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-800">
            {items[activeIndex].title}
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
            {items[activeIndex].description}
          </p>
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
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
              index === activeIndex ? "bg-red-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
