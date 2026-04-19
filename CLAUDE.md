# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the app

**Website (primary):**
```bash
start website/index.html       # Windows — open in default browser (no server needed)
```

**CLI version:**
```bash
py -X utf8 main.py             # Windows — requires Python 3.7+
python3 -X utf8 main.py        # macOS / Linux
```

The `-X utf8` flag is required on Windows; the terminal defaults to cp1252 and box-drawing characters will crash without it.

**Validate decision-tree links (catch dead `next:` references before committing):**
```bash
py -X utf8 -c "
import re, pathlib, sys
src = pathlib.Path('website/app.js').read_text(encoding='utf-8')
defined  = set(re.findall(r'^\s{8}([\w]+): \{', src, re.MULTILINE))
referred = set(re.findall(r\"next: '([\w]+)'\", src))
roots    = set(re.findall(r\"root: '([\w]+)'\", src))
broken = (referred | roots) - defined
print('BROKEN:', broken or 'none'); sys.exit(1 if broken else 0)
"
```

**No dependencies.** Both the CLI and website use only stdlib / vanilla JS. There is no `npm install`, `pip install`, build step, or dev server.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) auto-deploys `website/` to GitHub Pages on every push to `main`. Before the workflow will succeed, the Pages source must be set to **GitHub Actions** in repo Settings → Pages.

## Architecture

```
main.py                  CLI entry point
src/
  display.py             ANSI terminal output (UTF-8 reconfigured on Windows)
  navigator.py           Decision-tree traversal engine + input loop
  amendments/            Python decision-tree data (4th, 5th, 6th, 8th)

website/
  index.html             Static shell — sidebar + #content mount point
  style.css              Dark "Texas-Modern" theme, all component styles
  app.js                 All tree data + bilingual translations + rendering engine
```

### Decision-tree node format

Every node in `app.js` lives inside an amendment's `tree.nodes` object:

```js
// Question node
{
  type: 'question',
  amendment: '4th',           // tag shown in header
  text: 'English question?',
  options: [{ label: 'English label', next: 'node_id' }],
  es: {
    text: 'Pregunta en español?',
    options: ['Opción 1', 'Opción 2'],  // same order; only labels translated
  },
}

// Conclusion node
{
  type: 'conclusion',
  severity: 'info' | 'warning' | 'critical',
  text: 'English body',
  rights: ['Right 1'],
  advice: 'What to say verbatim',
  texasNote: 'Texas-specific legal nuance',   // optional — renders as TX callout
  es: {
    text: 'Cuerpo en español',
    rights: ['Derecho 1'],
    advice: 'Qué decir literalmente',
    texasNote: 'Nota legal específica de Texas',  // optional
  },
}
```

`next` values are always English node IDs (structural, never translated). `translateNode(node)` in `app.js` merges the `es` object over the base node at render time, preserving `next` links. Language state is stored in `state.lang` and switching with `setLang()` re-renders in place without resetting navigation history.

### UI translations

All button labels, headers, and UI strings live in the `UI` object at the top of `app.js`:
```js
const UI = { en: { ... }, es: { ... } }
```
Access via `u('key')` — never hardcode strings in render functions.

### Amendment structure

Each entry in `AMENDMENTS` has:
```js
{ id, numeral, title, subtitle, esTitle, esSubtitle, tree: { root, nodes } }
```

Currently: `fourth` (18 nodes + 6 checkpoint nodes), `fifth` (16 nodes), `sixth` (9 nodes), `eighth` (10 nodes).

### Adding a node or amendment

1. Add the node dict to the correct `tree.nodes` object (include `es` object).
2. If it's a question node, verify every `next` value points to an existing node id.
3. Run the validation one-liner above.
4. For a new amendment, add `esTitle`/`esSubtitle` fields and append to `AMENDMENTS`.

## Texas-specific layer

Nodes that carry a `texasNote` / `es.texasNote` render a burnt-orange **TX** callout card. Current nodes with Texas notes: `vehicle_traffic` (TTC § 543.001), `street_detained` (PC § 38.02), `not_in_custody` (PC § 38.02), `compelled_physical` (TTC § 724.011 implied consent), `bail_overview`, `excessive_bail`, `bail_denied_capital`, `cannot_afford` (8th), `rights_holding`, and the full Border Patrol checkpoint branch.

## Windows encoding note

`src/display.py` reconfigures `sys.stdout` / `sys.stdin` to UTF-8 on import when running on Windows. Do not remove this block — it must execute before any print call.
