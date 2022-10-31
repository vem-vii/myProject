<!--
 * @Author: your name
 * @Date: 2022-04-23 10:37:41
 * @LastEditTime: 2022-04-27 21:01:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue\搭建工程\my-site\src\commponents\pager.vue
-->
<template>
  <div class="pager-container" v-if="pageNumber > 1">
    <a @click="handleClick(1)" :class="{ disabled: current === 1 }"
      >|&lt;&lt;</a
    >
    <a @click="handleClick(current - 1)" :class="{ disabled: current <= 1 }"
      >&lt;&lt;</a
    >
    <a
      @click="handleClick(n)"
      v-for="(n, i) in numbers"
      :key="i"
      :class="{ active: n === current }"
      >{{ n }}</a
    >
    <a
      @click="handleClick(current + 1)"
      :class="{ disabled: current >= pageNumber }"
      >&gt;&gt;</a
    >
    <a
      @click="handleClick(pageNumber)"
      :class="{ disabled: current === pageNumber }"
      >&gt;&gt;|</a
    >
  </div>
</template>
<style lang="less" scoped>
//在style(css样式里)用~@表示需要的文件的根目录
//script内用@表示
@import "~@/styles/var.less";
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  a {
    color: @primary;
    margin: 0 6px;
    cursor: pointer;
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @warn;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>
<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 10,
    },

    visibleNumber: {
      type: Number,
      default: 10,
    },
  },

  computed: {
    //总页数 有可能为小数  math.clie  向上取整
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    //得到最小页码
    visibleMin() {
      let min = this.current - Math.floor(this.visibleNumber / 2);
      if (min <= 0) {
        min = 1;
      }
      return min;
    },
    //得到最大页码
    visibleMax() {
      let max = this.visibleMin + this.visibleNumber - 1;
      //max不能大于总页数
      if (max >= this.pageNumber) {
        max = this.pageNumber;
      }
      return max;
    },
    numbers() {
      let nums = [];
      for (let i = this.visibleMin; i <= this.visibleMax; i++) {
        nums.push(i);
      }
      return nums;
    },
  },

  methods: {
    //子组件发生一件事 但自身不能处理 通过事件的方式通知父组件处理
    //抛出事件
    handleClick(newPage) {
      //$emit表示在组件中抛出的事件
      if (newPage > 0 && newPage <= this.pageNumber) {
        this.$emit("pageChange", newPage);
      }
    },
  },
};
</script>


