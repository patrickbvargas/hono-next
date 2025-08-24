"use client";

import * as React from "react";
import { Input } from "./";
import { cn } from "~/shared/lib/utils";
import { useSearch } from "~/shared/hooks";
import { CircleXIcon, SearchIcon } from "lucide-react";

export const Search = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Input>) => {
  const { search, handleSearch } = useSearch();
  const [searchValue, setSearchValue] = React.useState(search.query);

  const handleInputSearch = React.useCallback(
    (newQuery: string) => {
      setSearchValue(newQuery);
      handleSearch(newQuery);
    },
    [handleSearch],
  );

  const handleClearSearch = React.useCallback(() => {
    setSearchValue("");
    handleSearch("");
  }, [handleSearch]);

  return (
    <div className="relative">
      <Input
        value={searchValue}
        onChange={(e) => handleInputSearch(e.target.value)}
        aria-label="Search"
        className={cn("peer px-9", className)}
        {...props}
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
        <SearchIcon size={16} aria-hidden="true" className="opacity-60" />
      </div>
      {searchValue && (
        <button
          onClick={handleClearSearch}
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Clear input"
        >
          <CircleXIcon size={16} aria-hidden="true" className="opacity-60" />
        </button>
      )}
    </div>
  );
};
