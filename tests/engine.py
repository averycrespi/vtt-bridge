from logging import Logger
import re
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.webelement import WebElement as Element
from selenium.webdriver.common.action_chains import ActionChains as Chains
from selenium.webdriver.common.keys import Keys
from typing import Any, Sequence
import time


class Engine:
    def __init__(self, driver: Any, logger: Logger, timeout: int = 10):
        """Create a new engine."""
        self.driver = driver
        self.waiter = WebDriverWait(driver, timeout)
        self.logger = logger
        self.timeout = timeout

        self.logger.debug("Maximizing browser window")
        self.driver.maximize_window()

    def load_url(self, url: str):
        """Load a URL."""
        self.logger.debug(f"Loading URL: {url}")
        self.driver.get(url)

    def find(self, selector: str) -> Sequence[Element]:
        """Find elements by CSS selector."""
        self.logger.debug(f"Finding elements by CSS selector: {selector}")
        condition = EC.presence_of_all_elements_located((By.CSS_SELECTOR, selector))
        return self.waiter.until(condition)

    def _mod_click(self, element: Element, key: str):
        """Click an element with a modifier key."""
        Chains(self.driver).key_down(key).click(element).key_up(key).perform()

    def control_click(self, element: Element):
        """Control-click an element."""
        self.logger.debug(f"Control-clicking element: {str(element)}")
        self._mod_click(element, Keys.CONTROL)

    def shift_click(self, element: Element):
        """Shift-click an element."""
        self.logger.debug(f"Shift-clicking element: {str(element)}")
        self._mod_click(element, Keys.SHIFT)

    def select_tab_by_index(self, index: int):
        """Select a tab by index."""
        self.logger.debug(f"Selecting tab by index: {index}")
        tab_selector = ".flex-grow-1.t-a-c"
        self.find(tab_selector)[index].click()

    def expect_toast(self, pattern: str):
        """Expect a toast message."""
        self.logger.debug(f"Expecting toast with pattern: {pattern}")
        start = time.time()
        while time.time() <= start + self.timeout:
            for notyf in self.find(".notyf-announcer"):
                message = notyf.get_attribute("innerText").strip()
                if re.match(pattern, message):
                    return
        raise ValueError(f"Couldn't find toast matching pattern: {pattern}")
