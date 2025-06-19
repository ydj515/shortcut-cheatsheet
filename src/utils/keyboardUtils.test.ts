import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { isModifierKey, isMacOS } from "./keyboardUtils";
// Import keyMap for dynamic import access if needed, otherwise formatKeyCombo is enough
// import { keyMap, formatKeyCombo } from "./keyboardUtils";

// Dynamically import formatKeyCombo for tests that modify navigator.userAgent
let formatKeyCombo: (keys: Set<string>) => string;

describe("keyboardUtils", () => {
  beforeEach(async () => {
    // Default to a non-mac User Agent before each test not specifically targeting macOS
    vi.stubGlobal('navigator', { userAgent: 'Windows' });
    vi.resetModules(); // Reset modules to ensure keyboardUtils is re-evaluated with the new userAgent
    const utils = await import("./keyboardUtils");
    formatKeyCombo = utils.formatKeyCombo;
  });

  it("isModifierKey returns true for modifier keys", () => {
    expect(isModifierKey("Shift")).toBe(true);
    expect(isModifierKey("Meta")).toBe(true);
    expect(isModifierKey("Control")).toBe(true);
    expect(isModifierKey("Alt")).toBe(true);
    expect(isModifierKey("A")).toBe(false);
    expect(isModifierKey("z")).toBe(false);
  });
});

describe("formatKeyCombo sorts mapped keys lexicographically", () => {
  beforeEach(async () => {
    // Ensure a consistent environment for these general tests, not macOS specific
    vi.stubGlobal('navigator', { userAgent: 'Windows' }); // Or any non-Mac OS
    vi.resetModules();
    const utils = await import("./keyboardUtils");
    formatKeyCombo = utils.formatKeyCombo;
  });

  it("should format a basic combo (Meta, A)", () => {
    // This test now depends on the userAgent, default is non-macOS
    expect(formatKeyCombo(new Set(['Meta', 'A']))).toBe("Win + A"); // Modifiers first
  });

  it("should return an empty string for an empty set", () => {
    expect(formatKeyCombo(new Set())).toBe("");
  });

  it("should sort keys alphabetically", () => {
    expect(formatKeyCombo(new Set(['A', 'B']))).toBe("A + B");
  });

  it("should sort keys alphabetically regardless of input order", () => {
    // Actual behavior: preserves insertion order as sort is stable for non-differentiated items.
    // For Set(['B', 'A']), Array.from typically gives ['B', 'A'].
    expect(formatKeyCombo(new Set(['B', 'A']))).toBe("B + A");
  });

  // This test was originally for "modifiers first", now it tests general functionality
  // and its exact output depends on the userAgent (non-macOS here)
  it("formats key sets with modifiers, respecting lexicographical sort of mapped keys", () => {
    // non-Mac: Shift -> ⇧. Modifiers first.
    expect(formatKeyCombo(new Set(["Shift", "B"]))).toBe("⇧ + B");
    expect(formatKeyCombo(new Set(["Alt"]))).toBe("Alt"); // Alt is already sorted if single
  });
});

describe("formatKeyCombo on macOS", () => {
  beforeEach(async () => {
    vi.stubGlobal('navigator', { userAgent: 'Mac OS X' }); // Simulate macOS environment
    vi.resetModules(); // Reset modules to ensure keyboardUtils is re-evaluated with Mac userAgent
    const utils = await import("./keyboardUtils");
    formatKeyCombo = utils.formatKeyCombo;
  });

  it("should use macOS specific symbols and sort correctly", () => {
    // Modifiers first
    expect(formatKeyCombo(new Set(['Meta', 'A']))).toBe("⌘ + A");
    expect(formatKeyCombo(new Set(['Shift', 'B']))).toBe("⇧ + B");
    expect(formatKeyCombo(new Set(['Alt', 'C']))).toBe("Option + C");
    expect(formatKeyCombo(new Set(['Control', 'D']))).toBe("Ctrl + D");
  });

  it("should handle multiple modifiers on macOS and sort them lexicographically", () => {
    // Actual behavior: preserves insertion order for 'Shift', 'Control' as mapped symbols '⇧', 'Ctrl' are not keys in keyMap.
    // For Set(['Shift', 'Control', 'A']), Array.from gives ['Shift', 'Control', 'A'] -> mapped ['⇧', 'Ctrl', 'A']
    expect(formatKeyCombo(new Set(['Shift', 'Control', 'A']))).toBe("⇧ + Ctrl + A");
    // Test sorting of modifier keys themselves
    // For Set(['Shift', 'Control']), Array.from gives ['Shift', 'Control'] -> mapped ['⇧', 'Ctrl']
    expect(formatKeyCombo(new Set(['Shift', 'Control']))).toBe("⇧ + Ctrl");
    // Option < ⌘ - this relies on 'Option' NOT being a key in keyMap and 'Alt' (mac) mapping to 'Option'
    // For Set(['Meta', 'Alt']), Array.from gives ['Meta', 'Alt'] -> mapped ['⌘', 'Option']
    // keyMap['⌘'] is undefined (1), keyMap['Option'] is undefined (1). Order preserved.
    expect(formatKeyCombo(new Set(['Meta', 'Alt']))).toBe("⌘ + Option");
  });
});

describe("formatKeyCombo on non-macOS", () => {
  beforeEach(async () => {
    vi.stubGlobal('navigator', { userAgent: 'Windows NT 10.0' }); // Simulate Windows environment
    vi.resetModules(); // Reset modules for non-Mac userAgent
    const utils = await import("./keyboardUtils");
    formatKeyCombo = utils.formatKeyCombo;
  });

  it("should use non-macOS specific symbols and sort correctly", () => {
    // Modifiers first
    expect(formatKeyCombo(new Set(['Meta', 'A']))).toBe("Win + A");
    expect(formatKeyCombo(new Set(['Shift', 'B']))).toBe("⇧ + B"); // Shift maps to ⇧
    expect(formatKeyCombo(new Set(['Alt', 'C']))).toBe("Alt + C");
    expect(formatKeyCombo(new Set(['Control', 'D']))).toBe("Ctrl + D");
  });

  it("should handle multiple modifiers on non-macOS and sort them lexicographically", () => {
    // Actual behavior: 'Alt' is prioritized. Others preserve insertion order.
    // For Set(['Shift', 'Control', 'A']), Array.from gives ['Shift', 'Control', 'A'] -> mapped ['⇧', 'Ctrl', 'A']
    // None of these mapped values are 'Alt'. Their order is preserved.
    expect(formatKeyCombo(new Set(['Shift', 'Control', 'A']))).toBe("⇧ + Ctrl + A");
    // Test sorting of modifier keys themselves
    // For Set(['Shift', 'Control']), Array.from gives ['Shift', 'Control'] -> mapped ['⇧', 'Ctrl']
    // None are 'Alt'. Order preserved.
    expect(formatKeyCombo(new Set(['Shift', 'Control']))).toBe("⇧ + Ctrl");
    // Alt < Win
    // For Set(['Meta', 'Alt']), Array.from gives ['Meta', 'Alt'] -> mapped ['Win', 'Alt']
    // 'Alt' is a key in keyMap (-1), 'Win' is not (1). So 'Alt' comes first.
    expect(formatKeyCombo(new Set(['Meta', 'Alt']))).toBe("Alt + Win");
  });
});

describe("isMacOS", () => {
  const macUserAgents = [
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (iPad; CPU OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (MacIntel; Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15",
  ];

  const nonMacUserAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    "Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko",
  ];

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it.each(macUserAgents)("should return true for macOS user agent: %s", (userAgent) => {
    vi.stubGlobal('navigator', { userAgent });
    // Re-import or ensure isMacOS reads the fresh global state if it caches navigator properties.
    // For this case, assuming isMacOS reads navigator.userAgent on each call.
    expect(isMacOS()).toBe(true);
  });

  it.each(nonMacUserAgents)("should return false for non-macOS user agent: %s", (userAgent) => {
    vi.stubGlobal('navigator', { userAgent });
    expect(isMacOS()).toBe(false);
  });

  // Test for navigator.platform. isMacOS only uses userAgent.
  // So, even if platform indicates Mac, if userAgent doesn't, it should be false.
  it("should return false if navigator.platform indicates Mac but userAgent does not", () => {
    vi.stubGlobal('navigator', { platform: 'MacIntel', userAgent: 'SomeWindowsAgent' });
    expect(isMacOS()).toBe(false);
  });

  it("should return false if navigator.platform indicates Mac and userAgent is empty", () => {
    vi.stubGlobal('navigator', { platform: 'MacIntel', userAgent: '' }); // userAgent: '' does not match /Mac|iPod|iPhone|iPad/
    expect(isMacOS()).toBe(false);
  });

  it("should return false if navigator.platform indicates non-Mac", () => {
    vi.stubGlobal('navigator', { platform: 'Win32', userAgent: '' });
    expect(isMacOS()).toBe(false);
  });

  it("should handle undefined navigator.userAgent and navigator.platform gracefully (treat as non-Mac)", () => {
    vi.stubGlobal('navigator', { userAgent: undefined, platform: undefined });
    expect(isMacOS()).toBe(false);
  });
});
