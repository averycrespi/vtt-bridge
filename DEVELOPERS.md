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

Notes:

- The test harness will create and activate a Python virtual environment in `tests/venv`.
- Characters will be loaded from `tests/characters.json`.
- Logs will be written to `tests/logs`.

## How does the extension work?

### Content and Background Scripts

- `dmv.js`: Loaded on Dungeon Master's Vault. Responsible for managing buttons and creating commands.
- `background.js`: Loaded in the background. Responsible for managing the command queue.
- `roll20.js`: Loaded on Roll20. Responsible for running commands.

### Queue-based Architecture

VTT Bridge uses a queue-based architecture. Commands are created by `dmv.js`, relayed through `background.js`, then ran by `roll20.js`. This relay is necessary because content scripts cannot directly communicate.

`roll20.js` polls `background.js` at regular intervals (e.g. every second) to ask for new commands. This implementation was chosen because the `activeTab` permission is required to send messages from background scripts to content scripts. We can avoid this permission by allowing the `roll20.js` content script to initiate the connection.

### Walkthrough

- The extension is loaded.
  - `background.js` creates an empty command queue.
  - `background.js` starts listening for messages.
- The user opens a character sheet on Dungeon Master's Vault.
  - `dmv.js` displays a welcome notification.
  - `dmv.js` adds buttons and event listeners to the page.
  - `dmv.js` starts listening for dispatched actions.
- The user joins a Roll20 game.
  - `roll20.js` displays a welcome notification.
  - `roll20.js` sends a `clear` message to `background.js`.
  - `background.js` receives the `clear` message and empties its queue.
- The user clicks a button on Dungeon Master's Vault.
  - `dmv.js` dispatches a `click` action with the class name, event, and data.
  - `dmv.js` receives the `click` action.
  - `dmv.js` parses the `click` action into a notification and a list of commands.
  - `dmv.js` displays the notification.
  - `dmv.js` sends an `enqueue` message (with the commands) to `background.js`.
  - `background.js` receives the `enqueue` message and adds the commands to its queue.
  - `roll20.js` sends a `dequeue` message to `background.js`.
  - `background.js` receives the `dequeue` message and responds with all commands in its queue.
  - `background.js` empties its queue.
  - `roll20.js` receives the response and runs the commands.
