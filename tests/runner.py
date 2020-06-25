from logging import Logger
import time

from engine import Engine


class Runner:
    def __init__(self, engine: Engine, logger: Logger):
        """Create a new test runner."""
        self.engine = engine
        self.logger = logger

    def run(self, character_url: str):
        """Run tests."""
        self.logger.debug("Running tests for character: {} ...".format(character_url))
        self.engine.load_url(character_url)
        self.engine.expect_toast("Connected to VTT Bridge!")
        self._test_left_panel()
        # Test forwards movement.
        self._test_combat_tab()
        self._test_proficiencies_tab()
        self._test_features_tab()
        self._test_spells_tab()
        self._test_equipment_tab()
        # Test backwards movement.
        self._test_equipment_tab()
        self._test_spells_tab()
        self._test_features_tab()
        self._test_proficiencies_tab()
        self._test_combat_tab()
        # Test individual buttons.
        self._test_roll_strength_button()

    def _toggle_visibility(self):
        self.engine.find(".vtt-toggle-visibility")[0].click()

    def _test_left_panel(self):
        ability_score = self.engine.find(".vtt-roll-ability-score")
        assert len(ability_score) == 6, "Wrong number of roll ability score buttons"
        skill = self.engine.find(".vtt-roll-skill")
        assert len(skill) == 18, "Wrong number of roll skill buttons"
        saving_throw = self.engine.find(".vtt-roll-saving-throw")
        assert len(saving_throw) == 6, "Wrong number of roll saving throw buttons"

    def _test_combat_tab(self):
        self.engine.select_tab_by_index(0)
        initiative = self.engine.find(".vtt-roll-initiative")
        assert len(initiative) == 1, "Wrong number of roll initiative buttons"
        attack = self.engine.find(".vtt-attack-with-weapon")
        assert len(attack) >= 1, "Wrong number of attack with weapon buttons"
        damage = self.engine.find(".vtt-roll-weapon-damage")
        assert len(damage) >= 1, "Wrong number of roll weapon damage buttons"
        assert len(attack) == len(damage), "Mismatched weapon buttons"

    def _test_proficiencies_tab(self):
        self.engine.select_tab_by_index(1)
        proficiency = self.engine.find(".vtt-roll-proficiency")
        assert len(proficiency) >= 1, "Wrong number of roll proficiency buttons"

    def _test_spells_tab(self):
        self.engine.select_tab_by_index(2)
        attack = self.engine.find(".vtt-attack-with-spell")
        assert len(attack) >= 1, "Wrong number of attack with spell buttons"

    def _test_features_tab(self):
        self.engine.select_tab_by_index(3)
        feature = self.engine.find(".vtt-use-feature")
        assert len(feature) >= 1, "Wrong number of use feature buttons"

    def _test_equipment_tab(self):
        self.engine.select_tab_by_index(4)
        attack = self.engine.find(".vtt-attack-with-weapon")
        assert len(attack) >= 1, "Wrong number of attack with weapon buttons"
        damage = self.engine.find(".vtt-roll-weapon-damage")
        assert len(damage) >= 1, "Wrong number of roll weapon damage buttons"
        assert len(attack) == len(damage), "Mismatched weapon buttons"

    def _test_roll_strength_button(self):
        ability_score = self.engine.find(".vtt-roll-ability-score")
        strength = ability_score[0]
        strength.click()
        self.engine.expect_toast("Player rolled STR check!")
        self.engine.control_click(strength)
        self.engine.expect_toast("Player rolled STR check with advantage!")
        self.engine.shift_click(strength)
        self.engine.expect_toast("Player rolled STR check with disadvantage!")
        self._toggle_visibility()
        strength.click()
        self.engine.expect_toast("Player rolled STR check! (hidden)")
        self.engine.control_click(strength)
        self.engine.expect_toast("Player rolled STR check with advantage! (hidden)")
        self.engine.shift_click(strength)
        self.engine.expect_toast("Player rolled STR check with disadvantage! (hidden)")
        self._toggle_visibility()
