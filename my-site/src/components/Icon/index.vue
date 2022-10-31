<!--
 * @Descripttion: 
 * @version: 
 * @Author: aaron
 * @Date: 2022-04-27 10:17:07
 * @LastEditors: aaron
 * @LastEditTime: 2022-07-25 15:38:00
-->
<template>
  <i class="iconfont iconfont-container" :class="fontClass"></i>
</template>

<script>
const classMap = {
  home: "icon-zhuye1",
  weixin: "icon-weixin-copy",
  qq: "icon-QQ-circle-fill",
  liebiao: "icon-liebiao",
  github: "icon-github-fill",
  xinxi: "icon-youjian",
  project: "icon-daima",
  empty: "icon-queshengye_zanwushuju",
  about: "icon-moban",
  message: "icon-liuyan",
  blog: "icon-16",
  info: "icon-info",
  error: "icon-error",
  success: "icon-success",
  warm: "icon-warms-active",
  aarowDown: "icon-xiangxia",
  aarowUp: "icon-xiangshang",
};
// export const types = Object.keys(classMap);
export default {
  props: {
    //props用来接收父组件传进来的值
    type: {
      type: String,
      required: true,
    },
  },

  computed: {
    //图标样式
    fontClass() {
      return classMap[this.type];
    },
  },
};
</script>

<style scoped>
@import "//at.alicdn.com/t/font_3349457_7v68dbxhvod.css";
.iconfont-container {
  display: block;
}
.iconfont {
  color: inherit;
  font-size: inherit;
}
</style>