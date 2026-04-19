

import io
import os
import sys
import textwrap

# Windows: enable ANSI escape codes and force UTF-8 output
if sys.platform == 'win32':
    os.system('')
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stdin  = io.TextIOWrapper(sys.stdin.buffer,  encoding='utf-8', errors='replace')

WIDTH = 64


class _C:
    RESET   = '\033[0m'
    BOLD    = '\033[1m'
    DIM     = '\033[2m'
    RED     = '\033[91m'
    GREEN   = '\033[92m'
    YELLOW  = '\033[93m'
    BLUE    = '\033[94m'
    CYAN    = '\033[96m'
    WHITE   = '\033[97m'
    GRAY    = '\033[90m'


def _fmt(color: str, text: str) -> str:
    return f'{color}{text}{_C.RESET}'


def _wrap(text: str, indent: str, color: str, width: int = WIDTH) -> None:
    max_w = width - len(indent)
    for line in textwrap.wrap(text, max_w):
        print(_fmt(color, indent + line))


class Display:
    def welcome(self) -> None:
        os.system('cls' if sys.platform == 'win32' else 'clear')
        border = _fmt(_C.BOLD + _C.BLUE, '═' * WIDTH)
        print(border)
        print(_fmt(_C.BOLD + _C.WHITE, '  KNOW THE LAW'))
        print(_fmt(_C.GRAY, '  Constitutional Rights Navigator — U.S. Bill of Rights'))
        print(border)
        print()

    def question(self, text: str, amendment: str | None = None) -> None:
        tag = _fmt(_C.CYAN, f'[{amendment} Amendment]') if amendment else ''
        label = _fmt(_C.BOLD + _C.WHITE, f'▶  {text}')
        spacer = '  ' if tag else ''
        print(f'\n{label}{spacer}{tag}')

    def menu_item(self, idx: int, label: str) -> None:
        num = _fmt(_C.CYAN, f'{idx}.')
        print(f'  {num}  {label}')

    def conclusion(self, node: dict) -> None:
        divider = _fmt(_C.BLUE, '─' * WIDTH)
        severity = node.get('severity', 'info')

        severity_headers = {
            'critical': _fmt(_C.BOLD + _C.RED,    '  ⚠  YOUR RIGHTS IN THIS SITUATION'),
            'warning':  _fmt(_C.BOLD + _C.YELLOW, '  ⚑  YOUR RIGHTS IN THIS SITUATION'),
            'info':     _fmt(_C.BOLD + _C.GREEN,  '  ✔  YOUR RIGHTS IN THIS SITUATION'),
        }

        print(f'\n{divider}')
        print(severity_headers.get(severity, severity_headers['info']))
        print(divider)
        print()
        _wrap(node['text'], '  ', _C.WHITE)

        rights = node.get('rights', [])
        if rights:
            print()
            print(_fmt(_C.BOLD + _C.CYAN, '  Rights you can assert:'))
            for right in rights:
                bullet = _fmt(_C.GREEN, '•')
                print(f'  {bullet}  {right}')

        advice = node.get('advice')
        if advice:
            print()
            print(_fmt(_C.BOLD + _C.YELLOW, '  What to do:'))
            _wrap(advice, '    ', _C.WHITE)

        print(f'\n{divider}')

    def info_line(self, text: str) -> None:
        print(f'\n  {_fmt(_C.GRAY, "ℹ")}  {text}')

    def error(self, text: str) -> None:
        print(f'  {_fmt(_C.RED, "✗")}  {text}')

    def prompt(self, text: str) -> str:
        return input(f'\n  {_fmt(_C.BOLD + _C.WHITE, text)} ')

    def dim_label(self, text: str) -> str:
        return _fmt(_C.GRAY, text)

    def farewell(self) -> None:
        print(f'\n  {_fmt(_C.DIM, "Stay informed. Know your rights.")}\n')
