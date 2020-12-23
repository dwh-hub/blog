const path = require("path")

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  lintOnSave: false,
  devServer: {
    port: 4000
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'ASSETS': path.resolve(__dirname, './src/assets'),
        'COMPS': path.resolve(__dirname, './src/components'),
        'COMMON': path.resolve(__dirname, './src/common'),
        'VIEWS': path.resolve(__dirname, './src/views'),
      }
    }
  },
}