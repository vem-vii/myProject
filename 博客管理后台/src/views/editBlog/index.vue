<template>
  <div class="app-container">
    <!-- 父组件通过静态传值的方式给子组件传值不需要v-bind绑定 -->
    <EditArticle mode="edit" />
  </div>
</template>

<script>
import EditArticle from "@/components/EditArticle";
export default {
  components: {
    EditArticle,
  },
};
</script>
<style>
</style>