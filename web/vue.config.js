const path = require("path")

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  lintOnSave: false,

  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        'ASSETS': path.resolve(__dirname, './src/assets'),
        'COMPS': path.resolve(__dirname, './src/components'),
        'COMMON': path.resolve(__dirname, './src/common'),
        'PAGES': path.resolve(__dirname, './src/pages'),
      }
    }
  },
  devServer: {
    host: '0.0.0.0'
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/commom/less/*.less')]
    }
  }
}

// pluginOptions: {
//   'style-resources-loader': {
//     'patterns': [
//       path.resolve(__dirname, 'src/styles/abstracts/*.styl'),
//     ]
//   }
// }
