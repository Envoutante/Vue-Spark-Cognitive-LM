var webpack = require('webpack')

module.exports = {
  publicPath: './',

  lintOnSave: false,
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: 'https://cn-cd-dx-tmp7.natfrp.cloud:28319',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': '/',
    //     },
    //   },
    // },
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
