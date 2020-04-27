<div align="center">
    <br>
    <a href="https://github.com/averycrespi/vtt-bridge">
        <img src="https://raw.githubusercontent.com/averycrespi/vtt-bridge/master/assets/logo.png" alt="Logo" width="200">
    </a>
    <br>
    <h1>VTT Bridge</h1>
</div>

<div align="center">
    <h4>A browser extension that connects Dungeon Master's Vault to Roll20.</h4>
</div>

<div align="center">
    <a href="#about">About</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#development">Development</a> •
    <a href="#credits">Credits</a> •
    <a href="#license">License</a>
</div>

## About

> Do you manage your character sheet using Dungeon Master's Vault, but hate manually entering your rolls in Roll20?

VTT Bridge connects your DMV character sheet to your active Roll20 game. With the click of a button, you can:

- Attack with weapons
- Cast cantrips and spells (_TODO_)
- Roll ability scores, initiative, saving throws, and skills
- Use actions and features

### Disclaimer

The use of this tool is meant for use for your own campaigns. It is only meant and should only be used on campaigns with content that you legally possess. The use of this tool may violate the [Roll 20 Marketplace Asset EULA](https://wiki.roll20.net/Marketplace_Asset_EULA) or the [Roll 20 Terms of Service](https://wiki.roll20.net/Terms_of_Service_and_Privacy_Policy). This tool is not affiliated with Dungeon Master's Vault, Roll20, or Wizards of the Coast.

## Getting Started

1. Install the VTT Bridge extension. (_TODO_)
2. Open your Dungeon Master's Vault character sheet. Click the <kbd>Connect to Roll20</kbd> button.
3. Open your Roll20 game in another tab. You should see a message that says `Connected to Dungeon Master's Vault`.
4. Click one of the <kbd>Roll</kbd> buttons on your Dungeon Master's Vault character sheet.
5. Watch your roll appear in your Roll20 game.

## Development

Requires [Git](https://git-scm.com/) and the [Yarn](https://yarnpkg.com/) package manager.

You may need to install [web-ext](https://github.com/mozilla/web-ext) and [Parcel](https://parceljs.org/) globally (e.g. with `yarn global add web-ext parcel`).

```sh
# Clone the repository
git clone https://github.com/averycrespi/vtt-bridge && cd vtt-bridge

# Install dependencies
yarn

# Build the content and background scripts
yarn build

# Start Firefox with the extension loaded
yarn firefox:run
```

### Structure

The extension loads three scripts:

- `dmv.js`: Adds buttons to DMV character sheets. Sends a message to `background.js` when a button is clicked.
- `background.js`: Receives messages from `dmv.js` and forwards them to `roll20.js`.
- `roll20.js`: Receives messages from `background.js` and runs the commands in Roll20.

We can't send messages directly between content scripts, so we use a background script as a relay.

The extension requires the `tabs` permission to find Roll20 tabs in the same window.

## Credits

Project inspired by [VTT Enhancement Suite](https://ssstormy.github.io/roll20-enhancement-suite/).

Logo derived from [dragon by BGBOXXX Design](https://thenounproject.com/term/dragon/1646665/) from the Noun Project.

## License

[MIT](https://choosealicense.com/licenses/mit/)
