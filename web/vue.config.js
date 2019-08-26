module.exports = {
  lintOnSave: false,

  configureWebpack: {
    resolve: {
      alias: {

      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  }
}
