export default {
    // cookie中token的储存天数
    cookieExpires: 1,
    baseUrl: {
      development: "http://localhost:3000", // 本地环境,
      test: "http://localhost:3000", // 测试环境
      production: "http://8.136.3.234", // 生产环境
    },
    qiniuUploadUrl: "https://upload-z2.qiniup.com", // 七牛云上传地址
    qiniuUrl: "http://cdn.dahuayuan.cn/" // 七牛云预览地址
  };
  