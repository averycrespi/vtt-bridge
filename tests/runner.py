from logging import Logger

from character import Character
from engine import Engine


class Runner:
    def __init__(self, engine: Engine, logger: Logger):
        """Create a new test runner."""
        self.engine = engine
        self.logger = logger

    def run(self, character: Character):
        """Run tests."""
        self.logger.debug(f"Running tests for character: {character.name}")
        self.engine.load_url(character.url)
        self.engine.expect_toast("Connected to VTT Bridge!")
        self._check_left_panel()

        self.logger.debug("Moving forwards through tabs")
        self._check_combat_tab(character.num_weapons)
        self._check_proficiencies_tab(character.num_tools)
        self._check_features_tab(character.num_features)
        self._check_spells_tab(character.num_spells)
        self._check_equipment_tab(character.num_weapons)

        self.logger.debug("Moving backwards through tabs")
        self._check_equipment_tab(character.num_weapons)
        self._check_spells_tab(character.num_spells)
        self._check_features_tab(character.num_features)
        self._check_proficiencies_tab(character.num_tools)
        self._check_combat_tab(character.num_weapons)

        self.logger.debug("Checking user interaction")
        self._check_roll_strength_button()
        for spell in character.tested_spells:
            self._check_spell_expansion(spell)

    def _toggle_visibility(self):
        self.logger.debug("Toggling visibility")
        self.engine.find(".vtt-toggle-visibility")[0].click()

    def _check_left_panel(self):
        self.logger.debug("Checking left panel")
        ability_score = self.engine.find(".vtt-roll-ability-score")
        assert len(ability_score) == 6, "Wrong number of roll ability score buttons"
        skill = self.engine.find(".vtt-roll-skill")
        assert len(skill) == 18, "Wrong number of roll skill buttons"
        saving_throw = self.engine.find(".vtt-roll-saving-throw")
        assert len(saving_throw) == 6, "Wrong number of roll saving throw buttons"

    def _check_combat_tab(self, num_weapons: int):
        self.logger.debug("Checking combat tab")
        self.engine.select_tab_by_index(0)
        initiative = self.engine.find(".vtt-roll-initiative")
        assert len(initiative) == 1, "Wrong number of roll initiative buttons"
        attack = self.engine.find(".vtt-attack-with-weapon")
        assert len(attack) == num_weapons, "Wrong number of attack with weapon buttons"
        damage = self.engine.find(".vtt-roll-weapon-damage")
        assert len(damage) == num_weapons, "Wrong number of roll weapon damage buttons"

    def _check_proficiencies_tab(self, num_tools: int):
        self.logger.debug("Checking proficiencies tab")
        self.engine.select_tab_by_index(1)
        proficiency = self.engine.find(".vtt-roll-proficiency")
        assert (
            len(proficiency) == 18 + num_tools
        ), "Wrong number of roll proficiency buttons"

    def _check_spells_tab(self, num_spells: int):
        self.logger.debug("Checking spells tab")
        self.engine.select_tab_by_index(2)
        attack = self.engine.find(".vtt-attack-with-spell")
        assert len(attack) == num_spells, "Wrong number of attack with spell buttons"

    def _check_features_tab(self, num_features: int):
        self.logger.debug("Checking features tab")
        self.engine.select_tab_by_index(3)
        feature = self.engine.find(".vtt-use-feature")
        assert len(feature) == num_features, "Wrong number of use feature buttons"

    def _check_equipment_tab(self, num_weapons: int):
        self.logger.debug("Checking equipment tab")
        self.engine.select_tab_by_index(4)
        attack = self.engine.find(".vtt-attack-with-weapon")
        assert len(attack) == num_weapons, "Wrong number of attack with weapon buttons"
        damage = self.engine.find(".vtt-roll-weapon-damage")
        assert len(damage) == num_weapons, "Wrong number of roll weapon damage buttons"

    def _check_roll_strength_button(self):
        self.logger.debug("Checking roll strength button")
        self.engine.select_tab_by_index(0)
        ability_score = self.engine.find(".vtt-roll-ability-score")
        strength = ability_score[0]
        strength.click()
        self.engine.expect_toast(".*? rolled STR check!")
        self.engine.control_click(strength)
        self.engine.expect_toast(".*? rolled STR check with advantage!")
        self.engine.shift_click(strength)
        self.engine.expect_toast(".*? rolled STR check with disadvantage!")
        self._toggle_visibility()
        strength.click()
        self.engine.expect_toast(r".*? rolled STR check! \(hidden\)")
        self.engine.control_click(strength)
        self.engine.expect_toast(r".*? rolled STR check with advantage! \(hidden\)")
        self.engine.shift_click(strength)
        self.engine.expect_toast(r".*? rolled STR check with disadvantage! \(hidden\)")
        self._toggle_visibility()

    def _check_spell_expansion(self, spell: str):
        self.logger.debug("Checking spell expansion")
        self.engine.select_tab_by_index(2)
        pointer_cells = self.engine.find(".spell.pointer td")
        for cell in pointer_cells:
            if cell.get_attribute("innerText").strip() == spell:
                cell.click()
                break
        else:
            raise ValueError(f"Can't find spell: {spell}")
        cast = self.engine.find(".vtt-cast-spell")
        assert len(cast) == 1, "Wrong number of cast spell buttons"
        cast[0].click()
        self.engine.expect_toast(f".*? cast {spell}!")
        cell.click()  # Cleanup expansion
