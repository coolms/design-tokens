# Changelog

All notable changes to the design tokens are listed here. Versions follow [semantic versioning](https://semver.org/).

## Unreleased

The file viewer, the file picker and the pane toolbar in the contract. 172 tokens (1 new). The components contract goes to 0.3.0.

- Added to the contract: `file-viewer`, one way to look at a file in every kit: its parts (overlay, top bar, viewer bar, content, thumbnails, previous and next, and a strip for a set of attachments), its states (loading, error and no-preview through `state`, and editing), adapters chosen by the server's content type, Edit drawn only with the server's write permission and hosting the existing editor in the overlay, with its save status, Done, a warning when the file changed elsewhere, and the state in the address; Print and Open separately in the top bar, keyboard and focus rules, and its behaviour on a phone. Not released until ui-react and ui-angular both implement it.
- Added to the contract: `file-picker`, one way to choose files that already exist in the person's spaces, such as Drive, without downloading and uploading them again. The kit knows no API: the host gives the spaces and lists folders page by page. The selection is kept across folders, with a chip that lists and clears it. An optional budget against a limit, such as a mailbox's message size, is computed in the kit, so every host disables the same files. The host adds its own reasons a file cannot be chosen. Keyboard rules for a multi-select list; the states through `state`, a folder the person may not open shown as denied in place; full screen on a phone. Not released until ui-react and ui-angular both implement it.
- Added to the contract: `pane-toolbar`, how the one row of actions at the top of a pane is drawn: the same height in every pane so the rows line up across a screen, and the side column's first element with them. Each action an icon and a label; as the row narrows, measured on its own width and never the window's, every label hides at once, each keeping its name and showing it as a tooltip, then actions go behind "More actions" by their overflow number, the lowest first, those sharing a number together, never one alone; an action with no number never goes. Icons are Bootstrap Icons names, each kit mapping them by one table to its own icons; a name the table lacks shows the label alone, also while the others hide theirs, and is measured that way. Danger as the node says, in the row and in the menu. A toolbar with one Tab stop and arrow keys, "More actions" a menu button, disabled and busy actions. Which actions a row holds, their groups, order, icons, overflow numbers and danger are the server's NaviGraph nodes, `{ id, label, icon, group, overflow?, danger?, disabled?, reason?, busy? }`, never the contract's; the host passes only those it has a handler for. Not released until ui-react and ui-angular both implement it.
- Added: `pane-toolbar-height`, the pane toolbar's row and the side column's first element: `calc(row-height + 2 * space-2)`, 52px.
- `pane-toolbar` gives way label by label: as the row narrows, labels hide one by one in the order actions would go behind "More actions" (by overflow number, the lowest first, those sharing a number together; actions with no number last, from the end of the row back), and only once every label is hidden do actions go behind "More actions". They come back in the reverse order. A new state, `labels-partly-hidden`. The overflow number already carries the order, so the server's nodes do not change.
- `pane-toolbar`, mail: after Archive, Delete or Move, where the list and the message show side by side, the next message opens: the one that took the removed message's place, or the one above it when it was the last, marked read as any message opened. Where one pane shows at a time, the list shows again. After an action on checked messages that included the open one, the nearest message not checked opens.
- `pane-toolbar`, mail: the grid fills the viewport below the section header at desktop widths, and the page never scrolls; each pane's action row and the list's search field stay put, with exactly one scroll region under them. The message pane scrolls once (header, body and raw source together); the mail frame grows to its content and never scrolls itself, and its sandbox is never weakened to measure it (never allow-scripts with allow-same-origin: either measured from outside with no scripts, or a host-only measuring script without same-origin). A quick reply stays at the pane's foot. The side column's left edge is the section header's content edge.
- `pane-toolbar`: overflow 0 means menu only: the action is only ever behind "More actions", which is drawn for it even alone. Mail: "Show original" (a menu-only server action) opens a full-screen viewer with one scroll, showing the source as escaped plain text (no HTML, links or images; invalid UTF-8 replaced), at most the first 1 MB with a note, with Copy (what is shown) and Download (.eml from the server). The frame height is recomputed after remote images load and when the pane narrows or widens; the inline raw source has no scroll of its own and leaves the pane once both hosts render Show original.
- `pane-toolbar`, mail: the mailbox card keeps one height at every width, its name and address each on one line with an ellipsis and in its tooltip, its count badge anchored to the avatar's top-right corner and never over the name or the avatar's letter. The folder column is at least 200px wide. Folder actions have no action row and no button in the row: the server's folder action tree is the folder row's context menu (right-click, long press on touch, Shift+F10 or the Menu key), with New folder at the foot of the list; Delete and Empty confirm with the server's preview as given; a folder whose job runs shows busy and offers neither job, and a failed job says why with Retry.
- `pane-toolbar`, mail: the notice of a move, a delete to Trash or an archive carries Undo for 10 seconds or until the next mail action, posting the server's undo token, with a sentence for a message moved since; never for Empty, a delete from Trash or a folder delete. The next message opens only when the action takes the open one out of the list as it shows. The quick reply sits at the foot of the message inside the one scroll, collapsed to "Reply..." until used, and Reply scrolls to it. The checked-rows bar leads with "× 2 selected" ("× 2" when narrow). The folder menu's long press is about 500 ms, and a failed folder job's notice comes with Retry and ends the row's busy state.
- `pane-toolbar`, mail: a message is marked read only by being opened, never by a render, a refresh, a realtime event or an update of its shared record. After Mark read or Mark unread the chosen state shows at once and nothing read or sent before the server's answer changes it (the answer carries the server's sequence; older events are dropped; of two read actions in flight the last chosen wins). After the answer the server is right: an event with the opposite state is a refusal the host says in a notice, never a silent revert.
- `pane-toolbar`, mail: a refusal that comes after the server first accepted a change (a rollback with its refusal event and reason) is said exactly as a refusal at once: the same notice in the same words, such as "Couldn't mark as unread: " and the host's words for the reason code (the server's sentence only for an unknown code), never a silent flip.
- `pane-toolbar`, mail: resizable panes in both hosts. A splitter between the folders and the list and one between the list and the message, dragged by mouse or touch, a focusable separator moved by the arrow keys (16 px), Home and End, and reset by a double-click. Folders 230 px (200 to 380), list 340 px (280 to 620), message at least 360 px. Widths are saved per person on the server, each host its own, local storage only a cache. No splitters where one pane shows at a time.
- `pane-toolbar`, mail: a message row has a context menu in both hosts, with the message action row's nodes drawn the same way. It opens by right-click, a long press on touch, Shift+F10 or the Menu key; arrows, Enter and Escape inside, and focus back on the row on close. On a checked row it acts on every checked message; on an unchecked row on that row only, the checked rows left as they were; actions follow the facts of what it acts on, Reply and Forward open compose without opening the message, and it opens at the pointer, or under the row from the keyboard, kept in the window. The browser's own menu stays in a message's body, in text fields, on links, and with Shift held.
- `pane-toolbar`, mail: the quick reply sits at the foot of the message, and at the pane's foot when the message is shorter than the pane, so it never moves up when the message gets shorter (as when Load images replaces broken placeholders). It stays inside the pane's one scroll region, and under a long message it follows the message.
- `pane-toolbar`, mail frame page: fonts. No font from a message ever loads, remote or data:, not even after Load images: font-src 'none' in both variants, and the server's sanitising drops external stylesheets and every @font-face rule. Both texts are written out in full.
- `pane-toolbar`, mail list: reading the same list again keeps its rows in place under a thin progress bar and replaces them when the answer is in; skeleton rows only on a list's first read.
- `pane-toolbar`, mail: a message is drawn in a mail frame page of the host's own origin (never srcdoc), with the sandbox exactly allow-same-origin allow-popups allow-popups-to-escape-sandbox and never allow-scripts, measured from outside. One Content-Security-Policy text for both hosts, with a Load images variant adding https: to img-src, plus Referrer-Policy: no-referrer and X-Content-Type-Options: nosniff; each host tests that its page serves exactly that. The earlier script-measured form is withdrawn.
- `pane-toolbar`, mail frame page: the host forces rel="noopener noreferrer" on every link before the HTML goes in; the page carries a base target and never a base address; and the frame is measured from outside without observing the size of anything inside its document (a resize loop in browsers): the frame element's width, a MutationObserver, and image load and error, one fit per animation frame on a change of at least 1px.
- `pane-toolbar`, mail: actions show their result at once, before the server answers. Archive, Delete and Move take the message out of the list and open the next one; Mark read or unread and Star change at once. A notice says what was done. A refusal puts the message back in its place, reopening it only when the next message is still shown untouched, and its notice replaces the done-notice with the reason; nothing is retried by itself. The toolbar, the row's menu and the checked-rows bar read one record per message, so an action shown on one is shown on all. Undo comes later.
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
