const path = require("path");
module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
                @import "@/assets/scss/_variables.scss";
                @import "@/assets/scss/_mixins.scss";
                @import "@/assets/scss/_fonts.scss";
            `,
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("@", path.resolve(__dirname, "src"));
  },
};
