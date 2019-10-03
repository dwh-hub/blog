<template>
  <div class="user-list">
    <h1>管理员列表</h1>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="id" prop="_id"></el-table-column>
      <el-table-column label="管理员名字" prop="username"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="$router.push(`/user/edit/${scope.row._id}`);"
          >编辑</el-button>
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
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const res = await this.$axios.get("/admin/api/reset/user");
      this.tableData = res.data
    },
    deleteTag(index, row) {
      this.$confirm(`是否删除管理员 "${row.title}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/admin/api/reset/user/delete", {
              _id: row._id
            })
            .then(res => {
              this.$message({
                type: "success",
                message: res.message
              });
              this.getUserList()
            });
        })
        .catch();
    }
  }
};
</script>

<style lang="less">
</style>