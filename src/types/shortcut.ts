export type ShortcutCategory = "intellij" | "figma" | "vscode";

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
