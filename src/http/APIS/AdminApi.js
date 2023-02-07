import myaxios from "../MyAxios";

import baseURL from "../baseURL.js";
const bmdURL = baseURL.bmdURL;

const adminApi = {
  /**
   * 执行登录业务
   * @param {Object} params {username:xx,  password:xxx}
   */
  login(params) {
    return myaxios.post(bmdURL + "/user/login", params);
  },
};

export default adminApi;
