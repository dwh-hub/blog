<template>
  <div class="add-list">
    <h1>标签列表</h1>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="id" prop="_id"></el-table-column>
      <el-table-column label="上级标签" prop="parent.name"></el-table-column>
      <el-table-column label="标签名" prop="name"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="$router.push(`/tag/edit/${scope.row._id}`);">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteTag(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.getTagList();
  },
  methods: {
    async getTagList() {
      const res = await this.$axios.get("/admin/api/reset/tag");
      this.tableData = res.data;
    },
    editTag(index, row) {
      this.$prompt("请输入修改后的标签名", "编辑", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$axios
            .post("/admin/api/reset/tag/edit", {
              _id: row._id,
              name: value
            })
            .then(res => {
              this.$message({
                type: "success",
                message: res.message
              });
              this.getTagList();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    deleteTag(index, row) {
      this.$confirm(`是否删除标签 "${row.name}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/admin/api/reset/tag/delete", {
              _id: row._id
            })
            .then(res => {
              this.$message({
                type: "success",
                message: res.message
              });
              this.getTagList();
            });
        })
        .catch();
    }
  }
};
</script>