# Word Switch - Add word switching functionality in Gutenberg

## Description

A lightweight WordPress plugin that adds word-switching functionality to Gutenberg’s Paragraph and Heading blocks, allowing users to dynamically replace or rotate selected words for more engaging and flexible content presentation.

## Installation

1. Download or install the plugin.

2. Activate the plugin in your WordPress admin panel

## How to use?

Simply select the words you want to switch, then click ‘Mark as Word Switcher Area’ from the Word Formatter toolbar to enable dynamic word switching in your content.

![Word Switch](word-switch.png?raw=true "Word Switch")

Currently, the comma ( , ) is the only supported separator. Support for custom and flexible separator characters is under development and will be available soon.

## Development

1. Clone this repository into your WordPress plugins directory:

   ```bash
   cd wp-content/plugins
   git clone [repository-url] word-switch
   ```

2. Install dependencies:

   ```bash
   cd word-switch
   npm install
   ```

3. Build the plugin:
   ```bash
   npm run build
   ```

## License

GPLv2
