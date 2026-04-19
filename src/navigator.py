from __future__ import annotations
from src.amendments import AMENDMENTS
from src.display import Display


class Navigator:
    def __init__(self, display: Display) -> None:
        self.display = display

    def run(self) -> None:
        while True:
            amendment = self._select_amendment()
            if amendment is None:
                break
            self._traverse(amendment['tree'], amendment['tree']['root'])
            if not self._confirm('Explore another scenario? (y/n):'):
                break
        self.display.farewell()

    # ── private ──────────────────────────────────────────────────────────────

    def _select_amendment(self) -> dict | None:
        self.display.question('Which constitutional amendment?')
        for i, a in enumerate(AMENDMENTS, 1):
            label = f"{a['title']}  {self.display.dim_label(a['subtitle'])}"
            self.display.menu_item(i, label)
        self.display.menu_item(len(AMENDMENTS) + 1, 'Exit')

        choice = self._get_int(len(AMENDMENTS) + 1)
        if choice == len(AMENDMENTS) + 1:
            return None
        return AMENDMENTS[choice - 1]

    def _traverse(self, tree: dict, node_id: str) -> None:
        node = tree['nodes'].get(node_id)
        if node is None:
            self.display.error(f'Missing node "{node_id}" — this is a bug.')
            return

        ntype = node['type']

        if ntype == 'conclusion':
            self.display.conclusion(node)
            return

        if ntype == 'info':
            self.display.info_line(node['text'])
            next_id = node.get('next')
            if next_id:
                self._traverse(tree, next_id)
            return

        # question node
        self.display.question(node['text'], node.get('amendment'))
        options = node['options']
        for i, opt in enumerate(options, 1):
            self.display.menu_item(i, opt['label'])

        choice = self._get_int(len(options))
        self._traverse(tree, options[choice - 1]['next'])

    def _get_int(self, maximum: int) -> int:
        while True:
            raw = self.display.prompt(f'Enter choice (1–{maximum}):')
            try:
                val = int(raw.strip())
                if 1 <= val <= maximum:
                    return val
            except ValueError:
                pass
            self.display.error(f'Please enter a number between 1 and {maximum}.')

    def _confirm(self, prompt: str) -> bool:
        while True:
            raw = self.display.prompt(prompt).lower().strip()
            if raw in ('y', 'yes', ''):
                return True
            if raw in ('n', 'no'):
                return False
            self.display.error('Please enter y or n.')
