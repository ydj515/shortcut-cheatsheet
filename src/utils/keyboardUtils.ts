export const isMacOS = (): boolean => {
  return /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
};

export const keyMap = {
  Meta: isMacOS() ? "⌘" : "Win",
  Control: "Ctrl",
  Shift: "⇧",
  Alt: isMacOS() ? "Option" : "Alt"
} as const;

export type KeyMapKey = keyof typeof keyMap;

export const isModifierKey = (key: string): boolean => {
  return ["Meta", "Control", "Shift", "Alt"].includes(key);
};

export const formatKeyCombo = (keys: Set<string>): string => {
  return Array.from(keys)
    .sort((a, b) => {
      const aIsModifier = isModifierKey(a);
      const bIsModifier = isModifierKey(b);
      if (aIsModifier && !bIsModifier) return -1;
      if (!aIsModifier && bIsModifier) return 1;
      // For keys of the same type (both modifiers or both not), sort alphabetically
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    })
    .map((k) => keyMap[k as KeyMapKey] || k.toUpperCase())
    .join(" + ");
};
