<!--
 * @Descripttion: 
 * @version: 
 * @Author: aaron
 * @Date: 2022-04-19 18:58:10
 * @LastEditors: aaron
 * @LastEditTime: 2022-07-25 15:01:15
-->

 <!-- v-if和v-show的区别
    v-if 为false时不生成对应的虚拟节点
    v-show无论为什么都会生成对应的虚拟节点
    如果状态变化比较频繁使用v-show 可以更好的保持树的稳定 但是不能减少树的节点和渲染
    变化较少则用v-if 可以有效减少树节的点和渲染
     -->
<template>
  <div class="app-container">
    <Layout>
      <!-- v-slot简写为# -->
      <template #left>
        <div class="aside">
          <SiteAside />
        </div>
      </template>

      <template #default>
        <RouterView />
      </template>
    </Layout>
    <ToTop />
  </div>
</template>

<script>
// import Pager from "./components/Pager/index.vue";
// import Avatar from "./components/Avatar/index.vue";
// import Icon, {types} from "./components/Icon/index.vue";
// import Empty from "./components/Empty/index.vue";
// import ImageLoader from "./components/ImageLoader/index.vue";
// import Contact from "./components/Contact/index.vue";
// import Menu from "./components/Menu/index.vue";
import Layout from "./components/Layout/index.vue";
import SiteAside from "./components/SiteAside/index.vue";
import ToTop from "./components/TotTop/index.vue";
export default {
  components: {
    ToTop,
    Layout,
    // Menu,
    // Contact,
    // Pager,
    // Avatar,
    // Icon,
    // Empty,
    // ImageLoader,
    SiteAside,
  },
  //  data() {
  //    return {
  //      total: 100,
  //      current: 1,
  //      types
  //    }
  //  },

  //  methods: {
  //    handlePageChange(newPage) {
  //     this.current = newPage;
  //    },
  //    handleLoaded() {
  //      console.log("图片加咱完成");
  //    }
  //  }
};
</script>
<style scoped lang="less">
@import "~@/styles/mixin.less";
.app-container {
  .self-fill();
}
.aside {
  width: 250px;
  height: 100%;
}
</style>