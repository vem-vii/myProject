
<template>
  <nav class="menu-container">
    <RouterLink
      :exact="item.exact"
      v-for="item in items"
      :key="item.name"
      :to="{ name: item.name }"
    >
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <span>{{ item.title }}</span>
    </RouterLink>
  </nav>
</template>

<script>
import Icon from "@/components/Icon/index.vue";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        {
          name: "Home",
          title: "首页",
          icon: "home",
          exact: true,
        },
        {
          name: "Project",
          title: "项目&效果",
          icon: "project",
          exact: true,
        },
        {
          name: "Blog",
          title: "文章",
          icon: "blog",
          exact: false, //激活状态是否为精准匹配
        },
        {
          name: "About",
          title: "关于我",
          icon: "about",
          exact: true,
        },
        {
          name: "Message",
          title: "留言",
          icon: "message",
          exact: true,
        },
      ],
    };
  },
  // methods: {
  //     isSelected(item) {
  //         var link = item.link.toLowerCase();//菜单的链接地址
  //         var curPathname = location.pathname.toLowerCase();//当前浏览器访问路径
  //         if(item.startWidth) {
  //             return curPathname.startsWith(link);
  //         }
  //         else {
  //             return curPathname ===link;
  //         }
  //     }
  // }
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.menu-container {
  color: @gray;
  margin: 24px 0;
  a {
    &.router-link-active {
      background: #2d2d2d;
    }
    height: 45px;
    padding: 0 50px;
    display: block;
    display: flex;
    align-items: center;
    font-size: 12px;
    .icon {
      width: 24px;
    }
    &:hover {
      color: #fff;
    }
  }
}
</style>