const { defineConfig } = require('@vue/cli-service')

const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/styles/mixin.less')
      ]
    }
  },

  configureWebpack: {
    devServer: {
      host: 'localhost',
      port: 8080,
      proxy: {
        '/baidu': {
          target: 'http://api.map.baidu.com',
          changeOrigin: true,
          pathRewrite: { '^/baidu': '/' }
        },
        '/my': {
          target: 'https://127.0.0.1:8000',
          changeOrigin: true,
          pathRewrite: { '^/my': '/' }
        }
      }
    }
  }
})
