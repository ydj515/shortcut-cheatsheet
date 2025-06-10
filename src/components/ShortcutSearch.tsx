import { useState, useCallback } from "react";
import { isModifierKey, formatKeyCombo } from "../utils/keyboardUtils";
import type { Shortcut } from "../types/shortcut";

interface ShortcutSearchProps {
  onSearch: (results: Shortcut[]) => void;
  shortcuts: Shortcut[];
}

export default function ShortcutSearch({
  onSearch,
  shortcuts
}: ShortcutSearchProps) {
  const [query, setQuery] = useState("");
  const pressedKeys = new Set<string>();

  const performSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery) {
        onSearch(shortcuts);
        return;
      }

      const lower = searchQuery.toLowerCase();
      const filtered = shortcuts.filter(
        (s) =>
          s.action.toLowerCase().includes(lower) ||
          s.category.toLowerCase().includes(lower) ||
          s.mac.toLowerCase().includes(lower) ||
          s.win.toLowerCase().includes(lower) ||
          (s.keywords &&
            s.keywords.some((k) => k.toLowerCase().includes(lower)))
      );
      onSearch(filtered);
    },
    [shortcuts, onSearch]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (isModifierKey(key)) {
      pressedKeys.add(key);
      return;
    }
    if (pressedKeys.size > 0 && key.length === 1) {
      e.preventDefault();
      pressedKeys.add(key);
      const combo = formatKeyCombo(pressedKeys);
      setQuery(combo);
      performSearch(combo);
    }
  };

  const handleKeyUp = () => pressedKeys.clear();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setQuery(newQuery);
      performSearch(newQuery);
    },
    [performSearch]
  );

  return (
    <input
      type="text"
      placeholder="단축키 검색 (예: 다음 커서, cursor, ⌘ + ])"
      value={query}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      className="w-full mb-6 p-3 border border-gray-300 rounded"
    />
  );
}
