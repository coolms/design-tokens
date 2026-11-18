#!/usr/bin/env node
// A size a touch screen needs larger carries a coarse-pointer value: the stylesheet writes it once more inside
// `@media (pointer: coarse)`, and the stylesheet check keeps that block and no other at-rule. Runs the generator on a
// copy of the token file, in a temporary directory, once as it is and once with a coarse value on a colour.
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { faults } from '../tools/check-css.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = JSON.parse(readFileSync(join(root, 'tokens', 'coolms.tokens.json'), 'utf8'));

const generate = (file) => {
    const dir = mkdtempSync(join(tmpdir(), 'coarse-pointer-'));
    mkdirSync(join(dir, 'tools'));
    mkdirSync(join(dir, 'tokens'));
    mkdirSync(join(dir, 'dist'));
    copyFileSync(join(root, 'tools', 'design-tokens.mjs'), join(dir, 'tools', 'design-tokens.mjs'));
    writeFileSync(join(dir, 'tokens', 'coolms.tokens.json'), JSON.stringify(file));
    const run = spawnSync(process.execPath, [join(dir, 'tools', 'design-tokens.mjs')], { encoding: 'utf8' });
    let css = '';
    let ts = '';
    try {
        css = readFileSync(join(dir, 'dist', 'coolms-tokens.css'), 'utf8');
        ts = readFileSync(join(dir, 'dist', 'coolms-tokens.ts'), 'utf8');
    } catch {
        // not written
    }
    rmSync(dir, { recursive: true });

    return { status: run.status, text: run.stdout, css, ts };
};

const failures = [];
const expect = (name, condition, detail) => {
    console.log(`${condition ? 'ok  ' : 'FAIL'} ${name}`);
    if (!condition) {
        failures.push(`${name}: ${detail}`);
    }
};

const asIs = generate(source);
expect('the token file as it is generates', asIs.status === 0, asIs.text);
expect('...md is 40px with a mouse', /:root \{[^}]*--cms-control-height-md: 40px;/.test(asIs.css), 'no 40px md in :root');
expect('...and 44px on a coarse pointer',
    /@media \(pointer: coarse\) \{\s*:root \{\s*--cms-control-height-md: 44px;\s*\}\s*\}/.test(asIs.css), asIs.css.slice(-200));
expect('...the stylesheet check keeps it', faults(asIs.css).length === 0, faults(asIs.css).join('; '));
expect('...the app reads the heights as numbers, md 44 by touch',
    /controlHeight = \{\s*sm: 32,\s*md: 40,\s*lg: 44,/.test(asIs.ts) && /controlHeightCoarse = \{\s*sm: 32,\s*md: 44,\s*lg: 44,/.test(asIs.ts),
    asIs.ts.slice(asIs.ts.indexOf('controlHeight'), asIs.ts.indexOf('controlHeight') + 200));

const colour = structuredClone(source);
colour.cms.border.$extensions = { 'org.coolms': { ...colour.cms.border.$extensions['org.coolms'], coarse: '44px' } };
const refused = generate(colour);
expect('a coarse value on a colour is FOUND', refused.status === 1, `exit ${refused.status}`);
expect('...naming it', /cms\.border has a coarse-pointer value/.test(refused.text), refused.text);
expect('...and writing nothing', refused.css === '', 'a stylesheet was written');

for (const [name, block] of [
    ['another media query', '@media (pointer: fine) { :root { --cms-x: 1px; } }'],
    ['a declaration that is not a token', '@media (pointer: coarse) { :root { color: red; } }'],
    ['another selector', '@media (pointer: coarse) { .x { --cms-x: 1px; } }'],
]) {
    expect(`the stylesheet check refuses ${name} in an at-rule`, faults(asIs.css + block + '\n').length > 0, 'kept');
}

if (failures.length) {
    console.log(`FOUND -- ${failures.length} check(s) failed`);
    process.exit(1);
}
console.log('CLEAR -- the coarse-pointer sizes are written, kept and refused where they must be');
