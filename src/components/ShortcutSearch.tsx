import { useRef, useCallback } from "react";
import { isModifierKey, formatKeyCombo } from "../utils/keyboardUtils";
import type { Shortcut } from "../types/shortcut";

interface ShortcutSearchProps {
  onSearch: (results: Shortcut[]) => void;
  shortcuts: Shortcut[];
  value: string;
  onValueChange: (v: string) => void;
}

export default function ShortcutSearch({
  onSearch,
  shortcuts,
  value,
  onValueChange
}: ShortcutSearchProps) {
  const pressedKeys = useRef<Set<string>>(new Set());

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
      pressedKeys.current.add(key);
      return;
    }
    if (pressedKeys.current.size > 0 && key.length === 1) {
      e.preventDefault();
      pressedKeys.current.add(key);
      const combo = formatKeyCombo(pressedKeys.current);
      onValueChange(combo);
      performSearch(combo);
    }
  };

  const handleKeyUp = () => pressedKeys.current.clear();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      onValueChange(newQuery);
      performSearch(newQuery);
    },
    [performSearch, onValueChange]
  );

  return (
    <input
      type="text"
      placeholder="Search shortcuts (e.g. move cursor, ⌘ + ], keystroke, hotkey)"
      autoFocus={true}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      className="w-full mb-6 p-3 border border-gray-300 rounded"
    />
  );
}
