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
  devServer: {
    disableHostCheck: true,
    port: 4000,
    public: '0.0.0.0:4000'
  },
  publicPath: "/",
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
    // config.when(process.env.NODE_ENV === 'development',
    //   config => config.devtool('source-map')
    // );
  },
};
