<template>
  <div id="head">
    <div class="arrow" @click="reduceDate">
      前一天
    </div>
    <div class="dateStr" @click="selectDate">{{ showDateStr }}</div>
    <div class="arrow" @click="incrementDate">
      后一天
    </div>
    <nut-calendar
      :is-visible="isVisible"
      :default-value="dateArr"
      type="range"
      :start-date="null"
      :end-date="null"
      :animation="`nutSlideUp`"
      @close="switchPicker"
      @choose="setChooseValue"
    >
    </nut-calendar>
  </div>
</template>

<script>
import { format } from "date-fns";
export default {
  name: "Calendar",
  data() {
    return {
      isVisible: false,
      showDateStr: "",
      dateArr: [],
      currentTime: "",
      allDate: {
        startCreateTime: "",
        endCreateTime: ""
      }
    };
  },
  created() {
    this.removeQueryConditions();
  },
  methods: {
    // 清除及初始化查询条件
    removeQueryConditions() {
      this.currentTime = format(new Date(), "yyyy-MM-dd");
      this.allDate.startCreateTime = this.currentTime;
      this.allDate.endCreateTime = this.currentTime;
      this.showDateStr = "请选择日期";
      this.dateArr = [this.currentTime, this.currentTime];
    },
    reduceDate() {
      let startDate = this.allDate.startCreateTime;
      let endDate = this.allDate.endCreateTime;
      let preDateTimes = new Date(startDate).getTime() - 24 * 60 * 60 * 1000;
      this.allDate.startCreateTime = format(preDateTimes, "yyyy-MM-dd");
      if (startDate === endDate) {
        this.allDate.endCreateTime = this.allDate.startCreateTime;
      }
      this.dateArr = [this.allDate.startCreateTime, this.allDate.endCreateTime];
      this.showDateStrMethod();
      this.$emit("getCurrentData", this.allDate);
    },
    incrementDate() {
      let startDate = this.allDate.startCreateTime;
      let endDate = this.allDate.endCreateTime;
      let nextDateTimes = new Date(endDate).getTime() + 24 * 60 * 60 * 1000;
      this.allDate.endCreateTime = format(nextDateTimes, "yyyy-MM-dd");
      if (startDate === endDate) {
        this.allDate.startCreateTime = this.allDate.endCreateTime;
      }
      this.dateArr = [this.allDate.startCreateTime, this.allDate.endCreateTime];
      this.showDateStrMethod();
      this.$emit("getCurrentData", this.allDate);
    },
    showDateStrMethod() {
      if (this.allDate.startCreateTime === this.allDate.endCreateTime) {
        this.showDateStr = this.allDate.startCreateTime;
      } else {
        this.showDateStr =
          this.allDate.startCreateTime + " 至 " + this.allDate.endCreateTime;
      }
    },
    selectDate() {
      this.isVisible = true;
    },
    switchPicker() {
      this.isVisible = false;
    },
    setChooseValue(param) {
      this.allDate.startCreateTime = param[0][3];
      this.allDate.endCreateTime = param[1][3];
      this.showDateStrMethod();
      this.$emit("getCurrentData", this.allDate);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
  width: 100%;
  height: 0.9rem;
  background: white;
  .dateStr {
    color: #777777;
    font-size: 0.3rem;
  }
  .arrow {
    color: #777777;
    width: 15%;
    display: block;
    text-align: center;
    padding: 0 0.12rem;
    font-size: 0.3rem;
  }
}
</style>
