#!/usr/bin/env python3

from argparse import ArgumentParser
import json
import logging
import os.path
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from sys import exit


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
        "--url-file",
        action="store",
        type=Path,
        default=Path("tests") / "character_urls.json",
        help="Character URL file",
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


def find_extension_file() -> Path:
    """Find the packaged extension file."""
    paths = list(Path("web-ext-artifacts/").glob("*.zip"))
    if len(paths) < 1:
        raise ValueError("Can't find packaged extension file. Run `yarn build`.")
    elif len(paths) > 1:
        raise ValueError("Found multiple packaged extension files. Run `yarn clean`.")
    else:
        return paths[0].resolve()


def create_driver(browser: str, extension_file: Path):
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
        raise ValueError("Unknown browser: {}".format(browser))


if __name__ == "__main__":
    args = parse_args()
    logger = configure_logger(args.log_dir, args.browser)
    driver = create_driver(args.browser, find_extension_file())
    runner = Runner(Engine(driver), logger)
    try:
        with open(args.url_file) as f:
            for url in json.load(f):
                runner.run(url)
        exit_code = 0
    except Exception:
        logger.exception("Tests failed with error:")
        exit_code = 1
    finally:
        driver.close()
        exit(exit_code)
