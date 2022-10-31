<template>
  <div ref="messageContainer" class="message-container">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submited="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import fetchData from "@/mixins/fetchData.js";
import * as msgApi from "@/api/message.js";
import mainScroll from "@/mixins/mainScroll.js";
export default {
  created() {
    //等待被emit触发 接收传递的数据
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  components: {
    MessageArea,
  },
  computed: {
    hasMore() {
      //当查看留言时 判断是否看完
      return this.data.rows.length < this.data.total;
    },
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  //mixins内有isloading
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("messageContainer")],
  methods: {
    handleScroll(dom) {
      if (this.isLoading || !dom) {
        //正在加载或者获取到了dom 则表示正在加载
        return;
      }
      const range = 100; //设置到达底部的距离
      // scrollHeight元素内容的高度，包括溢出的不可见内容
      // scrollTop可视区域的顶部到全部内容区域顶端的距离（内容区域包括不可见区域）
      // clientHeight可视区域高度包括padding
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight); //容器高度加上到屏幕顶部的距离减去全屏的高度
      if (range >= dec) {
        this.fetchMore(); //满足条件触发函数加载下一页
      }
    },
    //加载下一页
    async fetchMore() {
      if (!this.hasMore) {
        //判断是否还有留言
        return;
      }
      //还有留言就继续加载
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },

    async fetchData() {
      return msgApi.getMessages(this.page, this.limit);
    },

    // data为组件DataFrom 内的emit传递过来的数据 分别是nickname 和content也就是要输入昵称和内同
    async handleSubmit(data, callback) {
      const resp = await msgApi.postMessage(data);
      this.data.rows.unshift(resp);
      this.data.total++;
      callback("留言成功");
    },
  },
};
</script>
  
<style scoped>
.message-container {
  width: 100%;
  height: 100%;
  /* 滚动条 */
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>