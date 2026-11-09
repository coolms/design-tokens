# Changelog

All notable changes to the design tokens are listed here. Versions follow [semantic versioning](https://semver.org/).

## Unreleased

The file viewer, the file picker and the pane toolbar in the contract. 172 tokens (1 new). The components contract goes to 0.3.0.

- Added to the contract: `file-viewer`, one way to look at a file in every kit: its parts (overlay, top bar, viewer bar, content, thumbnails, previous and next, and a strip for a set of attachments), its states (loading, error and no-preview through `state`, and editing), adapters chosen by the server's content type, Edit drawn only with the server's write permission and hosting the existing editor in the overlay, with its save status, Done, a warning when the file changed elsewhere, and the state in the address; Print and Open separately in the top bar, keyboard and focus rules, and its behaviour on a phone. Not released until ui-react and ui-angular both implement it.
- Added to the contract: `file-picker`, one way to choose files that already exist in the person's spaces, such as Drive, without downloading and uploading them again. The kit knows no API: the host gives the spaces and lists folders page by page. The selection is kept across folders, with a chip that lists and clears it. An optional budget against a limit, such as a mailbox's message size, is computed in the kit, so every host disables the same files. The host adds its own reasons a file cannot be chosen. Keyboard rules for a multi-select list; the states through `state`, a folder the person may not open shown as denied in place; full screen on a phone. Not released until ui-react and ui-angular both implement it.
- Added to the contract: `pane-toolbar`, the one row of actions at the top of a pane, the same height in every pane so the rows line up across a screen, and the side column's first element with them. Actions in ordered groups with separators, a trailing status slot, and a `...` menu. As the row narrows, measured on its own width and never the window's: every label hides at once, each keeping its name and showing it as a tooltip, then actions go behind `...` in the host's overflow order, pinned ones never. Only the delete-kind action is drawn as danger. A toolbar with one Tab stop and arrow keys, `...` a menu button named "More actions", disabled and busy actions. Mail is the reference instance: Refresh and "Synced at" in the list pane; Reply, Forward, then Archive, Delete, then Mark unread, Star, Move above the subject, Reply, Forward, Archive and Delete pinned, Star going first, then Move, then Mark unread. Archive shows only where the mailbox has an archive folder, and is not destructive. The contract fixes the Reply button, not the editor: an inline reply, focused and scrolled into view with a way to the full compose form, or the compose form. Not released until ui-react and ui-angular both implement it.
- Added: `pane-toolbar-height`, the pane toolbar's row and the side column's first element: `calc(row-height + 2 * space-2)`, 52px.
- `tools/design-tokens.mjs`: a token may be an expression of others, such as `calc({cms.row-height} + 2 * {cms.space-2})`. The stylesheet writes each name as its custom property, and the generator refuses a name inside an expression that the file does not define, as it does a whole reference (`tests/token-expression.mjs`).

## 0.7.1 (unreleased)

- `tools/check-kit.mjs`: a component a kit declares `notOffered` is no longer owed as a state of another component. The contract says a kit whose clients never elevate does not offer `elevation-required`, and the checker still asked for that kind on `state`.

## 0.7.0 (2026-11-05)

One state component for every kit. 171 tokens (8 new); the components contract goes to 0.2.0.

- Added to the contract: `state`, one component for every state a page, a card or a line of text can be in instead
  of its content. `kind` is loading, empty, error, denied or elevation-required; `title` and `description` are the
  caller's words; an optional `action` (Retry, or the kit's own Elevate, the error banner's flow); `placement` is
  page (centred in the content area), block (centred in its card) or inline (small, beside text). A loading state
  shows nothing, neither spinner nor title, until `state-delay`, then both together, so a fast read does not
  flash. Every kind is `role="status"` with `aria-live="polite"`, and shows the caller's words as given, adding
  none of its own beyond its action's label. `denied` offers no action: a refusal is the server's last word. A kit declares the ten states it renders: the five kinds, the three placements,
  `with-action` and `delayed`.
- `loading`, `empty-state` and `elevation-required` are superseded by `state`: they stay in the contract until every
  kit implements `state`, then leave it. `error-banner` stays, for a failed read above content that is still shown.
- Added: the spinner, `spinner-color` (the accent text colour: 7.2:1 on the light surface, 9.6:1 on the dark),
  `spinner-track` (the border colour), `spinner-size-inline` 16px, `spinner-size-block` 24px, `spinner-size-page`
  32px, `spinner-stroke` 2px and `spinner-duration` 800ms (one turn); and `state-delay` 300ms.

## 0.6.0 (2026-10-30)

The tokens of the Workspace's look, and Inter. 163 tokens (57 new); two values change, one of them in both schemes.

- Changed, for contrast, in both the admin and the Workspace: `text-muted` #69707c to #4b5563 (7.6:1 on white), and
  `danger` #dc2626 to #b91c1c (6.5:1). `danger`'s dark value changes too, #ef4444 to #f87171: 5.7:1 on the dark
  surface, where #ef4444 was 4.19:1, and 6.5:1 under a danger button's dark label. `text-muted`'s dark value does not
  change.
- Added: `button-chrome-bg`, a navy button or selection on a page's surface (Compose, Call, Sign in, a selected
  filter chip, a sent chat bubble): the chrome's #1a2332 in light, and #2d3f57 in dark, where the chrome's own
  #131c28 sits on the dark surface at 1.09:1.
- Added: `button-chrome-border`, the 1px edge of a navy button or selection: the fill itself in light, so nothing
  shows, and #6b7f96 in dark, 3.83:1 against the surface where the fill alone is 1.47:1.
- Added: the layout's widths, so the kit is responsive by its tokens: `breakpoint-tablet` 600px and
  `breakpoint-desktop` 1200px (phone below 600px, tablet from 600px, desktop from 1200px), `rail-width-compact`
  64px (the icons-only rail at tablet width), `tabbar-height` 56px (the phone's bottom tab bar) and
  `touch-target-min` 44px (the smallest touch target at touch widths).
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
