from dmv import Character, Runner


class ToastRunner(Runner):
    def run(self, character: Character):
        self.logger.info("Running toast tests for character: {} ...".format(character))
        self.driver.get(character.url)
        self.expect_toast("Connected to VTT Bridge!")

        button = self.find_elements_by_class_name("vtt-roll-initiative")[0]
        button.click()
        self.expect_toast("Rolled initiative!")
        self.control_click(button)
        self.expect_toast("Rolled initiative with advantage!")
        self.shift_click(button)
        self.expect_toast("Rolled initiative with disadvantage!")
