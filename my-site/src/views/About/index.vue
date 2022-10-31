<template>
  <div class="about-container" v-loading="loading || !srcLoaded">
    <!-- @load 加载完成触发 srcLoaded = true -->
    <iframe
      v-if="src"
      @load="srcLoaded = true"
      class="about-content"
      :src="src"
      frameborder="0"
    >
    </iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      srcLoaded: false,
    };
  },
  computed: mapState("about", {
    src: "data",
    loading: "loading",
  }),
  // computed: mapState("about", ["data", "loading"]),
  created() {
    this.$store.dispatch("about/fetchAbout");
  },
};
</script>

<style scoped lang="less">
.about-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.about-content {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
}
</style>