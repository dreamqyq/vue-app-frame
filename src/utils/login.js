import request from "./request";

// 用户网关登录
export function userLogin(callback) {
  const fn = res => {
    if (res) {
      callback(res);
    } else {
      window.insight.bootstrap(() => {
        window.insight.ui
          .alert("温馨提示", res.errorMessage, "我知道了")
          .then(() => {
            window.insight.window.popWindow();
          })
          .catch(error => {
            alert(JSON.stringify(error));
          });
      });
    }
  };
  const err = () => {
    window.insight.bootstrap(() => {
      window.insight.ui
        .alert("温馨提示", "网络异常，请检查网络或稍后再试", "我知道了")
        .then(() => {
          window.insight.window.popWindow();
        })
        .catch(error => {
          alert(JSON.stringify(error));
        });
    });
  };

  // 获取用户完整信息/验证用户是否登录
  function getToken(data) {
    // data { userNo}
    return request({
      url: "/auth/login",
      method: "get",
      data: { ...data }
    });
  }

  const userFn = () => {
    const data = { userNo: "" };
    if (process.env.NODE_ENV === "development") {
      // data.userNo = '141193504'
      data.userNo = "050721435";
      // data.userNo = '181095568'
      // data.userNo = '180191872'
    }
    getToken(data)
      .then(fn)
      .catch(err);
  };
  userFn();
}
