<div align="center">
    <br>
    <img src="assets/icon-full.png" alt="VTT Bridge" width="200">
    <br>
    <h1>VTT Bridge</h1>
</div>

<div align="center">
    <h4>A browser extension that connects Dungeon Master's Vault to Roll20.</h4>
</div>

<div align="center">
    <a href="https://addons.mozilla.org/en-CA/firefox/addon/vtt-bridge/">
        <img src="assets/firefox.png">
    </a>
</div>

<div align="center">
    <a href="#about">About</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#faq">FAQ</a> •
    <a href="#development">Development</a> •
    <a href="#credits">Credits</a> •
    <a href="#license">License</a>
</div>

## About

VTT Bridge connects your Dungeon Master's Vault character sheet to your Roll20 game.

With the click of a button, you can:

- Attack with weapons
- Cast cantrips and spells (_WIP_)
- Roll ability scores, initiative, saving throws, and skills
- Use actions and features

**Disclaimer**

The use of this tool is meant for use for your own campaigns. It is only meant and should only be used on campaigns with content that you legally possess. The use of this tool may violate the [Roll 20 Marketplace Asset EULA](https://wiki.roll20.net/Marketplace_Asset_EULA) or the [Roll 20 Terms of Service](https://wiki.roll20.net/Terms_of_Service_and_Privacy_Policy). This tool is not affiliated with Dungeon Master's Vault, Roll20, or Wizards of the Coast.

## Getting Started

1. Install the VTT Bridge extension for [Firefox](https://addons.mozilla.org/en-CA/firefox/addon/vtt-bridge/) or Google Chrome (_WIP_).
2. Open your Dungeon Master's Vault character sheet. Click the <kbd>Connect to Roll20</kbd> button.
3. Open your Roll20 game in another tab. You should see a message that says `Connected to Dungeon Master's Vault`.
4. Click one of the <kbd>Roll</kbd> buttons on your Dungeon Master's Vault character sheet.
5. Watch your roll appear in your Roll20 game.

## FAQ

**Why does VTT Bridge need to access my browser tabs?**

VTT Bridge loads a background script to relay commands from Dungeon Master's Vault to Roll20. This background script needs to [find the tab](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/query) that contains the Roll20 game.

**Help, the "Connect to Roll20" button isn't appearing!**

Please reload the page. If the problem persists, [open an issue](https://github.com/averycrespi/vtt-bridge/issues/new).

**Help, the "Connected to Dungeon Master's Vault" message isn't appearing!**

Please reload the page. If the problem persists, [open an issue](https://github.com/averycrespi/vtt-bridge/issues/new).

**Why aren't my rolls appearing in Roll20?**

Please ensure that both tabs (Dungeon Master's Vault and Roll20) are open in the same browser window.

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

# Build the Firefox extension
yarn firefox:build
```

## Credits

Project inspired by [VTT Enhancement Suite](https://ssstormy.github.io/roll20-enhancement-suite/).

Logo derived from [dragon by BGBOXXX Design](https://thenounproject.com/term/dragon/1646665/) from the Noun Project.

## License

[MIT](https://choosealicense.com/licenses/mit/)
