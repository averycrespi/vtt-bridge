# Development

> **Formatting note**: For brevity, Dungeon Master's Vault will be abbreviated as "DMV".

## Getting Started

Requires [Git](https://git-scm.com/) and the [Yarn](https://yarnpkg.com/) package manager.

```sh
# Clone the repository.
git clone https://github.com/averycrespi/vtt-bridge.git && cd vtt-bridge

# Install dependencies.
yarn

# Install build tools.
# `parcel` bundles the JavaScript and CSS.
# `web-ext` builds and runs the extension.
yarn global add parcel web-ext

# Build the extension for Firefox and Chrome/Chromium.
# The build artifacts will be generated in `web-ext-artifacts/`.
yarn build

# Start Firefox with the extension loaded.
# The `firefox` binary must be in your PATH.
# Your profile will be saved to `profiles/firefox``.
yarn firefox:run

# Start Chromium with the extension loaded.
# The `chromium-browser` binary must be in your PATH.
# Your profile will be saved to `profiles/chromium``.
yarn chromium:run
```

See [package.json](package.json) for a list of all build scripts.

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

> **Historical note**: The extension previously used a relay-based architecture, where `background.js` forwarded commands from `dmv.js` to `roll20.js`. This required the `tabs` permission to let the extension [access your browser tabs](https://support.mozilla.org/en-US/kb/permission-request-messages-firefox-extensions#w_access-browser-tabs). For security reasons, the queue-based architecture was adopted as a replacement.

## Implementation Details

DMV and Roll20 are dynamic web applications. The [DOM](https://en.wikipedia.org/wiki/Document_Object_Model) is updated by JavaScript during page load and after user interaction. To correctly inject buttons and event listeners, the extension needs to wait for certain elements to load. The [onElementLoad](src/common.js) function uses [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff) to efficiently check for the existence of an element in the DOM.

Whenever possible, the extension [uses DMV's existing CSS](src/dmv/elements.js) to maintain consistency. The `form-button` class is used to style buttons and the `m` classes are used to add margin. When DMV's available styles are insufficient, the extension tries to match the color and font (e.g. toast styles in [dmv.css](src/styles/dmv.css)).
