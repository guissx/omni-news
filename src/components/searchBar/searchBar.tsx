"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Hook para redirecionamento no Next.js
import { SearchBarProps } from "./searchBarInterface";

export default function SearchBar({
  placeholder = "Pesquisar...",
  isVisible = true,
  onSearchClick, // Nova propriedade para lidar com o clique no ícone de lupa
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter(); // Hook para redirecionar

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (searchValue.trim()) {
      router.push(`/searchPage?query=${encodeURIComponent(searchValue)}`);
      if (onSearchClick) onSearchClick(); // Fecha o menu no mobile
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`overflow-hidden transition-all duration-500 ${
        isVisible ? "w-48 lg:w-64 opacity-100" : "w-0 opacity-0"
      }`}
    >
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-transparent focus:outline-none focus:border-red-700"
        />
        {/* Ícone de lupa */}
        <button
          type="button"
          onClick={() => handleSearch()} // Executa a busca ao clicar no ícone
          className="absolute right-2 text-gray-500 hover:text-red-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 18a8 8 0 1 1 6.32-3.16l4.91 4.91a1 1 0 0 1-1.42 1.42l-4.91-4.91A8 8 0 0 1 10 18z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
