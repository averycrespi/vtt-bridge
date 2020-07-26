# Automation Tests

> Note: see [DEVELOPERS.md](../DEVELOPERS.md) for information about test requirements and usage.

Automation tests are written in Python and use the [Selenium](https://www.selenium.dev/) framework. The Python dependencies are isolated in a virtual environment. Browser logs are written to disk for debugging purposes.

## Overview

Command: `yarn {chromium,firefox}:test`

- Runs the `run_{chromium,firefox}.sh` script.

Script: `run_{chromium,firefox}.sh`

- Checks that `{chrome,gecko}driver` is in `$PATH`.
- Instantiates and activates the Python virtual environment in `venv/`.
- Runs the `main.py` script with the appropriate arguments.

Script: `main.py`

- Creates the webdriver and loads the packaged extension file.
- Loads and instantiates the test engine from `engine.py`.
- Loads and instantiates the test runner from `runner.py`.
- Parses character data from `characters.json` using `character.py`.
- Runs the tests for each character.
