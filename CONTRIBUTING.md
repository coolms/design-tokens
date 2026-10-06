# Contributing

1. Change `tokens/coolms.tokens.json`. Give every new colour a dark value, or an `invariant` saying why it doesn't
   change.
2. Run `node tools/design-tokens.mjs`, and commit the source and both `dist/` files together.
3. Open a pull request against `develop`. CI runs `node tools/design-tokens.mjs --check` on Node 22 and 24.
4. If a change alters a colour someone can see, include before and after screenshots of the light and dark schemes.
5. Add a line to [CHANGELOG.md](CHANGELOG.md) under the next version.

The repository is pull-request only: nothing is pushed to `develop` or `main` directly.
