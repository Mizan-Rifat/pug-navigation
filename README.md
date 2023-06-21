# VS Code Extension - Pug Navigation

<div align="center">
  <img src="img/logo.png" alt="VS Code Extension Logo">
</div>

## Overview

The Pug Navigation extension for Visual Studio Code enhances your development experience by providing easy navigation to definition files and mixin declarations within your Pug (formerly Jade) templates. With just a few clicks, you can quickly jump to the extended or included partial file or navigate to the mixin definition file, saving you valuable time during Pug template development.

## Installation

1. Launch Visual Studio Code.
2. Open the Extensions view by clicking on the square icon on the left sidebar or by pressing `Ctrl+Shift+X`.
3. Search for "Pug Navigation" in the extension marketplace.
4. Click the "Install" button to install.

## Usage

### GoTo Definition

1. Place the cursor on the Pug extends or Pug include statement you want to navigate to.
2. Press `Ctrl+O` to jump to the definition file.
3. The extension will automatically open the corresponding definition file.

### Mixin Navigator

1. Select the mixin name you want to navigate to.
2. Press `Ctrl+O` to jump to the mixin definition file.
3. The extension will locate and open the mixin definition file for you.

## Configuration

No additional configuration is required for the extension to work. It automatically analyzes your Pug project structure and provides navigation to the corresponding files.

## Troubleshooting

If you encounter any issues while using the Pug Navigation extension, try the following steps:

1. Make sure the extension is properly installed and enabled.
2. Ensure that your Pug templates have the necessary extends or include statements.
3. If the navigation doesn't work as expected, check that the definition files and mixin declaration files are correctly referenced and located within your project.

## Contributing

Contributions to this extension are welcome! If you would like to report a bug, suggest new features, or submit improvements, go ahead.

## License

This extension is released under the [MIT License](LICENSE).

## Changelog

### Version 1.0.0

- Initial release of the Pug Navigation extension.
