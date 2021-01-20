const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  outputDir: __dirname + "/../serve/front-end/web",
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        ASSETS: path.resolve(__dirname, "./src/assets"),
        COMPS: path.resolve(__dirname, "./src/components"),
        COMMON: path.resolve(__dirname, "./src/common"),
        PAGES: path.resolve(__dirname, "./src/pages"),
      },
    },
  },
  devServer: {
    port: 5000,
    // 配置代理
    proxy: {
      "/bgm": {
        target: "https://api.bgm.tv", // 要访问的接口域名
        secure: false,
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {'^/bgm' : ''},
      },
    },
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/commom/less/*.less")],
    },
  },
};

// pluginOptions: {
//   'style-resources-loader': {
//     'patterns': [
//       path.resolve(__dirname, 'src/styles/abstracts/*.styl'),
//     ]
//   }
// }
