import { readFileSync } from 'node:fs';
export const templates = JSON.parse(readFileSync(new URL('./templates.json', import.meta.url), 'utf8'));
import { composePrompt } from './composer.js';
export { composePrompt } from './composer.js';
export function fromTemplate(id, overrides = {}) {
  const template = templates.find(item => item.id === id);
  if (!template) throw new Error(`Unknown template: ${id}. Use --list to see available templates.`);
  if (!overrides || typeof overrides !== 'object' || Array.isArray(overrides)) throw new TypeError('Expected an overrides object');
  return composePrompt({ ...template, ...overrides });
}
