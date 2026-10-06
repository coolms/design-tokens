# Changelog

All notable changes to the design tokens are listed here. Versions follow [semantic versioning](https://semver.org/).

## 0.1.0 (2026-10-06)

The first version. The tokens move here from the admin theme, where they were generated until now. Every value is
unchanged.

- `tokens/coolms.tokens.json`: the source, with 101 tokens.
- `dist/coolms-tokens.scss`: the admin's light and dark custom properties. Below its header line it is identical to
  the file the admin theme generated before.
- `dist/coolms-tokens.ts`: the app's module, with `light`, `dark` and `radius` unchanged.
- Added: `accent` in `dist/coolms-tokens.ts`, the brand accent's five tokens per scheme (`base`, `hover`, `light`,
  `text`, `fg`). These are the app's default accent.
