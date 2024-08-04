"use client";
import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/shadcn-components/ui/button";
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

export default function SearchBar() {
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
  }, [Query]);
  return (
    <>
      <DropdownMenu>
        <Command className="mb-5">
          <DropdownMenuTrigger>
            <Button
              variant="default"
              className="inline-flex w-full justify-between"
            >
              Search
              <SearchIcon size={15} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[95vw] max-w-[1520px] ">
            <CommandInput
              placeholder="Search Song..."
              value={Query}
              onValueChange={setQuery}
            />
            <CommandList className="mt-2">
              <CommandEmpty>No songs found.</CommandEmpty>
              <CommandGroup className="">
                {items &&
                  items.map((song) => (
                    <CommandItem
                      key={song.objectID}
                      value={song.name}
                      className="text-white"
                      onSelect={() =>
                        push(`/albums/${song.albumId}#${song.objectID}`)
                      }
                      onClick={() =>
                        push(`/albums/${song.albumId}#${song.objectID}`)
                      }
                    >
                      {song.name}
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
