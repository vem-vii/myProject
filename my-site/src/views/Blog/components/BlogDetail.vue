<template>
  <div class="blog-detail-container">
    <!-- 文章详情 -->
    <h1>{{ blog.title }}</h1>
    <div class="aside">
      <span>日期:{{ blog.createDate }}</span>
      <span>浏览:{{ blog.scanNumber }}</span>
      <a href="#data-form-container">评论: {{ blog.commentNumber }}</a>
      <RouterLink
        :to="{
          name: 'CategoryBlog',
          params: {
            categoryId: blog.category._id,
          },
        }"
      >
        {{ blog.category.name }}
      </RouterLink>
    </div>
    <div v-html="blog.htmlContent" class="markdown-body"></div>
  </div>
</template>

<script>
// import { formatDate } from "@/utils";
import "highlight.js/styles/github.css";
import "@/styles/markdown.css";
export default {
  // 模板内 不加v-bind时，vue就认为此时通过prop传递给组件的是字符串常量。
  // props用来接收父组件传递的数据
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // formatDate,
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.aside {
  color: @gray;
  font-size: 12px;
  span,
  a {
    margin-right: 15px;
  }
}

.markdown-body {
  margin: 2em;
}
</style>