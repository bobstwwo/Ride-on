const path = require('path');
module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `
                @import "@/assets/scss/_variables.scss";
                @import "@/assets/scss/_keyframes.scss";
                @import "@/assets/scss/_fonts.scss";
                @import "@/assets/scss/_root.scss";
            `,
      },
    },
  },
  publicPath: "/",
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
  },
};
