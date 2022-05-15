const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  configureWebpack: {
    devtool: "source-map",
  },

  transpileDependencies: [
    'quasar'
  ],

  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import '@/styles/_variables.scss';
        `,
      },
    },
  },

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  }
});

