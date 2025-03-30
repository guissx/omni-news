// components/NewsCarousel.tsx
"use client";

import { useState } from "react";

interface NewsItem {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  timestamp: string;
}

export default function NewsCarousel({ items }: { items: NewsItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const getCardStyle = (index: number) => {
    const isActive = index === activeIndex;
    const isNext = index === (activeIndex + 1) % items.length;
    const isPrev = index === (activeIndex - 1 + items.length) % items.length;

    if (isActive) return "translate-x-0 opacity-100 z-10 scale-100";
    if (isNext) return "translate-x-full opacity-0 scale-90 z-0";
    if (isPrev) return "-translate-x-full opacity-0 scale-90 z-0";
    return "translate-x-0 opacity-0 scale-90 z-0";
  };

  const navigate = (direction: "next" | "prev") => {
    setActiveIndex((prev) =>
      direction === "next"
        ? (prev + 1) % items.length
        : (prev - 1 + items.length) % items.length
    );
  };

  return (
    <section className=" py-16 w-[90vw]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Área Principal do Carrossel */}
        <div className="lg:col-span-2 relative h-[60vh] lg:h-[77vh] overflow-hidden">
          {items.map((item, index) => (
            <article
              key={item.id}
              className={`absolute inset-0 transition-all duration-500 ${getCardStyle(
                index
              )}`}
            >
              <div className="relative h-full overflow-hidden rounded-2xl shadow-xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
                  <span className="text-red-500 font-semibold text-sm">
                    {item.category}
                  </span>
                  <h2 className="text-3xl font-bold text-white mt-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-200 mt-4 line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
              </div>
            </article>
          ))}
          {/* Controles de Navegação */}
          {/* Controles de Navegação */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 lg:top-auto lg:translate-y-0 lg:bottom-8 lg:right-8 lg:w-auto lg:justify-end z-20 lg:gap-2">
            <button
              onClick={() => navigate("prev")}
              className="bg-white/80 p-2 md:p-3 rounded-full shadow-lg hover:bg-white transition-colors cursor-pointer lg:static"
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
              onClick={() => navigate("next")}
              className="bg-white/80 p-2 md:p-3 rounded-full shadow-lg hover:bg-white transition-colors cursor-pointer lg:static"
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
          </div>
        </div>

        <div className="hidden lg:col-span-1 lg:flex flex-col h-[80vh]">
          <div className="flex flex-col gap-[20.5px] h-full overflow-y-auto custom-scrollbar">
            {items.map((item, index) => (
              <article
                key={item.id}
                className={`group cursor-pointer transition-all ${
                  index === activeIndex
                    ? "border-2 border-red-500"
                    : "border border-gray-100 hover:border-gray-200"
                } rounded-xl bg-white h-[24vh] w-[80vw]`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="flex h-full">
                  <div className="w-1/3 rounded-xl overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform relative"
                    />
                  </div>
                  <div className="flex-1 flex flex-col z-10 absolute translate-x-2 translate-y-2">
                    <span className="text-xs font-semibold text-red-500 uppercase">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-base mt-1 line-clamp-3">
                      {item.title}
                    </h3>
                    <time className="text-xs text-gray-400 mt-auto pt-2 block">
                      {item.timestamp}
                    </time>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
