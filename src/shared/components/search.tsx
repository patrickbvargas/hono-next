"use client";

import * as React from "react";
import { cn } from "~/shared/lib/utils";
import { useSearch } from "~/shared/hooks";
import { SearchIcon, XIcon } from "lucide-react";
import { Input, Button } from "~/shared/components/ui";

export const Search = ({
  className,
  ...props
}: React.ComponentProps<typeof Input>) => {
  const { search, handleSearch } = useSearch();
  const [searchValue, setSearchValue] = React.useState(search.query);

  const handleInputSearch = React.useCallback(
    (newQuery: string) => {
      setSearchValue(newQuery);
      handleSearch(newQuery);
    },
    [handleSearch],
  );

  return (
    <div className="relative">
      <SearchIcon className="absolute size-4 opacity-60 left-2 top-1/2 -translate-y-1/2 text-foreground" />
      <Input
        className={cn("px-10", className)}
        value={searchValue}
        onChange={(e) => handleInputSearch(e.target.value)}
        {...props}
      />
      <Button
        className="absolute size-6 right-2 top-1/2 -translate-y-1/2"
        variant="ghost"
        size="icon"
        onClick={() => handleInputSearch("")}
      >
        <XIcon className="size-4 opacity-60" />
      </Button>
    </div>
  );
};
