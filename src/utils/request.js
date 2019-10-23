import axios from "axios";
import { Toast } from "vant";

const appconfig = require("../../appconfig.js");

axios.defaults.timeout = 1000 * 60;
axios.defaults.withCredentials = true;

const currentApp = appconfig.current;
const app = appconfig.appList.filter(item => {
  return currentApp === item.src;
})[0];
// local环境
if (process.env.NODE_ENV.trim() === "development") {
  axios.defaults.withCredentials = false;
  axios.defaults.baseURL = (app ? app.local : "") + "/api";
} else {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = (app ? app[appconfig.env + "Url"] : "") + "/api";
}

axios.interceptors.request.use(
  config => {
    // 登陆接口：baseUrl/auth/login
    // 普通接口：bashUrl/mpay-sport/xxxx
    const urlPrefix = config.url.indexOf("auth") >= 0 ? "" : "mpay-sport";
    config.url = urlPrefix + config.url;
    const Authorization = localStorage.getItem("Authorization");
    if (Authorization) {
      config.headers.Authorization = "Bearer " + Authorization;
    }
    if (config.method === "post") {
      // config.data = config.data;
      config.headers["Content-type"] = "application/json;charset=UTF-8";
    }
    if (config.method === "get" || config.method === "delete") {
      config.params = config.data;
    }
    return config;
  },
  error => {
    // Do something with request error
    Toast({
      message: error,
      position: "bottom",
      duration: 5000
    });
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.errorCode !== 0) {
      Toast({
        message: res.errorMessage,
        position: "bottom",
        duration: 5000
      });
      return Promise.reject("error");
    } else {
      return Promise.resolve(res.datas);
    }
  },
  error => {
    // 服务端异常
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          Toast({
            message: "请求错误(400)",
            position: "bottom",
            duration: 5000
          });
          break;
        case 401:
          Toast({
            message: "未授权，请登录(401)",
            position: "bottom",
            duration: 5000
          });
          break;
        case 403:
          Toast({
            message: "拒绝访问(403)",
            position: "bottom",
            duration: 5000
          });
          break;
        case 404:
          Toast({
            message: `请求地址出错 ${error.response.config.url}`,
            position: "bottom",
            duration: 5000
          });
          break;
        case 408:
          Toast({
            message: "请求超时(408)",
            position: "bottom",
            duration: 5000
          });
          break;
        case 500:
          Toast({
            message: "服务器内部错误(500)",
            position: "bottom",
            duration: 5000
          });
          break;
        case 501:
          Toast({
            message: "服务未实现(501)",
            position: "bottom",
            duration: 5000
          });
          break;
        case 502:
          Toast({
            message: "网关错误(502)",
            position: "bottom",
            duration: 5000
          });
          break;
        case 503:
          Toast({
            message: "服务不可用(503)",
            position: "bottom",
            duration: 5000
          });
          break;
        case 504:
          Toast({
            message: "网关超时(504)",
            position: "bottom",
            duration: 5000
          });
          break;
        case 505:
          Toast({
            message: "HTTP版本不受支持(505)",
            position: "bottom",
            duration: 5000
          });
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
