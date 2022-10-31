<template>
  <div class="app-container">
    <!-- 文章标题 -->
    <div class="topTitle">文章标题</div>
    <div style="margin-bottom: 15px">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </div>
    <!-- 文章编辑 -->
    <div class="topTitle">文章编辑</div>
    <editor
      ref="toastuiEditor"
      height="600px"
      :initialValue="form.editorText"
      :options="editorOptions"
    />
    <!-- 文章描述 -->
    <div class="topTitle">文章描述</div>
    <el-input
      type="textarea"
      placeholder="请输入文章描述"
      v-model="form.description"
      :rows="6"
    ></el-input>
    <!-- 文章预览图 -->
    <Upload uploadTitle="文章预览图" v-model="form.thumb" />
    <!-- 选择分类 -->
    <div class="topTitle">请选择文章分类</div>
    <el-select v-model="form.select" placeholder="请选择">
      <el-option
        v-for="item in blogType"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>

    <!-- 文章发布 -->
    <div>
      <el-button type="primary" style="margin-top: 15px" @click="articleHandle">
        {{ content }}
      </el-button>

      <el-button type="info" style="margin-top: 15px" @click="cancel">
        取消
      </el-button>
    </div>
  </div>
</template>
<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/Upload";
import { getBlogType } from "@/api/blogType";
import { addBlog, findOneBlog, editBlog } from "@/api/blog";
import "@toast-ui/editor/dist/i18n/zh-cn.js";
export default {
  components: {
    editor: Editor,
    Upload,
  },

  props: ["mode"],

  data() {
    return {
      form: {
        title: "", //标题
        editorText: "", //用户编辑的信息
        description: "", //文章描述
        thumb: "", //文章图片
        select: "", //选择分类
      },
      blogType: [], //存放博客分类
      imageUrl: "", //图片在服务器的地址
      editorOptions: {
        language: "zh-CN",
      },
      content: "确认添加",
    };
  },

  created() {
    getBlogType().then(({ data }) => {
      this.blogType = data;
      console.log(this.blogType, " this.blogType");
    });
    if (this.mode === "edit") {
      this._id = this.$route.params.id;
      findOneBlog(this._id).then(({ data }) => {
        // 接下来，将这个内容回填至表单
        this.form = data;
        this.form.select = data.category === null ? "" : data.category.id;
        this.$refs.toastuiEditor.invoke("setHTML", data.htmlContent);
      });
      this.content = "确认修改";
    }
  },
  methods: {
    //取消添加发布或修改
    cancel() {
      this.$router.push("/blogList");
    },
    // 发布文章
    articleHandle() {
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");

      let obj = {
        title: this.form.title, // 文章标题
        description: this.form.description, // 文章简介
        createDate: new Date().getTime(), // 发布日期 时间戳
        categoryId: this.form.select, // 分类信息
        toc: [],
        htmlContent: html, // 正文
        thumb: this.form.thumb, // 缩略图
        markdownContent: markdown,
      };
      console.log(obj, "obj");
      if (obj.title && obj.description && obj.htmlContent && obj.categoryId) {
        if (this.mode === "add") {
          addBlog(obj).then(() => {
            this.$router.push("/blogList");
            this.$message.success("添加成功");
          });
        } else {
          editBlog({ _id: this.form.id, data: obj }).then(() => {
            this.$router.push(`/blogList`); // 跳转到文章列表
            this.$message.success("文章修改成功");
          });
        }
      } else {
        this.$message.error("请把信息填写完整");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.topTitle {
  font-weight: lighter;
  margin: 15px 0;
}
</style>
