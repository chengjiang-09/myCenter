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
          target: 'http://api.map.baidu.com', // 请求到/api/xx 就会被代理到http://www.xxx.com/api/xxx
          //  secure: false, // 如果是https接口，需要配置这个参数
          changeOrigin: true, // 接口跨域 需打开这个参数
          pathRewrite: { '^/baidu': '/' } // 忽略前缀/api  则会被代理到http://www.xxx.com/xxx
        },
        '/my': {
          target: 'https://127.0.0.1:8000',
          changeOrigin: true, // 接口跨域 需打开这个参数
          pathRewrite: { '^/my': '/' }
        }
      }
    }
  }
})
