from dmv import Character, Runner


class ExistenceRunner(Runner):
    def run(self, character: Character):
        self.logger.info(
            "Running existence tests for character: {} ...".format(character)
        )
        self.driver.get(character.url)
        self.left_panel()
        self.combat_tab()
        self.proficiencies_tab()
        self.spells_tab()
        self.equipment_tab()

    def left_panel(self):
        assert (
            len(self.find_elements_by_class_name("vtt-roll-ability-score")) == 6
        ), "Wrong number of roll ability score buttons"
        assert (
            len(self.find_elements_by_class_name("vtt-roll-skill")) == 18
        ), "Wrong number of roll skill buttons"
        assert (
            len(self.find_elements_by_class_name("vtt-roll-saving-throw")) == 6
        ), "Wrong number of roll saving throw buttons"

    def combat_tab(self):
        self.select_tab_by_index(0)
        assert (
            len(self.find_elements_by_class_name("vtt-roll-initiative")) == 1
        ), "Wrong number of roll initiative buttons"
        assert (
            len(self.find_elements_by_class_name("vtt-attack-with-weapon")) >= 1
        ), "Wrong number of attack with weapon buttons"
        assert (
            len(self.find_elements_by_class_name("vtt-roll-weapon-damage")) >= 1
        ), "Wrong number of roll weapon damage buttons"

    def proficiencies_tab(self):
        self.select_tab_by_index(1)
        assert (
            len(self.find_elements_by_class_name("vtt-roll-proficiency")) >= 18
        ), "Wrong number of roll proficiency buttons"

    def spells_tab(self):
        self.select_tab_by_index(2)
        assert (
            len(self.find_elements_by_class_name("vtt-attack-with-spell")) >= 1
        ), "Wrong number of attack with spell buttons"

    def features_tab(self):
        self.select_tab_by_index(3)
        assert (
            len(self.find_elements_by_class_name("vtt-use-feature")) >= 1
        ), "Wrong number of use feature buttons"

    def equipment_tab(self):
        self.select_tab_by_index(4)
        assert (
            len(self.find_elements_by_class_name("vtt-attack-with-weapon")) >= 1
        ), "Wrong number of attack with weapon buttons"
        assert (
            len(self.find_elements_by_class_name("vtt-roll-weapon-damage")) >= 1
        ), "Wrong number of roll weapon damage buttons"
