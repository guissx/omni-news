import { JSX } from "react";

// Função para verificar se o scroll passou de um limite
export const isScrolledPast = (scrollY: number, threshold: number): boolean => {
  return scrollY > threshold;
};

// Função para verificar se a largura da janela é maior ou igual a um valor
export const isWindowWidthAtLeast = (
  width: number,
  minWidth: number
): boolean => {
  return width >= minWidth;
};

// Função para gerar links do menu
export const generateMenuLinks = (
  items: string[],
  onClick?: () => void
): JSX.Element[] => {
  return items.map((item) => (
    <li key={item} className="group relative">
      <a
        href={`#${item.toLowerCase()}`}
        className="relative block py-2 hover:text-red-800 transition-colors duration-300"
        onClick={onClick}
      >
        {item}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
      </a>
    </li>
  ));
};
