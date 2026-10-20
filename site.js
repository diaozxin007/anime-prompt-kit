import { composePrompt } from './composer.js';
const fields = ['subject', 'outfit', 'action', 'setting', 'style', 'lighting', 'composition'];
const select = document.querySelector('#template');
const form = document.querySelector('#fields');
const output = document.querySelector('#output');
const status = document.querySelector('#status');
let templates;
function update() {
  output.value = composePrompt(Object.fromEntries(new FormData(form)));
  status.textContent = '';
}
function load() {
  const template = templates.find(item => item.id === select.value);
  for (const field of fields) form.elements[field].value = template[field] || '';
  update();
}
try {
  const response = await fetch('./templates.json');
  if (!response.ok) throw new Error('Unable to load templates');
  templates = await response.json();
  select.replaceChildren(...templates.map(item => new Option(item.name, item.id)));
  for (const field of fields) {
    const label = document.createElement('label');
    label.htmlFor = field;
    label.textContent = field[0].toUpperCase() + field.slice(1);
    const input = document.createElement('textarea');
    input.id = input.name = field;
    input.rows = 2;
    form.append(label, input);
  }
  select.disabled = false;
  document.querySelector('#reset').disabled = false;
  document.querySelector('#copy').disabled = false;
  select.addEventListener('change', load);
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('input', update);
  document.querySelector('#reset').addEventListener('click', load);
  load();
} catch {
  status.textContent = 'Templates could not load. Please reload, or download the toolkit from GitHub.';
}
document.querySelector('#copy').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(output.value);
    status.textContent = 'Prompt copied.';
  } catch {
    output.focus();
    output.select();
    status.textContent = 'Select and copy the prompt with your keyboard.';
  }
});
