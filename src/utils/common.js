// 拼接url后的查询参数
const formatQueryParams = function(paramObj) {
  let paramsStr = "?";
  for (let item in paramObj) {
    paramsStr += `${item}=${paramObj[item]}&`;
  }
  paramsStr = paramsStr.replace(/[&]$/, "");
  return paramsStr;
};
export { formatQueryParams };
