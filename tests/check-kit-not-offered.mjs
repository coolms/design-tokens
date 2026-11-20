#!/usr/bin/env node
// A kit that does not offer a component on purpose does not owe the state named after it elsewhere in the contract:
// `state` has a kind `elevation-required`, and a kit whose clients never elevate declares that component not offered.
// Builds a kit covering everything from the contract itself, then takes that one thing away, with and without the reason.
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contract = name => JSON.parse(readFileSync(join(root, 'contract', name), 'utf8'));
const components = contract('components.json').components;
const serverStates = contract('server-states.json').states;
const OFF = 'elevation-required';

const full = () => ({
    kit: 'a control kit',
    components: Object.fromEntries(
        Object.entries(components).map(([name, spec]) => [name, { implementedBy: name, states: [...spec.states] }]),
    ),
    serverStates: Object.fromEntries(serverStates.map(state => [state.id, { where: 'somewhere' }])),
});
const without = kit => {
    delete kit.components[OFF];
    kit.components.state.states = kit.components.state.states.filter(state => state !== OFF);

    return kit;
};

const dir = mkdtempSync(join(tmpdir(), 'check-kit-'));
const answer = kit => {
    const file = join(dir, 'kit.json');
    writeFileSync(file, JSON.stringify(kit));
    const run = spawnSync(process.execPath, [join(root, 'tools', 'check-kit.mjs'), file], { encoding: 'utf8' });

    return { status: run.status, text: run.stdout };
};

const failures = [];
const expect = (name, condition, detail) => {
    console.log(`${condition ? 'ok  ' : 'FAIL'} ${name}`);
    if (!condition) {
        failures.push(`${name}: ${detail}`);
    }
};

const covering = answer(full());
expect('a kit covering everything is CLEAR', covering.status === 0, covering.text);

const silent = answer(without(full()));
expect('taking it away with no reason is FOUND', silent.status === 1, silent.text);
expect('...naming the component', silent.text.includes(`component ${OFF}: not provided`), silent.text);
expect('...and the state', silent.text.includes(`state "${OFF}" not rendered`), silent.text);

const said = answer({ ...without(full()), notOffered: { [OFF]: "this kit's clients never elevate" } });
expect('taking it away with the reason is CLEAR', said.status === 0, said.text);

const another = without(full());
another.components.state.states = another.components.state.states.filter(state => state !== 'loading');
const other = answer({ ...another, notOffered: { [OFF]: "this kit's clients never elevate" } });
expect('another state is still owed', other.status === 1 && other.text.includes('state "loading" not rendered'), other.text);

rmSync(dir, { recursive: true });
if (failures.length > 0) {
    console.log(failures.join('\n'));
    process.exit(1);
}
