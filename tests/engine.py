from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.webelement import WebElement as Element
from selenium.webdriver.common.action_chains import ActionChains as Chains
from selenium.webdriver.common.keys import Keys
from typing import Any, Sequence
import time


class Engine:
    def __init__(self, driver: Any, timeout: int = 10):
        """Create a new test engine."""
        self.driver = driver
        self.waiter = WebDriverWait(driver, timeout)
        self.timeout = timeout

    def load_url(self, url: str):
        """Load a URL."""
        self.driver.get(url)

    def find(self, selector: str) -> Sequence[Element]:
        """Find elements by CSS selector."""
        condition = EC.presence_of_all_elements_located((By.CSS_SELECTOR, selector))
        return self.waiter.until(condition)

    def _mod_click(self, element: Element, key: str):
        Chains(self.driver).key_down(key).click(element).key_up(key).perform()

    def control_click(self, element: Element):
        """Control-click an element."""
        self._mod_click(element, Keys.CONTROL)

    def shift_click(self, element: Element):
        """Shift-click an element."""
        self._mod_click(element, Keys.SHIFT)

    def select_tab_by_index(self, index: int):
        """Select a tab by index."""
        tab_selector = ".flex-grow-1.t-a-c"
        self.find(tab_selector)[index].click()

    def expect_toast(self, toast: str):
        """Expect a toast message."""
        start = time.time()
        while time.time() <= start + self.timeout:
            for notyf in self.find(".notyf-announcer"):
                if toast == notyf.get_attribute("innerText").strip():
                    return
        raise ValueError("Couldn't find toast: {}".format(toast))
