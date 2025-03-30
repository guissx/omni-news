// app/searchPage/page.tsx
import { Suspense } from "react";
import SearchResults from "../../components/searchResults/searchResults";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Carregando resultados...</div>}>
      <SearchResults />
    </Suspense>
  );
}
