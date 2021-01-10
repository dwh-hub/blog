import http from "@/api/request";
import appConfig from "@/config";

export default {
  // 上传图片 - 废弃
  uploadImg(params) {
    return http.POST("/admin/api/upload", params);
  },
  // 获取七牛云token
  getQiniuToken(params) {
    return http.GET("/admin/api/upload/qiniu", params);
  },
  // 上传至七牛云
  uploadQiniu(params, config) {
    if (!config) {
      config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
    }
    return http.POST(appConfig.qiniuUploadUrl, params, config).then((res) => {
      res.data = appConfig.qiniuUrl + res.key;
      return res;
    });
  },
};
