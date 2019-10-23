/**
 * 公共工具方法
 */

/**
 * 拼接url后的查询参数
 * @param paramObj
 * @returns {string}
 */
const formatQueryParams = function(paramObj) {
  let paramsStr = "?";
  for (let item in paramObj) {
    if (paramObj.hasOwnProperty(item)) {
      paramsStr += `${item}=${paramObj[item]}&`;
    }
  }
  paramsStr = paramsStr.replace(/[&]$/, "");
  return paramsStr;
};
export { formatQueryParams };
