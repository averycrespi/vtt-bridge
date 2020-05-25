#!/usr/bin/env python3

from argparse import ArgumentParser
import json
import logging
import os.path
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from sys import exit
from typing import List

from dmv.character import Character
from dmv.existence_runner import ExistenceRunner
from dmv.toast_runner import ToastRunner


def parse_args():
    """Parse command-line arguments."""
    parser = ArgumentParser("Run automation tests for Dungeon Master's Vault")
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
        default=Path("tests") / "logs",
        type=Path,
        help="Log directory",
    )
    parser.add_argument(
        "--characters-file",
        action="store",
        default=Path("tests") / "characters.json",
        type=Path,
        help="Characters file",
    )
    return parser.parse_args()


def configure_logger(log_dir: Path, browser: str) -> logging.Logger:
    """Configure the logger."""
    formatter = logging.Formatter("%(asctime)s - %(name)s - %(message)s")
    streamHandler = logging.StreamHandler()
    streamHandler.setFormatter(formatter)
    log_file = log_dir / "{}.log".format(browser)
    fileHandler = logging.FileHandler(log_file)
    fileHandler.setFormatter(formatter)
    logger = logging.getLogger(browser)
    logger.setLevel(logging.INFO)
    logger.addHandler(streamHandler)
    logger.addHandler(fileHandler)
    return logger


def load_characters(characters_file: Path) -> List[Character]:
    """Load characters from a file."""
    with open(characters_file) as f:
        return [Character(**obj) for obj in json.load(f)]


def find_extension_file() -> Path:
    """Find the packaged extension file."""
    paths = list(Path("web-ext-artifacts/").glob("*.zip"))
    if len(paths) < 1:
        raise ValueError("Can't find packaged extension file. Run `yarn build`.")
    elif len(paths) > 1:
        raise ValueError("Found multiple packaged extension files. Run `yarn clean`.")
    return paths[0].resolve()


def create_driver(browser: str, extension_file: Path):
    """Create the driver and load the extension."""
    if browser == "firefox":
        driver = webdriver.Firefox(service_log_path=os.path.devnull)
        driver.install_addon(str(extension_file), temporary=True)
        return driver
    elif browser == "chromium":
        chrome_options = Options()
        chrome_options.add_extension(str(extension_file))
        driver = webdriver.Chrome(
            chrome_options=chrome_options, service_log_path=os.path.devnull
        )
        return driver
    else:
        raise ValueError("Unknown browser: {}".format(browser))


if __name__ == "__main__":
    args = parse_args()
    logger = configure_logger(args.log_dir, args.browser)
    characters = load_characters(args.characters_file)
    extension_file = find_extension_file()
    driver = create_driver(args.browser, extension_file)
    try:
        existence_runner = ExistenceRunner(driver=driver, logger=logger)
        toast_runner = ToastRunner(driver=driver, logger=logger)
        for character in characters:
            existence_runner.run(character)
            toast_runner.run(character)
        exit_code = 0
    except Exception:
        logger.exception("Tests failed with error:")
        exit_code = 1
    finally:
        driver.close()
        exit(exit_code)
