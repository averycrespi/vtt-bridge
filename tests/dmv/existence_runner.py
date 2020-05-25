from dmv.character import Character
from dmv.runner import Runner


class ExistenceRunner(Runner):
    def test_roll_ability_score_buttons(self):
        self.logger.info("Looking for roll ability score buttons ...")
        assert len(self.find_elements_by_class_name("vtt-roll-ability-score")) == 6

    def test_roll_skill_buttons(self):
        self.logger.info("Looking for roll skill buttons ...")
        assert len(self.find_elements_by_class_name("vtt-roll-skill")) == 18

    def test_roll_saving_throw_buttons(self):
        self.logger.info("Looking for roll saving throw buttons ...")
        assert len(self.find_elements_by_class_name("vtt-roll-saving-throw")) == 6

    def test_roll_initiative_button(self):
        self.logger.info("Looking for roll initiative button ...")
        assert len(self.find_elements_by_class_name("vtt-roll-initiative")) == 1

    def test_attack_with_weapon_buttons(self):
        self.logger.info("Looking for attack with weapon buttons ...")
        assert len(self.find_elements_by_class_name("vtt-attack-with-weapon")) >= 1

    def test_roll_weapon_damage_buttons(self):
        self.logger.info("Looking for roll weapon damage buttons ...")
        assert len(self.find_elements_by_class_name("vtt-roll-weapon-damage")) >= 1

    def test_roll_proficiency_buttons(self):
        self.logger.info("Looking for roll proficiency buttons ...")
        assert len(self.find_elements_by_class_name("vtt-roll-proficiency")) >= 18

    def test_attack_with_spell_buttons(self):
        self.logger.info("Looking for attack with spell buttons ...")
        assert len(self.find_elements_by_class_name("vtt-attack-with-spell")) >= 1

    def test_use_feature_buttons(self):
        self.logger.info("Looking for use feature buttons ...")
        assert len(self.find_elements_by_class_name("vtt-use-feature")) >= 1

    def run(self, character: Character):
        self.logger.info(
            "Running existence tests for character: {} ...".format(character)
        )
        self.driver.get(character.url)

        self.test_roll_ability_score_buttons()
        self.test_roll_skill_buttons()
        self.test_roll_saving_throw_buttons()

        self.select_tab_by_index(0)
        self.test_roll_initiative_button()
        self.test_attack_with_weapon_buttons()
        self.test_roll_weapon_damage_buttons()

        self.select_tab_by_index(1)
        self.test_roll_proficiency_buttons()

        self.select_tab_by_index(2)
        self.test_attack_with_spell_buttons()

        self.select_tab_by_index(3)
        self.test_use_feature_buttons()

        self.select_tab_by_index(4)
        self.test_attack_with_weapon_buttons()
        self.test_roll_weapon_damage_buttons()
