import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { composePrompt, fromTemplate, templates } from './index.js';
test('all templates have unique IDs and produce complete prompts', () => {
  assert.equal(templates.length, 12);
  assert.equal(new Set(templates.map(t => t.id)).size, 12);
  for (const t of templates) {
    const result = fromTemplate(t.id);
    for (const field of ['subject', 'outfit', 'action', 'setting', 'style', 'lighting', 'composition']) assert.ok(result.includes(t[field]));
  }
});
test('overrides preserve identity and do not mutate templates', () => {
  const original = fromTemplate('sky-courier');
  const changed = fromTemplate('sky-courier', { setting: 'a winter station' });
  assert.ok(changed.includes(templates[0].subject));
  assert.ok(changed.includes('a winter station'));
  assert.equal(fromTemplate('sky-courier'), original);
});
test('blank fields and invalid inputs', () => {
  assert.equal(composePrompt({ subject: '  pilot ', setting: '' }), 'pilot');
  assert.throws(() => fromTemplate('missing'), /Unknown template/);
  assert.throws(() => composePrompt({ subject: 7 }), TypeError);
  assert.throws(() => fromTemplate('sky-courier', null), TypeError);
});
test('CLI supports overrides and rejects incomplete or unknown flags', () => {
  const run = (...args) => spawnSync(process.execPath, ['cli.js', ...args], { cwd: new URL('.', import.meta.url), encoding: 'utf8' });
  assert.equal(run('--list').stdout.trim().split('\n').length, 12);
  assert.ok(run('sky-courier', '--setting', 'winter station').stdout.includes('winter station'));
  assert.equal(run('sky-courier', '--setting').status, 1);
  assert.equal(run('sky-courier', '--unknown', 'x').status, 1);
});
