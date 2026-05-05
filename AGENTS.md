# Repository Guidelines

## Project Structure & Module Organization
This is a Vite, React 19, TypeScript shortcut-cheatsheet app. Runtime source lives in `src/`: `main.tsx` bootstraps the app, `App.tsx` wires layout, `components/` contains UI, `data/` stores shortcuts and categories, `types/` holds shared contracts, and `utils/` contains helper logic plus nearby tests. Static deploy assets belong in `public/`; screenshots and README media belong in `docs/`. Root config includes `vite.config.ts`, `eslint.config.js`, `tsconfig*.json`, and `mise.toml`.

## Build, Test, and Development Commands
- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the Vite development server.
- `npm run build`: run TypeScript project build, then create `dist/`.
- `npm run lint`: run ESLint across the repository.
- `npm test`: start Vitest in watch mode.
- `npm test -- --run`: run Vitest once for CI-style verification.
- `npm run preview`: serve the production build locally.
- `mise run dev`, `mise run build`, `mise run preview`: task shortcuts using the Node version in `mise.toml`.

## Coding Style & Naming Conventions
Use TypeScript ES modules, 2-space indentation, double quotes, and semicolons. React components use PascalCase filenames and exports, for example `ShortcutSearch.tsx`; hooks, handlers, utilities, and data arrays use camelCase. Keep shortcut data aligned with `src/types/shortcut.ts`: `category`, `action`, `mac`, `win`, and `keywords`. Prefer Tailwind utility classes in JSX and reserve `src/index.css` or `src/App.css` for shared styling. Run `npm run lint` before submitting changes.

## Testing Guidelines
Vitest is configured in `vite.config.ts` with `jsdom`. Place tests beside the code they validate using `*.test.ts` or `*.test.tsx`, as in `src/utils/keyboardUtils.test.ts`. Use `describe`, `it`, `expect`, and `vi`; stub browser globals for platform-specific keyboard behavior. Add or update tests when changing keyboard formatting, search behavior, category filtering, or shortcut data normalization. There is no formal coverage threshold, but changed logic should have focused regression coverage.

## Commit & Pull Request Guidelines
Recent history follows Conventional Commit-style prefixes such as `feat:`, `fix:`, `chore:`, `docs:`, and `build:`. Keep subjects short and scoped, for example `feat: add search keyword suggestion`. Pull requests should include a summary, linked issue when available, verification commands, and screenshots or GIFs for visible UI changes. Note edits to `src/data/`, `public/`, or `docs/` so reviewers can check data and asset impact.

## Security & Configuration Tips
Do not commit secrets, local `.env` files, or generated `dist/` output. Keep dependency changes intentional and reflected in both `package.json` and `package-lock.json`. When updating runtime versions, keep `README.md` and `mise.toml` consistent.
