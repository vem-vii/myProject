<template>
  <ul class="right-list-container">
    <!-- 文章分类右边列表 -->
    <li v-for="(item, i) in list" :key="i">
      <span @click="handleClick(item)" :class="{ active: item.isSelect }">
        {{ item.name }}
      </span>

      <span
        class="aside"
        @click="handleClick(item)"
        v-if="item.aside"
        :class="{ active: item.isSelect }"
      >
        {{ item.aside }}
      </span>

      <!-- 套用自己进行递归循环   组件递归-->
      <RightList :list="item.children" @select="handleClick" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "RightList",
  props: {
    // 接受父组件传递的值
    //[{name:"xxx", isSelected: true, children:[{name:"xxx", isSelected: false}]}]
    list: {
      type: Array,
      //默认值
      default: () => [],
    },
  },

  methods: {
    handleClick(item) {
      console.log(item, "item");
      if (!item.isSelect) {
        // 子组件触发父组件事件 并把数据传递给父组件
        this.$emit("select", item);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/global.less";
.right-list-container {
  cursor: pointer;
  list-style: none;
  padding: 0;
  .right-list-container {
    margin-left: 1em;
  }

  li {
    min-height: 40px;
    line-height: 40px;
    .active {
      color: @warn;
      font-weight: bold;
    }
  }
}
.aside {
  font-size: 12px;
  margin-left: 1em;
  color: @gray;
}
</style>