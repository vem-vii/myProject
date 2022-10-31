<template>
  <div class="blog-toc-container">
    <!-- 单个详细博客文章右边框 -->
    <h2>目录</h2>
    <RightList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
import { debounce } from "@/utils";
export default {
  components: {
    RightList,
  },
  data() {
    return {
      activeAnchor: "",
    };
  },
  props: {
    toc: {
      type: Array,
    },
  },

  created() {
    this.setSelectDebounce = debounce(this.setSelect, 50);
    //$on负责注册事件，监听等待emit传递数据
    // $emit 和$on 实现父子组件双向传参
    this.$bus.$on("mainScroll", this.setSelectDebounce);
  },
  destroyed() {
    // 关闭事件
    this.$bus.$off("mainScroll", this.setSelectDebounce);
  },
  methods: {
    //item通过子组件RightList 中的$emit传递的 监听到触发select事件就会触发传递数据到父组件
    handleSelect(item) {
      location.hash = item.anchor;
    },
    // 设置activeAnchor为正确值
    setSelect(scrollDom) {
      // scrollDom传递过来的参数是父组件上 emit 监听到事件触发 传递过来的参数（main-container）
      if (!scrollDom) {
        return;
      }
      this.activeAnchor = ""; //后续需要重新设置 先清空之前的状体
      const range = 100;

      for (const dom of this.doms) {
        // 看一下当前的元素是否被选中
        if (!dom) {
          // continue的时候不执行底下的代码，返回上面继续循环
          continue;
        }
        // getBoundingClientRect是DOM元素到浏览器可视范围的距离
        // 用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。
        const top = dom.getBoundingClientRect().top;
        if (top >= 0 && top <= range) {
          //在规定范围内
          this.activeAnchor = dom.id;
        } else if (top > range) {
          //在规定范围下方
          return;
        } else {
          //在规定范围上方
          this.activeAnchor = dom.id;
        }
      }
    },
  },
  computed: {
    //根据toc属性以及activeAnchor 拿到带有isSelect数组的toc数组
    tocWithSelect() {
      const getTOC = (toc = []) => {
        // ()=>({})等同于()=>{return {}}
        return toc.map((t) => ({
          ...t,
          isSelect: t.anchor === this.activeAnchor,
          children: getTOC(t.children),
        }));
      };
      return getTOC(this.toc);
    },
    // 根据toc得到他们对应元素
    doms() {
      const doms = [];

      const addToDoms = (toc) => {
        for (const t of toc) {
          // 根据anchor获取到他的dom元素
          doms.push(document.getElementById(t.anchor));
          //如果有子列表就再次addToDoms 在子元素这继续找出dom元素
          if (t.children && t.children.length) {
            addToDoms(t.children);
          }
        }
      };
      addToDoms(this.toc);
      return doms;
    },
  },
};
</script>

<style scoped lang="less">
.blog-toc-container {
  h2 {
    letter-spacing: 2px;
    font-weight: bold;
    font-size: 1em;
    margin: 0;
  }
}
</style>