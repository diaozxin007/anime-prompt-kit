# Anime Prompt Kit

Build editable anime character prompts from structured fields. Includes 12 original character concepts and dependency-free JavaScript and Python composers.

Made for use with [AI Anime Generator](https://ai-anime-generator.io/) or your preferred image generator. This toolkit assembles text locally; it does not generate images or call an API.

## Python package

Requires Python 3.9 or later. Install from [PyPI](https://pypi.org/project/anime-prompt-kit/):

```sh
python -m pip install anime-prompt-kit
anime-prompt-kit --list
anime-prompt-kit sky-courier --setting "a snowy train station"
python -m anime_prompt_kit moon-librarian
```

```python
from anime_prompt_kit import compose_prompt, from_template, list_templates

print(from_template("sky-courier", setting="a snowy train station"))
print(compose_prompt(subject="adult explorer", setting="forest"))
```

The Python API and CLI run locally without dependencies, accounts or API keys.
[Documentation and project overview](https://ai-anime-generator.io/open-source).

## JavaScript quick start

Requires Node.js 20 or later. No dependencies, account, or API key required.

```sh
git clone https://github.com/diaozxin007/anime-prompt-kit.git
cd anime-prompt-kit
node cli.js --list
node cli.js sky-courier
node cli.js sky-courier --setting "a snowy train station" --composition "full body character sheet"
```

Example output from `node cli.js sky-courier`:

> adult courier with short silver hair and amber eyes, navy flight jacket and brass goggles, holding a folded map, floating harbor at sunrise, anime illustration, clean line art, soft cel shading, soft cinematic lighting, three-quarter portrait

Copy the output into [AI Anime Generator](https://ai-anime-generator.io/) to generate an image. The website is a separate service with its own account, credit, and usage terms; running this kit is free.

## Use in JavaScript

```js
import { composePrompt, fromTemplate } from './index.js';

console.log(fromTemplate('moon-librarian', {
  action: 'reading beside a window',
  lighting: 'warm candlelight',
}));

console.log(composePrompt({
  subject: 'adult explorer with dark curls and green eyes',
  outfit: 'teal coat and leather satchel',
  setting: 'a floating botanical garden',
  style: 'anime illustration, soft cel shading',
}));
```

Supported fields are `subject`, `outfit`, `action`, `setting`, `style`, `lighting`, and `composition`. Empty fields are omitted. Overrides replace the corresponding field without changing the stored template. Unknown template IDs and non-string field values throw an error.

This project is currently distributed through GitHub; no npm install is required.

## Character templates

| ID | Concept |
| --- | --- |
| `sky-courier` | Sky courier |
| `forest-botanist` | Forest botanist |
| `moon-librarian` | Moon librarian |
| `desert-mechanic` | Desert mechanic |
| `rain-detective` | Rain detective |
| `tea-alchemist` | Tea alchemist |
| `snow-ranger` | Snow ranger |
| `ocean-cartographer` | Ocean cartographer |
| `rooftop-musician` | Rooftop musician |
| `garden-guardian` | Garden guardian |
| `star-engineer` | Star engineer |
| `village-baker` | Village baker |

The canonical templates live in [`templates.json`](./templates.json), so you can also copy and edit them without using JavaScript.

## Keep a character recognizable

1. Keep the `subject` and signature `outfit` fixed between prompts.
2. Change one field at a time, such as `action` or `setting`.
3. Keep a record of the model and settings used in your image generator.
4. Where supported, use the same reference image to guide later generations.

These are text starting points, not a guarantee of character consistency. Different models interpret prompts differently. The included templates have not been individually image-tested; no generated results or performance claims are implied.

Python distribution data is copied from `templates.json`; the parity test checks both copies and all 12 JavaScript/Python outputs. Update both JSON files when adding templates.

## Privacy

The composer and CLI run locally. They have no network calls, tracking, or credentials. Following a website link opens a separate external service.

## Development and contributions

```sh
npm test
PYTHONPATH=python python3 -m unittest discover -s tests -v
```

Contributions are welcome: add original templates, improve examples, or report bugs through GitHub issues. Include the exact command and Node.js version for bug reports. Keep secrets and private prompts out of issues. Please use original character concepts and do not contribute copyrighted artwork or copied prompt collections.

## License

[MIT](./LICENSE), covering the code and included template text.
