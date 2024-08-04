"use client";
import { InstantSearch, useSearchBox } from "react-instantsearch";
import { algoliaClient } from "@/app/algolia";
function SearchBox({ children }: { children: React.ReactNode }) {
  return (
    <InstantSearch searchClient={algoliaClient} indexName="amr-diab-songs">
      {children}
    </InstantSearch>
  );
}

export default SearchBox;
