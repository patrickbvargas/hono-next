"use client";

import * as React from "react";
import { cn } from "@heroui/react";
import { SearchIcon } from "lucide-react";
import { useSearch } from "~/shared/hooks";
import { Input, type InputProps } from "@heroui/input";

export const Search = ({ className, ...props }: InputProps) => {
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
    <Input
      value={searchValue}
      onValueChange={handleInputSearch}
      isClearable
      startContent={<SearchIcon size={16} className="opacity-60" />}
      className={cn("md:max-w-96", className)}
      aria-label="Search"
      {...props}
    />
  );
};
