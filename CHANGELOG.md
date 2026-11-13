# Changelog

All notable changes to the design tokens are listed here. Versions follow [semantic versioning](https://semver.org/).

## Unreleased

The file viewer, the file picker, the pane toolbar and the notification in the contract. 172 tokens (1 new). The components contract goes to 0.3.0.

- `pane-toolbar`, mail, quick reply: a reply draft that has gone to the compose window never returns to the box, which cannot show the window's recipients, Cc, subject, quote or formatting. With the window closed and the draft kept, the box's line shows the start of the draft with Open (the compose window on it) and Discard (with the 10 s Undo); once the reply is sent or the draft discarded, the line is the empty box again.
- `pane-toolbar`, mail: an attachment is viewed only as the server's viewAs says (pdf, image or none, from its first bytes, never its type or name; never SVG or HTML). View is offered for pdf and image only; a pdf opens in the PDF viewer with nothing in it run, an image in a preview over the page from the bytes under the type the download serves, Esc closing it; never a new tab. Once served, viewAs replaces the declared type (none means no View); the viewer's label shows the detected kind and the attachment line keeps the declared type. Download and Save to Drive stay for every attachment.
- `pane-toolbar`, mail, mailbox card: a mailbox's unread number is its inbox's alone, served by the server for each mailbox; a host never sums folders (Gmail counts one message in several), and until the server serves it takes the inbox's number from the folder tree and a change event's inbox entry. The card's avatar badge is the open mailbox's number, a dot labelled Unread mail in other mailboxes shows when another has unread mail, and the navigation's Mail badge sums each mailbox's inbox number once.
- `pane-toolbar`, mail: a folder row keeps one height at every width; its icon, unread badge and total never shrink or wrap, and only the name gives way (one line, ellipsis, the full name in a tooltip and as its accessible name). One total per row: the server's once a sync has read it, else the platform's, none on a folder that only holds folders; how much is stored goes in the tooltip or the sync line, only when both are known and differ. The folder column is never narrower than its widest row (indent, icon, badge, total) plus 6ch of name over every folder, or 200px, whichever is larger; the splitter stops there, and a saved width below it is shown raised and written back only on a splitter move.
- `notification`: pressing a row marks it read, whatever it carries, and expanding it does too; only a row action with a known destination navigates, and a button action only from its button. A row with no destination navigates nowhere but can still be read.
- `notification`: a notification may be updated in place (same id, new title, body, extras and createdAt, as grouped missed calls): the host replaces the row, places it again by createdAt, counts it once among the unread, and keys one shown outside the app by its id so it is replaced, never repeated.
- `notification`: an action's presentation is the server's, button (the default) or row. With row, no button is shown and the whole row is a real interactive element, named by the label and opened by a click, a tap or Enter, as for missed calls and mentions (chat.conversation). At most one row action per notification. A host never navigates by notification type: no destination, or an unknown one, leaves the row inert.
- `pane-toolbar`, mail: every folder row carries an icon by the folder's role, the same table in both hosts (inbox, send, file-earmark-text, archive, trash, star, bookmark, exclamation-octagon, and folder for any other), decorative, the row's name its label.
- `pane-toolbar`, mail: the list and search results (the platform's and More on the server) load more as the person scrolls, in both hosts, rows carrying aria-posinset and aria-setsize: the next page asked for with about 1.5 screens left, a Loading... row at the end that becomes Couldn't load with Retry, or Retry in N s on a 429 (the only retry; no Load older button). A virtualized list, only rows in view and a small buffer in the page. New mail never moves the scroll; a New messages: N pill scrolls to the top. Select all checks the loaded rows; selecting a whole folder on the server is not offered.
- `pane-toolbar`, mail: drafts are the server's, never only the browser's. A reply, reply all or forward draft records what it answers; there is at most one reply draft per person per message (reply and reply all share it), shared by the quick reply and the compose window on any device and in either host, while a forward may have several. Saves are versioned (a stale save reloads, never overwrites), a realtime event brings changes made elsewhere, the server keeps the threading headers (never built in the browser), and the draft is deleted only after a successful send. In Plain text the server appends the quote as "> " lines; quote.text is only the read-only preview.
- Added to the contract: `notification`, one notification in the bell's list, the same in both hosts. Its title and body are drawn as plain text, always, whatever bodyFormat says, never made a link, and its chevron only expands and collapses. An optional action { label, labelText, destination: { name, params } }: label is a code the host translates, labelText the server's fallback, and the destination a registered name with the params its route needs, which each host maps to its own route. A known one shows as a button under the text; an unknown name or a missing required param shows no button. The action grants nothing.
- `pane-toolbar`, mail: a message whose own folder is the spam folder (the junk role) keeps remote content blocked, in both hosts, however it was opened (a list, search, conversation, the next message or an address): no Load images, links drawn as text, and a warning that it was marked as spam; only its folder changing lifts them, a realtime move included. Drafts lists every draft: those written here come from the drafts API and stay editable in the compose window, those another app wrote are listed from the server, marked as from another app and read-only.
- `pane-toolbar`, mail, compose window: the editor uses the mail profile (name mail: bold, italic, underline, strike, links, two heading levels, lists and quote, nothing else), served at GET /api/v1/email/editor-profile as { profile, contributors, allowedWidgets } and built from the same definition the server sanitises a sent message with. The standard profile stands in until it is served.
- `pane-toolbar`, mail: quick reply and Reply are two modes. The quick reply is a chat-like box pinned at the bottom of the message pane, outside its scroll (this replaces its place at the foot of the message): one line until used, growing to about 6 lines, plain text and attachments, no To or Subject, Ctrl+Enter sends, the quote appended by the server and not shown. Reply, Reply all and Forward always open the compose window prefilled from the server, the editor empty and the quote read-only below it in the sandboxed mail frame, with Remove quote; the quote is never in the editor, and the host always sends the quote choice explicitly (the server defaults to off for a reply, on for a forward). Expand, or Reply while the box holds text, moves its text and attachments into the window as one draft: the box's text is a saved draft, autosaved like the window's, and the window takes that same draft.
- `pane-toolbar`, mail: a folder not fully synced lists the mail server's rows in the same list, in the server's order, paged by cursor. A server row offers Open only (no checkbox, no menu or bar actions); opening stores it and opens it by id, and the host then marks it read as on any open (the opener marks nothing read). A stale cursor starts the list again; an unreachable server keeps the rows shown with Try again. Older on the mail server is for the inbox only. Counts are the server's, never the rows shown.
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
- `pane-toolbar`, mail, compose window: the editor toolbar is built from the mail editor profile the mail API serves (GET /api/v1/email/editor-profile), generated from what the sanitiser keeps on send, so nothing offered is stripped (the standard profile until it is served). No Cancel button beside Close. Discard is always offered: without a saved draft it just closes; with one it deletes it, with the 10 s Undo, waiting for a save still on its way so the draft never survives the Discard.
- `pane-toolbar`, mail: the compose window, the same in both hosts. Docked at the bottom right and not modal; Minimize to a bar with the subject and recipients, Maximize to a centred window over a backdrop (a click on it minimizes), Close keeps the draft, only Discard deletes it, with a 10 s Undo. Esc minimizes, Ctrl+Enter sends. Up to 3 windows, minimized ones as bars to the left, a 4th closing the oldest with its draft kept. Full screen on a phone. From (with confirmed aliases), To, Cc, Bcc as chips with suggestions, Subject, the formatting editor (the standard profile until the mail API names one) with a Plain text switch that asks before an edited plain text replaces the formatting, attachments from the computer and Drive with the size meter, Send, Discard, and autosave; a quick reply's Open full compose opens it prefilled.
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
