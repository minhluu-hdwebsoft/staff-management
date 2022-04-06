/* eslint-disable @typescript-eslint/no-var-requires */
const typescriptTransform = require("i18next-scanner-typescript");

module.exports = {
  input: [
    "src/**/**/*.{js, tsx}",
    "src/modules/**/**/*.{js, tsx}",
    // // Use ! to filter out files or directories
    // "!app/**/*.spec.{js,jsx}",
    // "!app/i18n/**",
    // "!**/node_modules/**",
  ],
  attr: false,
  output: "./",
  options: {
    debug: true,
    func: {
      list: ["i18next.t", "i18n.t", "t"],
      extensions: [".js", ".tsx"],
    },
    lngs: ["en", "vn"],
    ns: ["translation"],
    defaultLng: "en",
    defaultNs: "translation",
    defaultValue: function (lng, ns, key) {
      // always return key as default value since we do only generate lngs: 'en'
      return key;
    },
    resource: {
      loadPath: "public/locales/{{lng}}/{{ns}}.json",
      savePath: "public/locales/{{lng}}/{{ns}}.json",
      jsonIndent: 2,
      lineEnding: "\n",
    },
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    },
  },
  transform: typescriptTransform({
    // default value for extensions
    extensions: [".ts,.tsx"],
  }),
};
