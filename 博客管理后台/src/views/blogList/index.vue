<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.$index + (currentPage - 1) * eachPage + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="文章名称" width="190" align="center">
        <template slot-scope="scope">
          <el-popover
            title="博客预览图"
            placement="top-start"
            width="200"
            trigger="hover"
          >
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcList"
            ></el-image>
            <a
              href="#"
              target="_blank"
              @click.prevent="goToTitleHandle(scope.row)"
              slot="reference"
            >
              {{ scope.row.title }}
            </a>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="文章描述" width="250" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>

      <el-table-column prop="title" label="浏览数" width="190" align="center">
        <template slot-scope="scope">{{ scope.row.scanNumber }}</template>
      </el-table-column>

      <el-table-column prop="title" label="评论数" width="190" align="center">
        <template slot-scope="scope">{{ scope.row.commentNumber }}</template>
      </el-table-column>

      <el-table-column prop="title" label="所属分类" width="190" align="center">
        <template slot-scope="scope">
          {{ scope.row.category === null ? "未分类" : scope.row.category.name }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="创建日期" width="250" align="center">
        <template slot-scope="scope">{{ scope.row.createDate }}</template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editBlogHandle(scope.row)"
            ></el-button>
          </el-tooltip>

          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              circle
              @click="deleteBlog(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 30px"
      background
      :page-size="eachPage"
      :page-sizes="[5, 10, 20]"
      layout="prev, pager, next, total, ->, sizes, jumper"
      :total="count"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      @prev-click="prevClickHandle"
      @next-click="nextClickHandle"
    >
    </el-pagination>
  </div>
</template> 

<script>
import { findBlog, deleteBlog } from "@/api/blog.js";
import { formateDate } from "@/utils/tools.js";
import { server_URL, frontEnd_URL } from "@/urlConfig.js";
export default {
  data() {
    return {
      data: [], //存储数据
      srcList: [], //预览图链接数组
      eachPage: 5, //每页显示条数
      currentPage: 1, //当前页码
      totalPage: 0, //总页码
      count: 0, //数据总条数
      // pagerCurrentPage: 1, //分页栏当前页码
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    //每页展示的条数
    sizeChangeHandle(limit) {
      this.eachPage = parseInt(limit);
      // this.currentPage = 1;
      // this.pagerCurrentPage = 1;
      this.fetchData();
    },

    //当前页码跳转
    currentChangeHandle(pageNumber) {
      this.currentPage = parseInt(pageNumber);
      this.fetchData();
    },
    // 上一页
    prevClickHandle() {
      this.currentPage -= 1;
    },
    // 下一页
    nextClickHandle() {
      this.currentPage += 1;
    },

    fetchData() {
      findBlog(this.currentPage, this.eachPage).then(({ data }) => {
        this.data = data.rows;
        for (var i of this.data) {
          i.createDate = formateDate(i.createDate);
          i.thumb = server_URL + i.thumb;
          this.srcList.push(i.thumb);
        }
        this.count = data.total;
        this.totalPage = Math.ceil(this.count / this.eachPage);
        if (this.currentPage > this.totalPage) {
          // 翻页页码超过总页码 始终等于总页码
          this.currentPage = this.totalPage;
          this.pagerCurrentPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    //点击跳到具体的文章
    goToTitleHandle(blogInfo) {
      window.open(`${frontEnd_URL}/article/${blogInfo._id}`);
    },
    // 编辑文章
    editBlogHandle(blogInfo) {
      console.log(blogInfo);
      this.$router.push(`/editBlog/${blogInfo.id}`);
    },
    // 删除文章
    deleteBlog(blogInfo) {
      this.$confirm("是否继续?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteBlog(blogInfo._id).then(() => {
            this.fetchData();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>  

<style>
</style>