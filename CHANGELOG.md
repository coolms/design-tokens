# Changelog

All notable changes to the design tokens are listed here. Versions follow [semantic versioning](https://semver.org/).

## 0.2.0 (2026-10-07)

Danger and success on the navy chrome, each a fill with its text colour, for the buttons of a call panel: Decline
and Hang up red, Answer green. 105 tokens. Nothing existing changed.

- Added: `chrome-danger` (#dc2626) and `chrome-danger-fg` (#ffffff). Against the chrome 3.27:1 in light and 3.55:1
  in dark; white on it 4.83:1.
- Added: `chrome-success` (#15803d) and `chrome-success-fg` (#ffffff). Against the chrome 3.15:1 in light and
  3.42:1 in dark; white on it 5.02:1. Darker than `success` (#16a34a), which takes white text at only 3.30:1.
- All four are the same in both schemes, like `on-chrome` and `chrome-edge`: the chrome is navy in both.

## 0.1.0 (2026-10-06)

The first version. The tokens move here from the admin theme, where they were generated until now. Every value is
unchanged.

- `tokens/coolms.tokens.json`: the source, with 101 tokens.
- `dist/coolms-tokens.scss`: the admin's light and dark custom properties. Below its header line it is identical to
  the file the admin theme generated before.
- `dist/coolms-tokens.ts`: the app's module, with `light`, `dark` and `radius` unchanged.
- Added: `accent` in `dist/coolms-tokens.ts`, the brand accent's five tokens per scheme (`base`, `hover`, `light`,
  `text`, `fg`). These are the app's default accent.
