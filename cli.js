#!/usr/bin/env node
import { templates, fromTemplate } from './index.js';
const args = process.argv.slice(2);
const allowed = new Set(['subject', 'outfit', 'action', 'setting', 'style', 'lighting', 'composition']);
try {
  if (args.length === 0 || args[0] === '--help') {
    console.log('Usage: node cli.js <template-id> [--field "value"]\n       node cli.js --list\nFields: ' + [...allowed].join(', '));
  } else if (args[0] === '--list' && args.length === 1) {
    console.log(templates.map(t => `${t.id}: ${t.name}`).join('\n'));
  } else {
    const overrides = {};
    for (let i = 1; i < args.length; i += 2) {
      const key = args[i].slice(2);
      if (!args[i].startsWith('--') || !allowed.has(key) || args[i + 1] === undefined || args[i + 1].startsWith('--')) throw new Error(`Invalid option: ${args[i]}`);
      overrides[key] = args[i + 1];
    }
    console.log(fromTemplate(args[0], overrides));
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
