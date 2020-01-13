<template>
  <div class="evaluation">
    <h1>评论列表</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="id" prop="_id"></el-table-column>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="内容" prop="content"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="primary">编辑</el-button> -->
          <el-button size="mini" type="danger" @click="deleteTag(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.getEvaluations();
  },
  methods: {
    async getEvaluations() {
      let res = await this.$axios.get(`/admin/api/reset/evaluation/${this.id}`);
      this.tableData = res.data;
    },
    deleteEvaluatioin(index, row) {
      this.$confirm(`是否删除该评论?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/admin/api/reset/evaluation/delete", {
              _id: row._id
            })
            .then(res => {
              this.$message({
                type: "success",
                message: res.message
              });
              this.getEvaluations();
            });
        })
        .catch();
    }
  }
};
</script>

<style lang="less" scoped>
</style>