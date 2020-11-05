# Development

Please see the [project wiki](https://github.com/averycrespi/vtt-bridge/wiki) for all development information.

## Building the extension

> Requirements: [Git](https://git-scm.com/), [Yarn](https://yarnpkg.com/)

```sh
# Clone the repository
git clone https://github.com/averycrespi/vtt-bridge.git && cd vtt-bridge

# Install dependencies
yarn

# Install build tools
yarn global add parcel web-ext

# Build the extension package
yarn build
```