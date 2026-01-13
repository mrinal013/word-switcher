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
      "css/word-switch-styles": path.resolve(
        process.cwd(),
        "resources/scss",
        "word-switch-styles.scss"
      ),
    },
  },
  // Module config
  {
    ...defaultConfigModule,
    ...{
      entry: {
        "js/word-switch-store": path.resolve(
          process.cwd(),
          "resources/js",
          "word-switch-store.js"
        ),
      },
    },
  },
];
