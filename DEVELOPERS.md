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

## Structure

- `assets`: Contains images for documentation purposes. Not included in the extension package.
- `dist`: Contains the compiled extension files. Not included in Git.
- `icons`: Contains icons of various sizes.
- `src`: Contains the source code (and unit tests) of the extension.
- `tests`: Contains browser automation tests. Not included in the extension package.

## Architecture

The extension uses a **queue-based architecture** to communicate between Dungeon Master's Vault and Roll20.

How it works:

1. The user clicks a button on Dungeon Master's Vault.
2. `dmv.js` builds the commands and sends an `ENQUEUE` message to `background.js`.
3. `background.js` receives the `ENQUEUE` message and appends the commands to its queue.
4. `roll20.js` sends a `DEQUEUE` message to `background.js`. This message is sent at regular intervals.
5. `background.js` receives the `DEQUEUE` message and responds with all commands in its queue. The queue is emptied.
6. `roll20.js` receives the response and runs the commands in Roll20.

Advantages:

- The `tabs` permission is normally required for a background script to send a message to a content script. However, since `background.js` is directly responding to a `DEQUEUE` message from `roll20.js`, this permission is not necessary.
- The extension will not crash if Dungeon Master's Vault is open without a corresponding Roll20 game.

Disadvantages:

- `roll20.js` needs to send a `DEQUEUE` message at regular intervals. Most of the time, the command queue (and therefore the response) will be empty. This creates a trade-off between performance and delay.