import config from "@/config";

const env = process.env.VUE_APP_ENV;

export default {
  getBaseUrl() {
    return config.baseUrl[env];
  }
};
