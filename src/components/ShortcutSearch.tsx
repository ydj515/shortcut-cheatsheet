import { useState, useRef, useCallback, useEffect } from "react";
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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const allKeywords = useRef<string[]>([]);

  useEffect(() => {
    const keywords = new Set<string>();
    shortcuts.forEach(s => {
      s.keywords?.forEach(k => keywords.add(k));
    });
    allKeywords.current = Array.from(keywords);
  }, [shortcuts]);

  useEffect(() => {
    if (value === '') {
      setSuggestions([]);
    }
  }, [value]);

  const getSuggestions = (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filteredKeywords = allKeywords.current.filter(k =>
      k.toLowerCase().includes(lowerQuery)
    );
    setSuggestions(filteredKeywords.slice(0, 10)); // Limit suggestions
  };

  const performSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery) {
        onSearch(shortcuts);
        setSuggestions([]);
        return;
      }

      getSuggestions(searchQuery);

      const lower = searchQuery.toLowerCase();
      const filtered = shortcuts.filter(
        (s) =>
          s.action.toLowerCase().includes(lower) ||
          s.category.toLowerCase().includes(lower) ||
          s.mac.toLowerCase().includes(lower) ||
          s.win.toLowerCase().includes(lower) ||
          (s.keywords &&
            s.keywords.some((k) => k.toLowerCase().includes(lower))) ||
          (lower.startsWith('f') && 
           /^f[1-9]|f1[0-2]$/.test(lower) && 
           (s.mac.toLowerCase().includes(lower) || 
            s.win.toLowerCase().includes(lower)))
      );
      onSearch(filtered);
    },
    [shortcuts, onSearch]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    
    if (key.startsWith('F') && /^F[1-9]|F1[0-2]$/.test(key)) {
      e.preventDefault();
      onValueChange(key);
      performSearch(key);
      return;
    }

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

  const handleSuggestionClick = (suggestion: string) => {
    onValueChange(suggestion);
    performSearch(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search shortcuts (e.g. move cursor, ⌘ + ], keystroke, hotkey)"
        autoFocus={true}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        className="w-full mb-1 p-3 border border-gray-300 rounded"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}