# Development

## Building

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
```

## Running

Requires [Firefox](https://www.mozilla.org/en-CA/firefox/) and [Chromium](https://www.chromium.org/).

```sh
# Build the extension package.
yarn build

# Start Firefox with the extension loaded.
# The `firefox` binary must be in your PATH.
# The Firefox profile will be saved in `.profiles/firefox`.
yarn firefox:run

# Start Chromium with the extension loaded.
# The `chromium-browser` binary must be in your PATH.
# The Chromium profile will be saved in `.profiles/chromium`.
yarn chromium:run
```

## Testing

Requires [Python](https://www.python.org/) 3.6 (or newer), [geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/), and [chromedriver](https://chromedriver.chromium.org/).

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

## How does the extension work?

- The extension is loaded.
  - `background.js` creates an empty command queue.
  - `background.js` starts listening for messages.
- The user opens a character sheet on Dungeon Master's Vault.
  - `dmv.js` displays a welcome toast.
  - `dmv.js` adds buttons and event listeners to the page.
  - `dmv.js` starts listening for dispatched actions.
- The user joins a Roll20 game.
  - `roll20.js` displays a welcome toast.
  - `roll20.js` sends a `clear` message to `background.js`.
  - `background.js` receives the `clear` message and empties its queue.
- The user clicks a <kbd>Roll</kbd> button on Dungeon Master's Vault.
  - `dmv.js` dispatches a `click` action with the class name, event, and data.
  - `dmv.js` receives the `click` action.
  - `dmv.js` parses the `click` action into a toast and a list of commands.
  - `dmv.js` displays the toast.
  - `dmv.js` sends an `enqueue` message (with the commands) to `background.js`.
  - `background.js` receives the `enqueue` message and adds the commands to its queue.
  - `roll20.js` sends a `dequeue` message to `background.js`.
  - `background.js` receives the `dequeue` message and responds with all commands in its queue.
  - `background.js` empties its queue.
  - `roll20.js` receives the response and runs the commands.
