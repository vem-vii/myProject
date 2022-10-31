<!--
 * @Author: your name
 * @Date: 2022-04-29 17:19:05
 * @LastEditTime: 2022-04-29 17:19:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \搭建工程\my-site\src\components\ImageLoader\index.vue
-->
<template>
  <div class="image-loader-container">
    <!-- 两张图片依次加载 第二个加载完成触发load事件 第一张变成透明 -->
    <img v-if="!everythingDone" class="placeholder" :src="placeholder" alt="" />
    <!-- @load事件 加载完成再触发 -->
    <img
      @load="handleLoad"
      :src="src"
      :style="{ opacity: originOpacity, transition: `${duration}ms` }"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 5000,
    },
  },
  data() {
    return {
      originLoaded: false, //原图是否加载完成
      everythingDone: false, //原图完全加载出来
    };
  },
  computed: {
    originOpacity() {
      return this.originLoaded ? 1 : 0;
    },
  },
  methods: {
    handleLoad() {
      this.originLoaded = true;
      setTimeout(() => {
        this.everythingDone = true;
        this.$emit("load");
      }, this.duration);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    .self-fill();
    object-fit: cover;
  }
  .placeholder {
    filter: blur(2vw);
  }
}
</style>