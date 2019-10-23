<template>
  <div class="wrap">
    {{ msg }} <button @click="backToHome">return</button>
    <Calendar @getCurrentData="getCurrentData" ref="calendarComponent" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
import Calendar from "@/components/Calendar";
export default {
  name: `subpage`,
  components: {
    Calendar
  },
  data() {
    return {
      msg: "subpage",
      list: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    backToHome() {
      this.$router.push("/");
    },
    getCurrentData() {},
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  font-size: 0.25rem;
}
</style>
