import time

from dmv.character import Character
from dmv.runner import Runner


class ToastRunner(Runner):
    def run(self, character: Character):
        self.logger.info("Running toast tests for character: {} ...".format(character))
        self.driver.get(character.url)
        self.expect_toast("Connected to VTT Bridge!")

        button = self.find_elements_by_class_name("vtt-roll-ability-score")[0]
        button.click()
        self.expect_toast("Rolled STR check!")
        self.control_click(button)
        self.expect_toast("Rolled STR check with advantage!")
        self.shift_click(button)
        self.expect_toast("Rolled STR check with disadvantage!")
