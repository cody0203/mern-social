const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@primary-color": "#B63246",
          "@link-color": "#616770",
          "@border-radius-base": "2px",
        },
      },
    },
  ],
};
