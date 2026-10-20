const fields = ['subject', 'outfit', 'action', 'setting', 'style', 'lighting', 'composition'];
export function composePrompt(options = {}) {
  if (!options || typeof options !== 'object' || Array.isArray(options)) throw new TypeError('Expected a prompt options object');
  for (const key of fields) {
    if (options[key] !== undefined && typeof options[key] !== 'string') throw new TypeError(`${key} must be a string`);
  }
  return fields.map(key => options[key]?.trim()).filter(Boolean).join(', ');
}
