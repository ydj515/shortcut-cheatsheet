export type ShortcutCategory = "intellij" | "figma" | "vscode" | "excel" | "powerpoint";

export interface Shortcut {
  category: ShortcutCategory;
  action: string;
  mac: string;
  win: string;
  keywords: string[];
}

export interface ShortcutGroup {
  [category: string]: Shortcut[];
}
