import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const rootDir = process.cwd();
const ignoredDirectories = new Set([
  ".git",
  "dist",
  "node_modules",
  "coverage"
]);
const textExtensions = new Set([
  ".css",
  ".d.ts",
  ".html",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".ts",
  ".tsx",
  ".txt",
  ".xml"
]);
const sourceBrandPattern = new RegExp(
  `${["wan", "ted"].join("")}|\uC6D0\uD2F0\uB4DC`,
  "i"
);

const getExtension = (path: string) => {
  const lastDot = path.lastIndexOf(".");
  return lastDot === -1 ? "" : path.slice(lastDot);
};

const collectFiles = (directory: string): string[] => {
  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    const relativePath = relative(rootDir, path);

    if (statSync(path).isDirectory()) {
      if (ignoredDirectories.has(name)) {
        return [];
      }

      return collectFiles(path);
    }

    return [relativePath];
  });
};

describe("design-system cleanup", () => {
  it("keeps app components free of React inline style props", () => {
    const componentFiles = collectFiles(join(rootDir, "src", "components"))
      .filter((path) => path.endsWith(".tsx"));

    const offenders = componentFiles.filter((path) =>
      readFileSync(join(rootDir, path), "utf8").includes("style={{")
    );

    expect(offenders).toEqual([]);
  });

  it("does not load fonts from CDN stylesheets", () => {
    const textFiles = collectFiles(rootDir)
      .filter((path) => textExtensions.has(getExtension(path)));

    const offenders = textFiles.filter((path) =>
      /cdn\.jsdelivr|fonts\.googleapis|fonts\.gstatic/i.test(
        readFileSync(join(rootDir, path), "utf8")
      )
    );

    expect(offenders).toEqual([]);
  });

  it("self-hosts the app font as latin and hangul WOFF2 subsets", () => {
    const stylesheet = readFileSync(join(rootDir, "src", "index.css"), "utf8");
    const fontFiles = collectFiles(join(rootDir, "public", "fonts"));
    const subsetFonts = [
      "public/fonts/app-sans-variable-latin.woff2",
      "public/fonts/app-sans-variable-hangul.woff2"
    ];

    expect(stylesheet).toContain("/fonts/app-sans-variable-latin.woff2");
    expect(stylesheet).toContain("/fonts/app-sans-variable-hangul.woff2");
    expect(stylesheet).toContain('format("woff2")');
    expect(stylesheet).toContain("unicode-range: U+0000-00FF");
    expect(stylesheet).toContain("unicode-range: U+1100-11FF");
    expect(stylesheet).not.toMatch(/\.ttf|truetype/i);
    expect(stylesheet).not.toContain('url("/fonts/app-sans-variable.woff2")');
    expect(fontFiles).toEqual(expect.arrayContaining(subsetFonts));
    expect(fontFiles.some((path) => path.endsWith(".ttf"))).toBe(false);
    expect(fontFiles).not.toContain("public/fonts/app-sans-variable.woff2");
  });

  it("preloads self-hosted font subsets for first paint", () => {
    const indexHtml = readFileSync(join(rootDir, "index.html"), "utf8");

    for (const fontPath of [
      "/fonts/app-sans-variable-latin.woff2",
      "/fonts/app-sans-variable-hangul.woff2"
    ]) {
      expect(indexHtml).toContain(`rel="preload"`);
      expect(indexHtml).toContain(`href="${fontPath}"`);
      expect(indexHtml).toContain(`as="font"`);
      expect(indexHtml).toContain(`type="font/woff2"`);
      expect(indexHtml).toContain("crossorigin");
    }
  });

  it("does not expose source design-system branding in project files", () => {
    const paths = collectFiles(rootDir);
    const pathOffenders = paths.filter((path) => sourceBrandPattern.test(path));
    const contentOffenders = paths
      .filter((path) => textExtensions.has(getExtension(path)))
      .filter((path) => sourceBrandPattern.test(readFileSync(join(rootDir, path), "utf8")));

    expect([...new Set([...pathOffenders, ...contentOffenders])]).toEqual([]);
  });
});
