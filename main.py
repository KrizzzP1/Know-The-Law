#!/usr/bin/env python3
from src.display import Display
from src.navigator import Navigator


def main() -> None:
    display = Display()
    display.welcome()
    Navigator(display).run()


if __name__ == '__main__':
    main()
