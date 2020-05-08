# Development

> **Note**: For brevity, Dungeon Master's Vault will be abbreviated as "DMV".

## Getting Started

Requires [Git](https://git-scm.com/) and the [Yarn](https://yarnpkg.com/) package manager.

```sh
# Clone the repository.
git clone https://github.com/averycrespi/vtt-bridge.git && cd vtt-bridge

# Install dependencies.
yarn

# Install build tools.
yarn global add parcel web-ext

# Build the extension package.
yarn build

# Start Firefox with the extension loaded.
# The `firefox` binary must be in your PATH.
yarn firefox:run

# Start Chromium with the extension loaded.
# The `chromium-browser` binary must be in your PATH.
yarn chromium:run
```

When running Firefox or Chromium, your browser profile will be saved in the `.profiles` directory.

## Testing

Requires [Python](https://www.python.org/) 3.6 or newer, [geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/), and [chromedriver](https://chromedriver.chromium.org/).

```sh
# Build the extension package.
yarn build

# Run unit tests with Jest.
yarn parcel:test

# Run automation tests for Firefox.
# The `geckodriver` binary must be in your PATH.
yarn firefox:test

# Run automation tests for Chromium.
# The `chromedriver` binary must be in your PATH.
yarn chromium:test

# Run all tests.
yarn test
```

- The test harness will create and activate a Python virtual environment in the `tests/venv` directory.
- Test characters will be loaded from `tests/characters.json`.
- Test logs will be written to the `tests/logs` directory.

## Project Overview

The extension loads two content scripts and one background script. These scripts perform the following functions:

- [dmv.js](src/scripts/dmv.js): Adds buttons to DMV and enqueues commands.
- [background.js](src/scripts/background.js): Listens for messages and manages the command queue.
- [roll20.js](src/scripts/roll20.js): Dequeues commands and runs commands in Roll20.

The extension uses a queue-based architecture to communicate between DMV and Roll20. An example flow is:

1. The user clicks a <kbd>Roll</kbd> button on DMV.
2. `dmv.js` formats the commands and sends an `ENQUEUE` message to `background.js`.
3. `background.js` receives the `ENQUEUE` message and appends the commands to its queue.
4. `roll20.js` sends a `DEQUEUE` message to `background.js`. This message is sent at regular intervals.
5. `background.js` receives the `DEQUEUE` message and responds with all commands in its queue. The queue is emptied.
6. `roll20.js` receives the response and runs the commands in Roll20.
