from logging import Logger
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.webelement import WebElement
from typing import Sequence

from dmv.character import Character


class Runner:
    def __init__(self, *, driver, logger: Logger):
        self.driver = driver
        self.logger = logger
        self.waiter = WebDriverWait(driver, 10)

    def run(self, character: Character):
        raise NotImplementedError

    def find_elements_by_class_name(self, class_name: str) -> Sequence[WebElement]:
        self.logger.info("Finding elements with class name: {} ...".format(class_name))
        return self.waiter.until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, class_name))
        )

    def find_elements_by_css_selector(self, selector: str) -> Sequence[WebElement]:
        self.logger.info("Finding elements with CSS selector: {} ...".format(selector))
        return self.waiter.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, selector))
        )

    def select_tab_by_index(self, index: int):
        self.logger.info("Selecting tab with index: {} ...".format(index))
        self.find_elements_by_css_selector(".flex-grow-1.t-a-c")[index].click()
