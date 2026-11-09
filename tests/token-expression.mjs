#!/usr/bin/env node
// A token may be an expression of others, such as pane-toolbar-height's calc(): the stylesheet writes each name as its
// custom property, and the generator refuses a name inside the expression that the file does not define, as it does a
// whole reference. Runs the generator on a copy of the token file, in a temporary directory, once as it is and once with
// one name changed.
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const KEY = 'pane-toolbar-height';
const source = JSON.parse(readFileSync(join(root, 'tokens', 'coolms.tokens.json'), 'utf8'));

const generate = (file) => {
    const dir = mkdtempSync(join(tmpdir(), 'token-expression-'));
    mkdirSync(join(dir, 'tools'));
    mkdirSync(join(dir, 'tokens'));
    mkdirSync(join(dir, 'dist'));
    copyFileSync(join(root, 'tools', 'design-tokens.mjs'), join(dir, 'tools', 'design-tokens.mjs'));
    writeFileSync(join(dir, 'tokens', 'coolms.tokens.json'), JSON.stringify(file));
    const run = spawnSync(process.execPath, [join(dir, 'tools', 'design-tokens.mjs')], { encoding: 'utf8' });
    let css = '';
    try {
        css = readFileSync(join(dir, 'dist', 'coolms-tokens.css'), 'utf8');
    } catch {
        // not written
    }
    rmSync(dir, { recursive: true });

    return { status: run.status, text: run.stdout, css };
};

const failures = [];
const expect = (name, condition, detail) => {
    console.log(`${condition ? 'ok  ' : 'FAIL'} ${name}`);
    if (!condition) {
        failures.push(`${name}: ${detail}`);
    }
};

expect(`the token file has ${KEY} as an expression`, /\{cms\.[a-z0-9-]+\}.*\{cms\.[a-z0-9-]+\}/.test(source.cms?.[KEY]?.$value ?? ''), JSON.stringify(source.cms?.[KEY]));

const asIs = generate(source);
expect('the file as it is generates', asIs.status === 0, asIs.text);
expect('...writing each name as its custom property',
    asIs.css.includes(`--cms-${KEY}: calc(var(--cms-row-height) + 2 * var(--cms-space-2));`),
    asIs.css.split('\n').find((line) => line.includes(KEY)) ?? 'no line');

const broken = structuredClone(source);
broken.cms[KEY].$value = broken.cms[KEY].$value.replace('{cms.space-2}', '{cms.space-no-such}');
const refused = generate(broken);
expect('a name the file does not define, inside the expression, is FOUND', refused.status === 1, `exit ${refused.status}: ${refused.text}`);
expect('...naming it', refused.text.includes(`cms.${KEY} refers to cms.space-no-such`), refused.text);
expect('...and writing nothing', refused.css === '', 'a stylesheet was written');

if (failures.length > 0) {
    console.log(failures.join('\n'));
    process.exit(1);
}
