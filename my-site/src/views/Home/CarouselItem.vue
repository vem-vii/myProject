<!--
 * @Descripttion: 
 * @version: 
 * @Author: aaron
 * @Date: 2022-05-30 14:50:44
 * @LastEditors: aaron
 * @LastEditTime: 2022-07-25 14:31:53
-->
<template>
  <div
    class="carousel-item-container"
    ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="carousel-img" :style="imagePosition" ref="image">
      <ImageLoader
        @load="showWords"
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
      />
    </div>

    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>


<style scoped lang="less">
@import "~@/styles/var.less";
.carousel-item-container {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  border: 1px solid black;
  overflow: hidden;
}

.carousel-img {
  width: 110%;
  height: 110%;
  position: absolute;

  transition: 0.3s;
  left: 0;
  top: 0;
}

.title,
.desc {
  position: absolute;
  letter-spacing: 2px;
  left: 10px;
  opacity: 0;

  // 规定段落中的文本不进行换行：
  white-space: nowrap;
  overflow: hidden;
}

.desc {
  top: calc(50% + 20px);
  font-size: 1.2em;
  color: lighten(@gray, 10%);
}

.title {
  top: calc(50% - 40px);
  font-size: 2em;
}
</style>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  props: ["carousel"],
  components: {
    ImageLoader,
  },

  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null, //外层容器的尺寸
      innerSize: null, //图片容器的尺寸
      mouseX: 0, //鼠标的横坐标
      mouseY: 0, //鼠标的纵坐标
    };
  },
  computed: {
    imagePosition() {
      if (!this.innerSize || !this.containerSize) {
        return;
      }
      const extraWidth = this.innerSize.width - this.containerSize.width; //多出的宽度
      const extraHeight = this.innerSize.height - this.containerSize.height; //多出的高度

      const left = (-extraWidth / this.containerSize.width) * this.mouseX;
      const top = (-extraHeight / this.containerSize.height) * this.mouseY;

      return {
        transform: `translate(${left}px, ${top}px)`,
      };
    },

    center() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.setSize();
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
    window.addEventListener("resize", this.setSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.setSize);
  },
  methods: {
    handleMouseLeave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
    handleMouseMove(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },

    showWords() {
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      //强制浏览器渲染次
      this.$refs.title.clientWidth;
      this.$refs.title.style.transition = "1s";
      this.$refs.title.style.width = this.titleWidth + "px";

      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0;

      this.$refs.desc.clientWidth;
      this.$refs.desc.style.transition = "2s 1s";
      this.$refs.desc.style.width = this.descWidth + "px";
    },

    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };

      this.innerSize = {
        width: this.$refs.image.clientWidth,
        height: this.$refs.image.clientHeight,
      };
    },
  },
};
</script>