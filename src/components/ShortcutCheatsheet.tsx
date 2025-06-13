import { useEffect, useState, useCallback } from "react";
import { allShortcuts } from "../data/shortcuts";
import type { Shortcut } from "../types/shortcut";
import ShortcutSearch from "./ShortcutSearch";
import { ShortcutList } from "./ShortcutList";

export default function ShortcutCheatsheet({
  selectedCategory
}: {
  selectedCategory: string;
}) {
  const [filtered, setFiltered] = useState<Shortcut[]>(
    allShortcuts.filter((s) => s.category === selectedCategory)
  );
  const [query, setQuery] = useState("");

  const categoryShortcuts = allShortcuts.filter(
    (s) => s.category === selectedCategory
  );

  useEffect(() => {
    setFiltered(categoryShortcuts);
    setQuery("");
  }, [selectedCategory]);

  const handleSearch = useCallback((results: Shortcut[]) => {
    setFiltered(results);
  }, []);

  return (
    <div className=" text-gray-800 p-6 font-sans w-full h-full">
      <h1 className="text-3xl font-bold mt-6 mb-6">Cheatsheet</h1>
      <ShortcutSearch
        shortcuts={categoryShortcuts}
        onSearch={handleSearch}
        value={query}
        onValueChange={setQuery}
      />
      <ShortcutList shortcuts={filtered} />
    </div>
  );
}
