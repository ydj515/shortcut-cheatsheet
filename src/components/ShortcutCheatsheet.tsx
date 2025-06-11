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

  const categoryShortcuts = allShortcuts.filter(
    (s) => s.category === selectedCategory
  );

  useEffect(() => {
    setFiltered(categoryShortcuts);
  }, [selectedCategory]);

  const handleSearch = useCallback((results: Shortcut[]) => {
    setFiltered(results);
  }, []);

  return (
    //     <div className="bg-gray-50 text-gray-800 font-sans p-6 max-w-4xl mx-auto w-full h-full">
    <div className="bg-gray-50 text-gray-800 font-sans p-6 w-full h-full">
      <h1 className="text-3xl font-bold mb-6">단축키 Cheatsheet</h1>

      <ShortcutSearch shortcuts={categoryShortcuts} onSearch={handleSearch} />
      <ShortcutList shortcuts={filtered} />
    </div>
  );
}
