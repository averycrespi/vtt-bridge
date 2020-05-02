#!/usr/bin/env python3

from argparse import ArgumentParser
from enum import Enum
import logging
import os.path
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from sys import exit


CHARACTER_URLS = (
    "https://www.dungeonmastersvault.com/pages/dnd/5e/characters/17592216785521?frame=true",  # noqa
)


class Browser(Enum):
    """Represents a browser."""

    firefox = "firefox"
    chromium = "chromium"

    def __str__(self):
        return self.value


def parse_args():
    """Parse command-line arguments."""
    parser = ArgumentParser("Run DMV automation tests")
    parser.add_argument(
        "browser",
        action="store",
        type=Browser,
        choices=list(Browser),
        help="One of: firefox, chromium",
    )
    parser.add_argument(
        "--log-file",
        action="store",
        default="logs/dmv.log",
        type=str,
        help="Path to log file",
    )
    return parser.parse_args()


def configure_logger(*, log_file, browser):
    """Configure the logger."""
    formatter = logging.Formatter("%(asctime)s - %(name)s - %(message)s")
    streamHandler = logging.StreamHandler()
    streamHandler.setFormatter(formatter)
    fileHandler = logging.FileHandler(log_file)
    fileHandler.setFormatter(formatter)
    logger = logging.getLogger(str(browser))
    logger.setLevel(logging.INFO)
    logger.addHandler(streamHandler)
    logger.addHandler(fileHandler)
    return logger


def find_extension():
    """Find the (most recent) packaged extension file."""
    paths = list(sorted(Path("web-ext-artifacts/").glob("vtt_bridge-*.zip")))
    assert len(paths) >= 1, "Can't find extension. Did you run `yarn build`?"
    return str(paths[-1].resolve())


def create_driver(*, browser, extension):
    """Create the driver and load the extension."""
    if browser == Browser.firefox:
        driver = webdriver.Firefox(service_log_path=os.path.devnull)
        driver.install_addon(extension, temporary=True)
        return driver
    elif browser == Browser.chromium:
        chrome_options = Options()
        chrome_options.add_extension(extension)
        driver = webdriver.Chrome(
            chrome_options=chrome_options, service_log_path=os.path.devnull
        )
        return driver
    else:
        raise ValueError("Unknown browser type: {}".format(browser))


class TestRunner:
    def __init__(self, *, driver, logger):
        """Create a new test runner."""
        self.driver = driver
        self.logger = logger
        self.wait = WebDriverWait(driver, 10)

    def by_class_name(self, name):
        """Find elements by class name."""
        return self.wait.until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, name))
        )

    def by_css_selector(self, selector):
        """Find elements by CSS selector."""
        return self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, selector))
        )

    def click_connect_button(self):
        self.logger.info("Clicking connect button ...")
        self.by_class_name("vtt-connect")[0].click()

    def select_tab_by_index(self, index):
        self.logger.info("Selecting tab by index: {} ...".format(index))
        self.by_css_selector(".flex-grow-1.t-a-c")[index].click()

    def test_roll_check_buttons(self):
        self.logger.info("Testing roll check buttons ...")
        assert len(self.by_class_name("vtt-roll-check")) == 6

    def test_roll_skill_buttons(self):
        self.logger.info("Testing roll skill buttons ...")
        assert len(self.by_class_name("vtt-roll-skill")) == 18

    def test_roll_saving_throw_buttons(self):
        self.logger.info("Testing roll saving throw buttons ...")
        assert len(self.by_class_name("vtt-roll-save")) == 6

    def test_roll_initiative_buttons(self):
        self.logger.info("Testing roll initiative buttons ...")
        assert len(self.by_class_name("vtt-roll-initiative")) == 1

    def test_attack_with_weapon_buttons(self):
        self.logger.info("Testing attack with weapon buttons ...")
        assert len(self.by_class_name("vtt-attack-with-weapon")) >= 1

    def test_roll_proficiency_buttons(self):
        self.logger.info("Testing roll proficiency buttons ...")
        assert len(self.by_class_name("vtt-roll-proficiency")) >= 18

    def test_character(self, url):
        self.logger.info("Testing character: {} ...".format(url))
        self.driver.get(url)
        self.click_connect_button()
        self.test_roll_check_buttons()
        self.test_roll_skill_buttons()
        self.test_roll_saving_throw_buttons()

        self.logger.info("Testing combat tab ...")
        self.test_roll_initiative_buttons()
        self.test_attack_with_weapon_buttons()

        self.logger.info("Testing proficiencies tab ...")
        self.select_tab_by_index(1)
        self.test_roll_proficiency_buttons()
        # TODO: test tools

        self.logger.info("Testing spells tab ...")
        self.select_tab_by_index(2)
        # TODO: test cantrips and spells

        self.logger.info("Testing features tab ...")
        self.select_tab_by_index(3)
        # TODO: test actions, bonus actions, features, and reactions

        self.logger.info("Testing equipment tab ...")
        self.select_tab_by_index(4)
        self.test_attack_with_weapon_buttons()


if __name__ == "__main__":
    args = parse_args()
    logger = configure_logger(log_file=args.log_file, browser=args.browser)
    driver = create_driver(browser=args.browser, extension=find_extension())
    try:
        runner = TestRunner(driver=driver, logger=logger)
        for url in CHARACTER_URLS:
            runner.test_character(url)
        exit_code = 0
    except Exception:
        logger.exception("Tests failed with error:")
        exit_code = 1
    finally:
        logger.info("Cleaning up ...")
        driver.close()
        exit(exit_code)
