# Development

## Building the extension

> Requirements: [Git](https://git-scm.com/) and the [Yarn](https://yarnpkg.com/) package manager.

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

## Running the extension

> Prerequisites: Follow "Building the extension".

> Requirements: [Firefox](https://www.mozilla.org/en-CA/firefox/) and [Chromium](https://www.chromium.org/).

```sh
# Build the extension package.
yarn build

# Start Firefox with the extension loaded.
# The `firefox` binary must be in your $PATH.
# The Firefox profile will be saved in `.profiles/firefox`.
yarn firefox:run

# Start Chromium with the extension loaded.
# The `chromium-browser` binary must be in your $PATH.
# The Chromium profile will be saved in `.profiles/chromium`.
yarn chromium:run
```

## Testing the extension

> Prerequisites: Follow "Building the extension".

> Requirements: [Python](https://www.python.org/) 3.6 (or newer), [geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/), and [chromedriver](https://chromedriver.chromium.org/).

```sh
# Build the extension package.
yarn build

# Run unit tests.
yarn parcel:test

# Run automation tests with Firefox.
# The `geckodriver` binary must be in your $PATH.
yarn firefox:test

# Run automation tests with Chromium.
# The `chromedriver` binary must be in your $PATH.
yarn chromium:test

# Run all tests.
yarn test
```

See [tests/README.md](tests/README.md) for more information about automation tests.

## Creating your own version of the extension

> Prerequisites: Follow "Building the extension".

> Warning: If you create your own version of the extension, you will NOT receive automatic updates.

If you want to make changes to the extension, you can create your own version of VTT Bridge.

```sh
# Clone the repository.
git clone https://github.com/averycrespi/vtt-bridge.git && cd vtt-bridge
```

For example, you can modify the extension to support your personal DMV server.

```diff
// Edit the "content_scripts" array in `manifest.json`.
// For each domain you want to support, add a string to the `matches` array.
content_scripts": [
    {
-     "matches": ["*://www.dungeonmastersvault.com/pages/dnd/5e/characters/*?frame=true"],
+     "matches": [
+           "*://www.dungeonmastersvault.com/pages/dnd/5e/characters/*?frame=true",
+           "*://example.com/pages/dnd/5e/characters/*?frame=true",
+     ],
      "js": ["dist/polyfill.js", "dist/dmv.js"],
      "css": ["dist/dmv.css"]
    },
    {
      "matches": ["*://app.roll20.net/editor*"],
      "js": ["dist/polyfill.js", "dist/roll20.js"],
      "css": ["dist/roll20.css"]
    }
  ]
```

After editing `manifest.json`, you must rebuild the extension with your changes.

```sh
# Build the extension package.
yarn build

# Find the packaged extension file in `web-ext-artifacts/`.
ls web-ext-artifacts
# e.g. vtt_bridge-1.2.3.zip
```

Next, you will need to manually install the packaged extension file.

- Firefox: Follow the [Mozilla documentation](https://support.mozilla.org/en-US/kb/find-and-install-add-ons-add-features-to-firefox#w_how-do-i-find-and-install-add-ons), specifically the "For advanced users" section.
- Chrome/Chromium: Visit [chrome://extensions](chrome://extensions), enable "Developer mode", then drag-and-drop the `.zip` file.