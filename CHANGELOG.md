# Changelog

All notable changes to the design tokens are listed here. Versions follow [semantic versioning](https://semver.org/).

## 0.6.0 (unreleased)

The tokens of the Workspace's look, and Inter. 158 tokens (52 new); two values change, one of them in both schemes.

- Changed, for contrast, in both the admin and the Workspace: `text-muted` #69707c to #4b5563 (7.6:1 on white), and
  `danger` #dc2626 to #b91c1c (6.5:1). `danger`'s dark value changes too, #ef4444 to #f87171: 5.7:1 on the dark
  surface, where #ef4444 was 4.19:1, and 6.5:1 under a danger button's dark label. `text-muted`'s dark value does not
  change.
- Added: `button-chrome-bg`, a navy button or selection on a page's surface (Compose, Call, Sign in, a selected
  filter chip, a sent chat bubble): the chrome's #1a2332 in light, and #2d3f57 in dark, where the chrome's own
  #131c28 sits on the dark surface at 1.09:1.
- Added: `button-chrome-border`, the 1px edge of a navy button or selection: the fill itself in light, so nothing
  shows, and #6b7f96 in dark, 3.83:1 against the surface where the fill alone is 1.47:1.
- Added: `row-selected` (a selected row in a list; the admin keeps its amber selection), `border-input` #8b929c (a
  field's boundary, 3.1:1 on white), `success-strong` #15803d (green as text, 5.0:1; `success` stays for dots).
- Added: six avatar pairs, `avatar-1-bg` / `avatar-1-fg` to `avatar-6-*`, a light tint with dark initials (8.1:1 or
  more), inverted in dark.
- Added: the type scale -- `font-sans` (Inter, then the system stack), `font-weight-regular` / `-medium` /
  `-semibold` / `-bold` (400 to 700), `font-size-label-sm` 11px to `font-size-display-lg` 36px, and two line heights.
- Added: radii by use -- `radius-control` 10px (buttons, rows), `radius-field` 12px, `radius-card` 12px,
  `radius-bubble` 16px with `radius-bubble-tail` 4px, `radius-dialog` 24px, `radius-pill`. The size radii
  (`radius-sm` to `radius-lg`) stay for the admin.
- Added: the spacing scale `space-1` to `space-12` (4px to 48px, on 4 and 8), and the Workspace's `rail-width` 80px
  and `topbar-height` 64px.
- Every new colour has a dark value.
- Added: Inter, self-hosted under the SIL Open Font License 1.1 (`fonts/OFL.txt`): one variable woff2 per subset --
  Latin (48,256 bytes), Latin Extended (85,068) and Cyrillic (18,748), 152,072 bytes for weights 400 to 700 -- and
  `fonts/inter.css`, whose `unicode-range` lets a browser fetch only the subsets a page uses. Exported as
  `./fonts/inter.css` and `./fonts/*`.

## 0.5.0 (2026-10-28)

A stylesheet a web page reads as CSS. 106 tokens; no token changes, and the SCSS and TypeScript files do not change.

- Added: `dist/coolms-tokens.css`, exported as `./tokens.css`: the same `:root` and `:root[data-theme='dark']` blocks
  as the SCSS file, with its header written as a CSS comment. The SCSS file's `//` header is a comment in SCSS but not
  in CSS, so a page that read that file as CSS lost its whole light `:root` block.
- Added: `tools/check-css.mjs <file>`, which refuses a token stylesheet a browser would not keep whole: comments only
  as `/* ... */`, rules only `:root` and `:root[data-theme='dark']`, only `--cms-*` declarations in them, and at least
  one in `:root`. CI runs it on `dist/coolms-tokens.css`, and on `tests/broken-tokens.css`, a `//` header, which it
  must fail.
- Changed: the LICENSE's copyright line names its holder, as the other CoolMS packages' do (it read "CoolMS"). The
  licence, MIT, is unchanged.

## 0.4.0 (2026-10-23)

The UI contract moves here, beside the tokens. 106 tokens; no token or generated file changes.

- Added: the UI contract, beside the tokens, so every CoolMS UI kit checks against one source.
  - `contract/components.json` lists the 16 components every kit provides, and the states each must render.
  - `contract/server-states.json` lists the 9 server-decided states, and reactions R1 to R6 every client gives to
    them.
  - `tools/check-kit.mjs <kit.contract.json>` answers whether a kit's declaration covers both.
  - They are the package's own exports: `./contract/components.json`, `./contract/server-states.json` and
    `./check-kit`. The tokens are exported as `./tokens.scss` and `./tokens.ts`.
- Changed, **breaking**: requires Node 22, 24 or 26. `engines.node` moves from `>=22` to
  `^22.0.0 || ^24.0.0 || ^26.0.0`, exactly the Node lines CI runs; the odd lines and Node 27 and later are not
  declared until CI runs them, and CI checks the range against its matrix. The package has no dependencies, so no
  floor within a line is higher than its first release. The tokens and the generated files do not change.

## 0.3.0 (2026-10-21)

Text on an accent fill under the name a component already used for it. 106 tokens. Nothing existing changed.

- Added: `accent-contrast`, an alias of `accent-fg` (#1a1a1a, 8.59:1 on the accent), in both schemes. The admin's
  toast count badge asked for `--cms-accent-contrast`, which nothing defined, so it painted its own fallback: white
  on the amber, 2.03:1. With this token it is 8.59:1.

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
