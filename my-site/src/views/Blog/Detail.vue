<template>
  <Layout>
    <div ref="mainContainer" class="main-container" v-loading="isLoading">
      <!-- 博客详情 -->
      <BlogDetail :blog="data" v-if="data" />
      <!-- 评论留言 -->
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <!-- 博客详情右边列表 -->
        <BlogTOC :toc="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import fetchData from "@/mixins/fetchData";
import { getBlog } from "@/api/blog";
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail";
import BlogTOC from "./components/BlogTOC";
import BlogComment from "./components/BlogComment";
import mainScroll from "@/mixins/mainScroll.js";
import { titleController } from "@/utils";
export default {
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
  },
  mixins: [fetchData(null), mainScroll("mainContainer")],
  methods: {
    async fetchData() {
      let resp = await getBlog(this.$route.params.id);
      console.log(this.$route);
      titleController.setRouteTitle(resp.title);
      return resp;
    },
  },

  updated() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
};
</script>

<style scoped lang="less">
.main-container {
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.right-container {
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
}
</style>
