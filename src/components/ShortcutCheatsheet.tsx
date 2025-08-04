import { useEffect, useState, useCallback, useMemo } from "react";
import { allShortcuts } from "../data/shortcuts";
import type { Shortcut } from "../types/shortcut";
import ShortcutSearch from "./ShortcutSearch";
import { ShortcutList } from "./ShortcutList";

export default function ShortcutCheatsheet({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  const categoryShortcuts = useMemo(
    () => allShortcuts.filter((s) => s.category === selectedCategory),
    [selectedCategory]
  );

  const [filtered, setFiltered] = useState<Shortcut[]>(categoryShortcuts);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setFiltered(categoryShortcuts);
    setQuery("");
  }, [categoryShortcuts]);

  const handleSearch = useCallback((results: Shortcut[]) => {
    setFiltered(results);
  }, []);

  return (
    <div className=" text-gray-800 p-6 font-sans w-full h-full">
      <h1 className="text-3xl font-bold mt-6 mb-6">Cheatsheet</h1>
      <div className="mb-6">
        <ShortcutSearch
          shortcuts={categoryShortcuts}
          onSearch={handleSearch}
          value={query}
          onValueChange={setQuery}
        />
      </div>
      <ShortcutList shortcuts={filtered} />
    </div>
  );
}