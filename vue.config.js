var webpack = require('webpack')

module.exports = {
  publicPath: './',

  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.ai.qq.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },

  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery',
      }),
    ],
  },
}
