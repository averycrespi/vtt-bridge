from typing import List


class Character:
    def __init__(
        self,
        *,
        url: str,
        name: str = "",
        num_weapons: int = 0,
        num_tools: int = 0,
        num_spells: int = 0,
        num_features: int = 0,
        spells: List[str] = []
    ):
        """Create a new character."""
        self.url = url
        self.name = name
        self.num_weapons = num_weapons
        self.num_tools = num_tools
        self.num_spells = num_spells
        self.num_features = num_features
        self.spells = spells
