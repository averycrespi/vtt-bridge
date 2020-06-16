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