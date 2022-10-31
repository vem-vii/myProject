<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <!-- slot-scope data中获取到相应列的数据 -->
    <el-table
      v-loading="listLoading"
      :data="data"
      fit
      border
      element-loading-text="loading"
      heightlight-current-row
    >
      <!-- 序号 -->
      <el-table-column label="序号" align="center" width="60px">
        <template slot-scope="scope"> {{ scope.$index + 1 }} </template>
      </el-table-column>

      <!-- 项目名称 -->
      <el-table-column label="项目名称" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank">{{ scope.row.name }} </a>
        </template>
      </el-table-column>

      <!-- 项目描述 -->
      <el-table-column label="项目描述" align="center">
        <template slot-scope="scope">
          {{ scope.row.description.toString() }}
        </template>
      </el-table-column>

      <!-- 预览图 -->
      <el-table-column align="center" label="预览图" width="150">
        <template slot-scope="scope">
          <el-image
            style="width: 120px"
            :src="scope.row.thumb2"
            :preview-src-list="srcList"
          >
          </el-image>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- github -->
          <el-tooltip
            class="item"
            effect="dark"
            content="链接"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="info"
              icon="el-icon-zoom-in"
              circle
              size="mini"
              @click="openProjectHandle(scope.row)"
            ></el-button>
          </el-tooltip>
          <!-- 编辑 -->
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
              @click="editProjectHandle(scope.row)"
            >
            </el-button>
          </el-tooltip>

          <!-- 删除 -->
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
              @click="deleteProjecthandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑对话框 -->
    <el-dialog title="编辑对话框" fullscreen :visible="dialogFormVisible">
      <el-form :model="form">
        <!-- v-model绑定在form表单中获取到表单内所有数据 -->
        <!-- 项目名称 -->
        <el-form-item label="项目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- 项目描述 -->
        <el-form-item label="项目描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <!-- 项目链接 -->
        <el-form-item label="项目链接">
          <el-input v-model="form.url"></el-input>
        </el-form-item>

        <!-- github -->
        <el-form-item label="Github 地址">
          <el-input v-model="form.github"></el-input>
        </el-form-item>

        <!-- 项目预览图 -->
        <el-form-item label="项目预览图">
          <!-- 给组件传入图片子组件对图片地址进行处理 -->
          <Upload v-model="form.thumb" />
        </el-form-item>

        <!-- 项目等级 -->
        <el-form-item label="项目等级">
          <el-select v-model="form.order" placeholder="请选择等级">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 确认和取消按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditProjectHandle"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getProject,
  setProject,
  addProject,
  deleteProject,
} from "@/api/project.js";

import { server_URL, frontEnd_URL } from "@/urlConfig.js";
import Upload from "@/components/Upload";

export default {
  //创建data保存数据
  data() {
    return {
      data: [],
      listLoading: false,
      srcList: [], //图片存储
      dialogFormVisible: false, //一开始编辑对话框是否显示
      form: {
        name: "",
        description: "",
        url: "",
        github: "",
        thumb: "",
        order: "",
      },
    };
  },
  components: {
    Upload,
  },
  created() {
    //实例创建之后立即获取数据
    this.fetchData();
  },
  methods: {
    // 获取到所有项目
    fetchData() {
      this.listLoading = true;
      getProject().then(({ data }) => {
        this.listLoading = false;
        this.data = data;
        for (let i of this.data) {
          i.thumb2 = server_URL + i.thumb;
          this.srcList.push(i.thumb2);
        }
        console.log(this.data);
        //description,github,id,name,order,thumb,url
      });
    },

    // 修改项目
    editProjectHandle(projectInfo) {
      this.dialogFormVisible = true;
      this.form = {
        ...projectInfo,
        description: projectInfo.description.toString(),
      };
    },
    // 打开项目
    openProjectHandle() {},
    // 删除项目
    deleteProjecthandle(projectInfo) {
      this.$confirm("删除此项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteProject(projectInfo.id).then(() => {
            this.fetchData();
            this.$message.success("删除成功");
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 确认修改
    confirmEditProjectHandle() {
      let obj = { ...this.form };
      obj.description = this.form.description.split(",");
      obj.order = parseInt(this.form.order);

      setProject(obj.id, obj).then(() => {
        this.dialogFormVisible = false;
        this.fetchData();
        this.$message.success("修改成功");
      });
    },
  },
};
</script>

<style lang="scss" scope>
</style>