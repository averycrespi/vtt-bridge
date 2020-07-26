#!/usr/bin/env python3

from argparse import ArgumentParser
import json
import logging
import os.path
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from sys import exit
from typing import Sequence


from character import Character
from engine import Engine
from runner import Runner


def parse_args():
    """Parse command-line arguments."""
    parser = ArgumentParser("Run automation tests.")
    parser.add_argument(
        "browser",
        action="store",
        type=str,
        choices=("firefox", "chromium"),
        help="Browser type",
    )
    parser.add_argument(
        "--log-dir",
        action="store",
        type=Path,
        default=Path("tests") / "logs",
        help="Log directory",
    )
    parser.add_argument(
        "--character-file",
        action="store",
        type=Path,
        default=Path("tests") / "characters.json",
        help="Character JSON file",
    )
    parser.add_argument("--debug", action="store_true", help="Enable debug logging")
    return parser.parse_args()


def configure_logger(log_dir: Path, browser: str, debug: bool) -> logging.Logger:
    """Configure the logger."""
    formatter = logging.Formatter("%(asctime)s - %(name)s - %(message)s")
    streamHandler = logging.StreamHandler()
    streamHandler.setFormatter(formatter)
    log_file = log_dir / f"{browser}.log"
    fileHandler = logging.FileHandler(log_file)
    fileHandler.setFormatter(formatter)
    logger = logging.getLogger(browser)
    logger.setLevel(logging.DEBUG if debug else logging.INFO)
    logger.addHandler(streamHandler)
    logger.addHandler(fileHandler)
    return logger


def find_extension_file() -> Path:
    """Find the packaged extension file."""
    paths = list(Path("web-ext-artifacts/").glob("*.zip"))
    if len(paths) < 1:
        raise ValueError("Can't find extension file. Run `yarn build`.")
    elif len(paths) > 1:
        raise ValueError("Found multiple extension files. Run `yarn rebuild`.")
    else:
        return paths[0].resolve()


def create_driver_with_extension(browser: str, extension_file: Path):
    """Create the driver and load the extension."""
    if browser == "firefox":
        driver = webdriver.Firefox(service_log_path=os.path.devnull)
        driver.install_addon(str(extension_file), temporary=True)
        return driver
    elif browser == "chromium":
        options = Options()
        options.add_extension(str(extension_file))
        driver = webdriver.Chrome(
            chrome_options=options, service_log_path=os.path.devnull
        )
        return driver
    else:
        raise ValueError(f"Unknown browser: {browser}")


def load_characters(character_file: Path) -> Sequence[Character]:
    """Load characters from a JSON file."""
    with open(character_file) as f:
        return [Character(**data) for data in json.load(f)]


if __name__ == "__main__":
    args = parse_args()
    logger = configure_logger(args.log_dir, args.browser, args.debug)
    driver = create_driver_with_extension(args.browser, find_extension_file())
    engine = Engine(driver, logger)
    runner = Runner(engine, logger)
    characters = load_characters(args.character_file)
    try:
        for character in characters:
            runner.run(character)
        exit_code = 0
    except Exception:
        logger.exception("Tests failed with error:")
        exit_code = 1
    finally:
        driver.close()
        exit(exit_code)
