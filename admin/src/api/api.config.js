import config from "@/config";

const env = process.env.VUE_APP_ENV;

export default {
  tokenKey: "admin_token",
  getBaseUrl() {
    return config.baseUrl[env];
  },
  getSessionToken() {
    return localStorage.getItem(this.tokenKey);
  },
  setSessionToken(value) {
    localStorage.setItem(this.tokenKey, value);
  },
  removeSessionToken() {
    localStorage.removeItem(this.tokenKey);
  },
};
