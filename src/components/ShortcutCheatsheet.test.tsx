import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ShortcutCheatsheet from "./ShortcutCheatsheet";
import { allShortcuts } from "../data/shortcuts";

afterEach(cleanup);

describe("ShortcutCheatsheet", () => {
  it("resets the search and shows the new category when selection changes", () => {
    const categories = [...new Set(allShortcuts.map((shortcut) => shortcut.category))];
    const first = categories[0];
    const second = categories[1];
    expect(second).toBeDefined();
    const { rerender } = render(<ShortcutCheatsheet selectedCategory={first} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "no-matching-shortcut" } });
    expect(screen.queryByText("No Results Found")).not.toBeNull();

    rerender(<ShortcutCheatsheet selectedCategory={second} />);

    expect((screen.getByRole("textbox") as HTMLInputElement).value).toBe("");
    expect(screen.queryByText("No Results Found")).toBeNull();
    expect(screen.getByRole("heading", { name: second })).toBeDefined();
  });
});
