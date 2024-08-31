"use client";
import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shadcn-components/ui/command";
import { useHits, useSearchBox } from "react-instantsearch";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shadcn-components/ui/dropdown-menu";
import { album } from "./page";

export default function SearchBar({
  albumsMap,
}: {
  albumsMap: {
    [key: string]: album;
  };
}) {
  const { query: searchQuery, refine, clear } = useSearchBox();
  const [Query, setQuery] = useState(searchQuery);
  const { push } = useRouter();
  const { items } = useHits({ escapeHTML: true });
  useEffect(() => {
    if (!Query) {
      clear();
      return;
    }
    refine(Query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Query]);
  return (
    <>
      <DropdownMenu>
        <Command className="mb-5">
          <DropdownMenuTrigger>
            <div className="px-4 py-2 inline-flex w-full items-center justify-between">
              Search
              <SearchIcon size={15} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[95vw] max-w-[1520px] ">
            <CommandInput
              placeholder="Search Song..."
              value={Query}
              onValueChange={setQuery}
            />
            <CommandList className="mt-2">
              <CommandEmpty>No songs found.</CommandEmpty>
              <CommandGroup>
                {items &&
                  items.map((song) => (
                    <CommandItem
                      key={song.objectID}
                      value={song.name}
                      className="text-white block"
                      onSelect={() => push(`/albums/${song.albumId}`)}
                      onClick={() => push(`/albums/${song.albumId}`)}
                    >
                      {song.name}
                      <p className="text-sm text-greyShade">
                        {albumsMap[song.albumId].title}
                      </p>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </DropdownMenuContent>
        </Command>
      </DropdownMenu>
    </>
  );
}
