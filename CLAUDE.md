# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the app

```bash
py -X utf8 main.py          # run the navigator (Windows — requires Python 3.7+)
python3 -X utf8 main.py     # macOS / Linux
```

The `-X utf8` flag is required on Windows to force UTF-8 output; otherwise the terminal defaults to cp1252 and box-drawing characters crash with `UnicodeEncodeError`.

**No dependencies.** The project uses only the Python standard library. There is no `requirements.txt`, `venv`, or install step.

## Validating trees

Run this one-liner to verify all decision-tree nodes exist and every `next` link resolves:

```bash
py -X utf8 -c "
from src.amendments import AMENDMENTS
def check(a):
    n = a['tree']['nodes']
    assert a['tree']['root'] in n
    for nid, node in n.items():
        for opt in node.get('options', []):
            assert opt['next'] in n, f'{nid} -> {opt[\"next\"]} broken'
[check(a) for a in AMENDMENTS]
print('OK')
"
```

## Architecture

```
main.py                   Entry point — wires Display + Navigator, calls display.welcome()
src/
  display.py              All terminal output (ANSI colors, box-drawing, text wrapping)
  navigator.py            Decision-tree engine — traverses nodes, drives menus, handles input
  amendments/
    __init__.py           Exports AMENDMENTS list (order = menu order)
    fourth.py             4th Amendment tree (search & seizure, 18 nodes)
    fifth.py              5th Amendment tree (right to remain silent, 16 nodes)
    sixth.py              6th Amendment tree (right to counsel, 9 nodes)
```

### How the decision tree works

Each amendment module exports a single dict with this shape:

```python
{
  'id':       str,          # unique identifier
  'title':    str,          # display name  e.g. '4th Amendment'
  'subtitle': str,          # short description e.g. '— Search & Seizure'
  'tree': {
    'root':  str,           # id of the entry node
    'nodes': {
      '<id>': {
        'type':      'question' | 'conclusion' | 'info',
        'text':      str,
        'amendment': str,                      # optional tag shown in header
        # question-only:
        'options':   [{'label': str, 'next': str}],
        # info-only:
        'next':      str,
        # conclusion-only:
        'severity':  'info' | 'warning' | 'critical',
        'rights':    [str],
        'advice':    str,
      }
    }
  }
}
```

`Navigator._traverse()` is recursive: question nodes prompt the user and recurse into the chosen `next`; conclusion nodes call `display.conclusion()` and return; info nodes print a line and follow their single `next` pointer.

### Adding a new amendment

1. Create `src/amendments/<name>.py` exporting a dict in the shape above.
2. Import and append it to `AMENDMENTS` in `src/amendments/__init__.py`.
3. Run the validation one-liner to confirm no broken links.

### Adding nodes to an existing tree

Add the node dict to the `nodes` dict in the relevant amendment file. Ensure every `next` reference points to an existing node id. Run the validator.

## Windows encoding note

`display.py` reconfigures `sys.stdout` and `sys.stdin` to UTF-8 on import (when `sys.platform == 'win32'`). This must happen before any print call that uses Unicode box-drawing characters. Do not remove this block.
