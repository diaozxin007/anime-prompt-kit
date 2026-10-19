import { readFileSync } from 'node:fs';
export const templates = JSON.parse(readFileSync(new URL('./templates.json', import.meta.url), 'utf8'));
const fields = ['subject', 'outfit', 'action', 'setting', 'style', 'lighting', 'composition'];
export function composePrompt(options = {}) {
  if (!options || typeof options !== 'object' || Array.isArray(options)) throw new TypeError('Expected a prompt options object');
  for (const key of fields) {
    if (options[key] !== undefined && typeof options[key] !== 'string') throw new TypeError(`${key} must be a string`);
  }
  return fields.map(key => options[key]?.trim()).filter(Boolean).join(', ');
}
export function fromTemplate(id, overrides = {}) {
  const template = templates.find(item => item.id === id);
  if (!template) throw new Error(`Unknown template: ${id}. Use --list to see available templates.`);
  if (!overrides || typeof overrides !== 'object' || Array.isArray(overrides)) throw new TypeError('Expected an overrides object');
  return composePrompt({ ...template, ...overrides });
}
