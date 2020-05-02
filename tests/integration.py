#!/usr/bin/env python3

from argparse import ArgumentParser
from enum import Enum
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


# TODO: parameterize
CHARACTER_URL = "https://www.dungeonmastersvault.com/pages/dnd/5e/characters/17592216785521?frame=true"


class Browser(Enum):
    """Represents a browser."""

    firefox = "firefox"
    chromium = "chromium"

    def __str__(self):
        return self.value


def parse_args():
    """Parse command-line arguments."""
    parser = ArgumentParser("Run integration tests")
    parser.add_argument("browser", action="store", type=Browser, choices=list(Browser))
    return parser.parse_args()


def find_extension():
    """Find the (most recent) packaged extension file."""
    paths = list(sorted(Path("web-ext-artifacts/").glob("vtt_bridge-*.zip")))
    assert len(paths) >= 1, "Can't find extension. Did you run `yarn build`?"
    return str(paths[-1].resolve())


def create_driver(browser, extension):
    """Create the driver and load the extension."""
    if browser == Browser.firefox:
        driver = webdriver.Firefox()
        driver.install_addon(extension, temporary=True)
        return driver
    elif browser == Browser.chromium:
        options = Options()
        options.add_extension(extension)
        driver = webdriver.Chrome(chrome_options=options)
        return driver
    else:
        raise ValueError("Unknown browser type: {}".format(browser))


class TestRunner:
    def __init__(self, driver, url):
        self.wait = WebDriverWait(driver, 10)
        print("Loading URL: {} ...".format(url))
        driver.get(url)

    def by_class_name(self, name):
        return self.wait.until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, name))
        )

    def by_css_selector(self, selector):
        return self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, selector))
        )

    def click_connect_button(self):
        print("Clicking connect button ...")
        self.by_class_name("vtt-connect")[0].click()

    def select_tab_by_index(self, index):
        print("Selecing tab by index: {} ...".format(index))
        self.by_css_selector(".flex-grow-1.t-a-c")[index].click()

    def test_roll_check_buttons(self):
        print("Testing roll check buttons ...")
        assert len(self.by_class_name("vtt-roll-check")) == 6

    def test_roll_skill_buttons(self):
        print("Testing roll skill buttons ...")
        assert len(self.by_class_name("vtt-roll-skill")) == 18

    def test_roll_saving_throw_buttons(self):
        print("Testing roll saving throw buttons ...")
        assert len(self.by_class_name("vtt-roll-save")) == 6

    def test_roll_initiative_buttons(self):
        print("Testing roll initiative buttons ...")
        assert len(self.by_class_name("vtt-roll-initiative")) == 1

    def test_attack_with_weapon_buttons(self):
        print("Testing attack with weapon buttons ...")
        assert len(self.by_class_name("vtt-attack-with-weapon")) >= 1

    def test_roll_proficiency_buttons(self):
        print("Testing roll proficiency buttons ...")
        assert len(self.by_class_name("vtt-roll-proficiency")) >= 18


if __name__ == "__main__":
    args = parse_args()
    extension = find_extension()
    driver = create_driver(args.browser, extension)
    try:
        runner = TestRunner(driver, CHARACTER_URL)

        runner.click_connect_button()
        runner.test_roll_check_buttons()
        runner.test_roll_skill_buttons()
        runner.test_roll_saving_throw_buttons()
        runner.test_roll_initiative_buttons()
        runner.test_attack_with_weapon_buttons()

        runner.select_tab_by_index(1)
        runner.test_roll_proficiency_buttons()
        # TODO: test tools

        runner.select_tab_by_index(2)
        # TODO: test actions, bonus actions, features, and reactions

        runner.select_tab_by_index(3)
        # TODO: test cantrips and spells

        runner.select_tab_by_index(4)
        runner.test_attack_with_weapon_buttons()
    finally:
        print("Cleaning up ...")
        driver.close()
