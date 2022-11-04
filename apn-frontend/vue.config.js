const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify',
  ],
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      title: 'Анализ производственных ниш',
    },
  },
});
