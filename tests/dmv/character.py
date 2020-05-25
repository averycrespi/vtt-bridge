class Character:
    def __init__(self, **kwargs):
        self.name = kwargs["name"]
        self.url = kwargs["url"]

    def __str__(self):
        return self.name
