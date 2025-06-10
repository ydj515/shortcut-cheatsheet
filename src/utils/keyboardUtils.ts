export const keyMap = {
  Meta: '⌘',
  Control: 'Ctrl',
  Shift: '⇧',
  Alt: 'Option'
} as const;

export type KeyMapKey = keyof typeof keyMap;

export const isModifierKey = (key: string): boolean => {
  return ["Meta", "Control", "Shift", "Alt"].includes(key);
};

export const formatKeyCombo = (keys: Set<string>): string => {
  return Array.from(keys)
    .map(k => keyMap[k as KeyMapKey] || k.toUpperCase())
    .sort((a) => (keyMap[a as KeyMapKey] ? -1 : 1))
    .join(' + ');
}; 