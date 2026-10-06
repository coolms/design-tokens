# CoolMS design tokens

The colours, radii and other design tokens of CoolMS, from one source file, so the admin and the app cannot drift
apart.

## What is here

| Path | What it is |
|---|---|
| `tokens/coolms.tokens.json` | The source, in the [Design Tokens Community Group](https://tr.designtokens.org/format/) format. Each colour has a light value and either a dark value or a stated reason it does not change. |
| `tools/design-tokens.mjs` | The generator. It reads the source and writes the two files below. |
| `dist/coolms-tokens.scss` | CSS custom properties: a `:root` block for the light scheme and a `:root[data-theme='dark']` block for what changes in the dark one. |
| `dist/coolms-tokens.ts` | A plain-data module for React Native: `light`, `dark`, `radius` and `accent`, with no runtime code. |

Never edit a file in `dist/` by hand. Change the source, then regenerate.

## Generating and checking

Node 22 or later, and no dependencies:

```sh
node tools/design-tokens.mjs          # writes both dist files
node tools/design-tokens.mjs --check  # writes nothing; checks both dist files are what the source generates
```

The generator refuses, and writes nothing, when a colour has neither a dark value nor a reason it doesn't change,
or when a token names one that doesn't exist.

| Exit code | Meaning |
|---|---|
| 0 | Written, or current |
| 1 | A token was refused, or (with `--check`) a dist file is out of date |
| 2 | The source could not be read |

## Using the tokens

A consumer copies a dist file at a tagged version and records it in a lock file, `design-tokens.lock.json`:

```json
{
  "repository": "coolms/design-tokens",
  "tag": "v0.1.0",
  "commit": "<the tag's commit>",
  "files": {
    "dist/coolms-tokens.scss": { "to": "<the consumer's path>", "sha256": "<the file's sha256>" }
  }
}
```

The consumer's CI checks two things:
- each copied file hashes to the lock's `sha256`;
- the file at the lock's `commit` hashes the same, and that commit is the tag's.

To move to a new version, a consumer opens a pull request that changes the lock and the copy together.

## Versions

Versions follow [semantic versioning](https://semver.org/): a removed or renamed token is a major change, an added
token a minor one, and a changed value a patch. Each version is listed in [CHANGELOG.md](CHANGELOG.md).

## License

[MIT](LICENSE).
