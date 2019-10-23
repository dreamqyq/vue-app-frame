import request from "@/utils/request";

export function getList(params) {
  return request({
    url: "/m-insurance-pay-order/list",
    method: "post",
    data: params
  });
}
