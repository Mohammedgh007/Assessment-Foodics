const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    hot: true, 
    open: true,
    proxy: {
      '/api': {
        target: 'https://api.foodics.dev',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  },
})
