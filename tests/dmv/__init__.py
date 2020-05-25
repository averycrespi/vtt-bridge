from logging import Logger
import re
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
import time
from typing import Sequence


class Character:
    def __init__(self, **kwargs):
        self.name = kwargs["name"]
        self.url = kwargs["url"]

    def __str__(self):
        return self.name


class Runner:
    def __init__(self, *, driver, logger: Logger):
        self.driver = driver
        self.logger = logger
        self.waiter = WebDriverWait(driver, 10)

    def run(self, character: Character):
        raise NotImplementedError

    def find_elements_by_class_name(self, class_name: str) -> Sequence[WebElement]:
        return self.waiter.until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, class_name))
        )

    def find_elements_by_css_selector(self, selector: str) -> Sequence[WebElement]:
        return self.waiter.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, selector))
        )

    def _mod_click(self, element: WebElement, key):
        ActionChains(self.driver).key_down(key).click(element).key_up(key).perform()

    def control_click(self, element: WebElement):
        self._mod_click(element, Keys.CONTROL)

    def shift_click(self, element: WebElement):
        self._mod_click(element, Keys.SHIFT)

    def select_tab_by_index(self, index: int):
        self.find_elements_by_css_selector(".flex-grow-1.t-a-c")[index].click()

    def expect_toast(self, pattern: str, retries=10, delay=0.1):
        while retries > 0:
            announcer = self.find_elements_by_class_name("notyf-announcer")[0]
            text = announcer.get_attribute("innerText")
            if re.match(pattern, text):
                break
            retries -= 1
            time.sleep(delay)
        else:  # nobreak
            raise ValueError("Couldn't find toast with pattern: {}".format(pattern))
