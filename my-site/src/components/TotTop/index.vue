<template>
  <div @click="handleClick" v-show="show" class="to-top-container">top</div>
</template>

<script>
// 只显示在博客详情页面的组件 可以直接回到页面顶部

//组件ToTop的作用
//1 $onj监听main事件 等待父组件返回数据
export default {
  data() {
    return {
      show: false,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    //this.handleScroll就是组件传来的dom元素 哪个元素显示则传来的是哪个元素 从而显示在相应的位置
    this.$bus.$off("mainScroll", this.handleScroll);
  },

  methods: {
    handleClick() {
      //点击回到顶部
      this.$bus.$emit("setMainScroll", 0);
    },
    handleScroll(dom) {
      if (!dom) {
        this.show = false;
        return;
      }
      this.show = dom.scrollTop >= 500;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.to-top-container {
  position: fixed;
  right: 50px;
  bottom: 50px;
  text-align: center;
  line-height: 50px;
  background: @primary;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  z-index: 999;
  cursor: pointer;
  color: white;
  font-weight: bold;
}
</style>