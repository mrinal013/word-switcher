const [
  defaultConfigNonModule,
  defaultConfigModule,
] = require("@wordpress/scripts/config/webpack.config");
const path = require("path");

module.exports = [
  // Non Module config
  {
    ...defaultConfigNonModule,
    entry: {
      "js/register-format-type": path.resolve(
        process.cwd(),
        "resources/js",
        "register-format-type.js"
      ),
      "css/word-switcher-styles": path.resolve(
        process.cwd(),
        "resources/css",
        "word-switcher-styles.scss"
      ),
    },
  },
  // Module config
  {
    ...defaultConfigModule,
    ...{
      entry: {
        "js/word-switcher-store": path.resolve(
          process.cwd(),
          "resources/js",
          "word-switcher-store.js"
        ),
      },
    },
  },
];
