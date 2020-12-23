import http from "@/api/request";

export default {
  // 上传图片
  uploadImg(params) {
    return http.POST('/admin/api/upload', params);
  },
};
