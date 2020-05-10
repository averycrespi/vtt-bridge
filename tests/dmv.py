#!/usr/bin/env python3

from argparse import ArgumentParser
from enum import Enum
import json
import logging
import os.path
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from sys import exit
from typing import List


class Browser(Enum):
    """Represents a browser type."""

    firefox = "firefox"
    chromium = "chromium"

    def __str__(self) -> str:
        return self.value


class Character:
    """Represents a DMV character."""

    def __init__(self, *, name: str, url: str, sections: List[str]):
        self.name = name
        self.url = url
        self.sections = sections


def parse_args():
    """Parse command-line arguments."""
    parser = ArgumentParser("Run automation tests for DMV")
    parser.add_argument(
        "browser",
        action="store",
        type=Browser,
        choices=list(Browser),
        help="Browser type",
    )
    parser.add_argument(
        "--log-dir",
        action="store",
        default=Path("tests") / "logs",
        type=Path,
        help="Log file directory",
    )
    parser.add_argument(
        "--characters-file",
        action="store",
        default=Path("tests") / "characters.json",
        type=Path,
        help="Characters file",
    )
    return parser.parse_args()


def configure_logger(log_dir: Path, browser: Browser) -> logging.Logger:
    """Configure the logger."""
    formatter = logging.Formatter("%(asctime)s - %(name)s - %(message)s")
    streamHandler = logging.StreamHandler()
    streamHandler.setFormatter(formatter)
    log_file = log_dir / "{}.log".format(str(browser))
    fileHandler = logging.FileHandler(log_file)
    fileHandler.setFormatter(formatter)
    logger = logging.getLogger(str(browser))
    logger.setLevel(logging.INFO)
    logger.addHandler(streamHandler)
    logger.addHandler(fileHandler)
    return logger


def load_characters(characters_file: Path) -> List[Character]:
    """Load characters from a JSON file."""
    with open(characters_file) as f:
        return [Character(**obj) for obj in json.load(f)]


def find_extension_file() -> Path:
    """Find the packaged extension file."""
    paths = list(Path("web-ext-artifacts/").glob("*.zip"))
    assert len(paths) >= 1, "Can't find file. Did you run `yarn build`?"
    assert len(paths) == 1, "Multiple versions found. Run `yarn clean`."
    return paths[0].resolve()


def create_driver(browser: Browser, extension_file: Path):
    """Create the driver and load the extension."""
    if browser == Browser.firefox:
        driver = webdriver.Firefox(service_log_path=os.path.devnull)
        driver.install_addon(str(extension_file), temporary=True)
        return driver
    elif browser == Browser.chromium:
        chrome_options = Options()
        chrome_options.add_extension(str(extension_file))
        driver = webdriver.Chrome(
            chrome_options=chrome_options, service_log_path=os.path.devnull
        )
        return driver


class TestRunner:
    def __init__(self, driver, logger: logging.Logger):
        """Create a new test runner."""
        self.driver = driver
        self.logger = logger
        self.wait = WebDriverWait(driver, 10)

    def by_class_name(self, name: str):
        """Find elements by class name."""
        return self.wait.until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, name))
        )

    def by_css_selector(self, selector: str):
        """Find elements by CSS selector."""
        return self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, selector))
        )

    def select_tab_by_index(self, index: int):
        self.logger.info("Selecting tab by index: {} ...".format(index))
        self.by_css_selector(".flex-grow-1.t-a-c")[index].click()

    def test_roll_ability_score_buttons(self):
        self.logger.info("Testing roll ability score buttons ...")
        assert len(self.by_class_name("vtt-roll-ability-score")) == 6

    def test_roll_skill_buttons(self):
        self.logger.info("Testing roll skill buttons ...")
        assert len(self.by_class_name("vtt-roll-skill")) == 18

    def test_roll_saving_throw_buttons(self):
        self.logger.info("Testing roll saving throw buttons ...")
        assert len(self.by_class_name("vtt-roll-saving-throw")) == 6

    def test_roll_initiative_button(self):
        self.logger.info("Testing roll initiative button ...")
        assert len(self.by_class_name("vtt-roll-initiative")) == 1

    def test_weapon_buttons(self):
        self.logger.info("Testing attack with weapon buttons ...")
        assert len(self.by_class_name("vtt-attack-with-weapon")) >= 1
        self.logger.info("Testing roll weapon damage buttons ...")
        assert len(self.by_class_name("vtt-roll-weapon-damage")) >= 1

    def test_roll_proficiency_buttons(self):
        self.logger.info("Testing roll proficiency buttons ...")
        assert len(self.by_class_name("vtt-roll-proficiency")) >= 18

    def test_roll_spell_buttons(self):
        self.logger.info("Testing roll spell buttons ...")
        assert len(self.by_class_name("vtt-attack-with-spell")) >= 1

    def test_use_feature_buttons(self):
        self.logger.info("Testing use feature buttons ...")
        assert len(self.by_class_name("vtt-use-feature")) >= 1

    def test_character(self, character: Character):
        self.logger.info("Testing character: {} ...".format(character.name))
        self.driver.get(character.url)
        self.test_roll_ability_score_buttons()
        self.test_roll_skill_buttons()
        self.test_roll_saving_throw_buttons()

        self.logger.info("Testing combat tab ...")
        self.test_roll_initiative_button()
        self.test_weapon_buttons()

        self.logger.info("Testing proficiencies tab ...")
        self.select_tab_by_index(1)
        self.test_roll_proficiency_buttons()

        self.logger.info("Testing spells tab ...")
        self.select_tab_by_index(2)
        if "spells" in character.sections:
            self.test_roll_spell_buttons()

        self.logger.info("Testing features tab ...")
        self.select_tab_by_index(3)
        if "features" in character.sections:
            self.test_use_feature_buttons()

        self.logger.info("Testing equipment tab ...")
        self.select_tab_by_index(4)
        self.test_weapon_buttons()


if __name__ == "__main__":
    args = parse_args()
    logger = configure_logger(args.log_dir, args.browser)
    characters = load_characters(args.characters_file)
    extension_file = find_extension_file()
    driver = create_driver(args.browser, extension_file)
    try:
        runner = TestRunner(driver, logger)
        for character in characters:
            runner.test_character(character)
        exit_code = 0
    except Exception:
        logger.exception("Tests failed with error:")
        exit_code = 1
    finally:
        logger.info("Cleaning up ...")
        driver.close()
        exit(exit_code)
