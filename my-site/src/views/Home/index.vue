<template>
  <div
    v-loading="loading"
    class="home-container"
    ref="container"
    @wheel="handleWheel"
  >
    <!-- transitionend事件 当css完成过渡后触发 -->
    <ul
      class="carousel-container"
      :style="{ marginTop }"
      @transitionend="handleTransitionEnd"
    >
      <li v-for="item in data" :key="item.id">
        <CarouselItem :carousel="item" />
      </li>
    </ul>

    <div v-show="index >= 1" @click="switchTo(index - 1)" class="icon icon-up">
      <Icon type="aarowUp" />
    </div>
    <div
      v-show="index < data.length - 1"
      @click="switchTo(index + 1)"
      class="icon icon-down"
    >
      <Icon type="aarowDown" />
    </div>

    <ul class="indicator">
      <li
        :class="{ active: i === index }"
        @click="switchTo(i)"
        v-for="(item, i) in data"
        :key="item.id"
      ></li>
    </ul>

    <!-- <Loading v-if="isLoading" /> -->
  </div>
</template>

<style scoped lang="less">
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";

.home-container {
  background: lightgreen;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
}

.carousel-container {
  width: 100%;
  height: 100%;
  transition: 500ms;
  li {
    width: 100%;
    height: 100%;
  }
}

.icon {
  .self-center();
  font-size: 30px;
  color: @gray;
  @gap: 15px;
  cursor: pointer;
  transform: translateX(-50%);
  &.icon-up {
    top: @gap;
    animation: jump-up 2s infinite;
  }
  &.icon-down {
    top: auto;
    bottom: @gap;
    animation: jump-down 2s infinite;
  }

  @keyframes jump-up {
    0% {
      transform: translate(-50%, 5px);
    }
    50% {
      transform: translate(-50%, -5px);
    }
    100% {
      transform: translate(-50%, 5px);
    }
  }

  @keyframes jump-down {
    0% {
      transform: translate(-50%, 5px);
    }
    50% {
      transform: translate(-50%, -5px);
    }
    100% {
      transform: translate(-50%, 5px);
    }
  }
}
.indicator {
  .self-center();
  transform: translateY(-50%);
  left: auto;
  right: 20px;
  li {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: @words;
    cursor: pointer;
    margin-bottom: 10px;
    border: 1px solid #fff;
    box-sizing: border-box;
    transition: 0.5s;
    &.active {
      background: #fff;
    }
  }
}
</style>

<script scoped less="lang">
import { mapState } from "vuex";
import CarouselItem from "./CarouselItem";
import Icon from "@/components/Icon";

// import Loading from "@/components/Loading";
export default {
  components: {
    CarouselItem,
    Icon,
  },
  data() {
    return {
      index: 0, //当前显示的是第几张轮播图
      containerHeight: 0, //整个容器的高度
      switching: false, //判断是否正在翻页
    };
  },
  created() {
    this.$store.dispatch("banner/fetchBanner");
  },
  mounted() {
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
    ...mapState("banner", ["loading", "data"]),
  },
  methods: {
    switchTo(i) {
      this.index = i;
    },
    handleWheel(e) {
      if (this.switching) {
        return;
      }

      if (e.deltaY < -5 && this.index > 0) {
        //向上滚动
        this.switching = true;
        this.index--;
      } else if (e.deltaY > 5 && this.index < this.data.length - 1) {
        //往下滚动
        this.switching = true;
        this.index++;
      }
    },
    handleTransitionEnd() {
      this.switching = false;
    },
    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight;
    },
  },
};
</script>
