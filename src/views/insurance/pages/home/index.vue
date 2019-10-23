<template>
  <div class="wrap">
    {{ msg }}
    <button @click="onClick">click me</button>
    <hr />
    <button @click="test">formatQuery</button>====> {{ result }}
    <hr />
    <button @click="request">Request</button>
  </div>
</template>

<script>
import * as api from "@/api/insurance";
import * as utils from "@/utils/commonUtils";
import { userLogin } from "@/utils/login";

export default {
  name: "index",
  data() {
    return {
      msg: "index",
      result: null
    };
  },
  methods: {
    onClick() {
      this.$router.push("/subPage");
    },
    test() {
      this.result = utils.formatQueryParams({
        a: 111,
        b: 222
      });
    },
    request() {
      userLogin(async res => {
        this.Authorization = res.token;
        localStorage.setItem("Authorization", this.Authorization);
        await api.getList({
          amount: null,
          createTime: null,
          endCreateTime: "",
          orderNo: null,
          orderStatus: null,
          pageNum: 1,
          pageSize: 10,
          startCreateTime: ""
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  font-size: 0.3rem;
}
</style>
