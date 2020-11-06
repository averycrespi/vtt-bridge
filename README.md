<div align="center">
    <br>
    <img src="assets/icon-full.png" alt="Icon" width="200">
    <br>
    <h1>VTT Bridge</h1>
</div>

<div align="center">
    <h4>A browser extension that connects
        <a href="https://www.dungeonmastersvault.com/">Dungeon Master's Vault</a>
        to
        <a href="https://roll20.net/">Roll20</a>.
    </h4>
    <hr>
</div>

<div align="center">
    <a href="https://addons.mozilla.org/en-CA/firefox/addon/vtt-bridge/">
        <img src="https://img.shields.io/amo/v/vtt-bridge" alt="Mozilla Add-On version badge">
    </a>
    <a href="https://addons.mozilla.org/en-CA/firefox/addon/vtt-bridge/">
        <img src="https://img.shields.io/amo/users/vtt-bridge" alt="Mozilla Add-on users badge">
    </a>
</div>

<div align="center">
    <a href="https://chrome.google.com/webstore/detail/vtt-bridge/fadncbccmelchegmlghbhpjchdmghmhh">
        <img src="https://img.shields.io/chrome-web-store/v/fadncbccmelchegmlghbhpjchdmghmhh" alt="Chrome Web Store version badge">
    </a>
    <a href="https://chrome.google.com/webstore/detail/vtt-bridge/fadncbccmelchegmlghbhpjchdmghmhh">
        <img src="https://img.shields.io/chrome-web-store/users/fadncbccmelchegmlghbhpjchdmghmhh" alt="Chrome Web Store users badge">
    </a>
</div>

<div align="center">
    <a href="https://github.com/averycrespi/vtt-bridge/commits/master">
        <img src="https://img.shields.io/github/last-commit/averycrespi/vtt-bridge/master" alt="Last commit badge">
    </a>
    <a href="https://github.com/averycrespi/vtt-bridge/issues">
        <img src="https://img.shields.io/github/issues/averycrespi/vtt-bridge" alt="Issues badge">
    </a>
    <a href="https://github.com/averycrespi/vtt-bridge/blob/master/LICENSE">
        <img src="https://img.shields.io/github/license/averycrespi/vtt-bridge" alt="License badge">
    </a>
</div>

<div align="center">
  <hr>
  <a href="#about">About</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#faq">FAQ</a> •
  <a href="#development">Development</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
  <hr>
</div>


<div align="center">
    <img src="assets/screenshot_1920x1080.png" alt="Screenshot">
</div>

## About

Do you play D&D on [Roll20](https://roll20.net), but prefer to manage your characters with [Dungeon Master's Vault](https://www.dungeonmastersvault.com)?

VTT Bridge seamlessly connects your Dungeon Master's Vault character sheet to your Roll20 game.

## Key Features

- Roll ability checks, attack with weapons, cast spells, and more!
- <kbd>Ctrl-Click</kbd> to roll with advantage and <kbd>Shift-Click</kbd> to roll with disadvantage.
- Switch between visible commands (everyone can see) and hidden commands (only you and the GM can see).

## Disclaimer

The use of this tool is meant for use for your own campaigns. It is only meant and should only be used on campaigns with content that you legally possess. The use of this tool may violate the [Roll20 Marketplace Asset EULA](https://wiki.roll20.net/Marketplace_Asset_EULA) or the [Roll20 Terms of Service](https://wiki.roll20.net/Terms_of_Service_and_Privacy_Policy). This tool is not affiliated with Dungeon Master's Vault, Roll20, or Wizards of the Coast.

## Getting Started

**Install the extension** by clicking one of the following icons:

<a href="https://addons.mozilla.org/en-CA/firefox/addon/vtt-bridge/">
    <img src="assets/firefox.png" alt="Firefox logo">
</a>

<a href="https://chrome.google.com/webstore/detail/vtt-bridge/fadncbccmelchegmlghbhpjchdmghmhh">
    <img src="assets/chrome.png" alt="Chrome logo">
</a>

**Open your Dungeon Master's Vault character sheet** and click the <kbd>www</kbd> link in the top right.

![www link](assets/www.png)

**Launch your Roll20 game** in another tab. You should see a notification appear in both tabs.

![Notification](assets/notification.png)

**Click a button** on your Dungeon Master's Vault character sheet. Your roll will appear in Roll20!

## FAQ

**Help, the buttons on Dungeon Master's Vault aren't working!**

- Make sure that you clicked the `www` link. If you are on the correct page, the URL should end with `?frame`.

**Why does VTT Bridge need to "Access your data for www.dungeonmastersvault.com and app.roll20.net"?**

- On Dungeon Master's Vault, the extension adds event listeners to buttons.
- On Roll20, the extension runs commands in the chat.
- VTT Bridge will *never* make any changes to your account or your content on either site.

**Do I need to have any specific content on Roll20?**

- No. All Dungeon Master's Vault content (including homebrew) will work, regardless of your Roll20 content.

**Do I need to have a Plus/Pro subscription on Roll20?**

- No. VTT Bridge works with a basic (free) Roll20 account, and will not generate subscriber-only commands.

**Does VTT Bridge work when the Roll20 chat is popped-out?**

- Yes. VTT Bridge works when the text chat is [popped-out](https://wiki.roll20.net/Text_Chat#Pop-Out_Chat) to a new window.

**How can I use VTT Bridge with my personal Dungeon Master's Vault server?**

- VTT Bridge does not officially support personal Dungeon Master's Vault servers.
- However, you can follow the [wiki instructions](https://github.com/averycrespi/vtt-bridge/wiki/Modifying-the-extension) to create your own version of the extension.

**How does VTT Bridge work?**

- See [this wiki page](https://github.com/averycrespi/vtt-bridge/wiki/How-the-extension-works) for a detailed explanation how VTT Bridge works.

**I found a bug! What should I do?**

- [Open an issue](https://github.com/averycrespi/vtt-bridge/issues/new/choose), select "Bug report", then complete the issue template.

**I have an idea for a feature! What should I do?**

- [Open an issue](https://github.com/averycrespi/vtt-bridge/issues/new/choose), select "Feature request", then complete the issue template.

## Development

See [the project wiki](https://github.com/averycrespi/vtt-bridge/wiki) for information about building, testing, and running the extension.

## Credits

Project inspired by [VTT Enhancement Suite](https://ssstormy.github.io/roll20-enhancement-suite/).

Logo derived from [dragon by BGBOXXX Design](https://thenounproject.com/term/dragon/1646665/) from the Noun Project.

## License

[MIT](https://choosealicense.com/licenses/mit/)
