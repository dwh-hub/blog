<template>
  <div class="article-list">
    <h1>文章列表</h1>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="id" prop="_id"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="标签" prop="tags"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="$router.push(`/article/edit/${scope.row._id}`);"
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
    this.getArticleList()
  },
  methods: {
    async getArticleList() {
      const res = await this.$axios.get("/admin/api/reset/article");
      this.tableData = res.data.map(e => {
        e.tags = String(e.tag.map( t => t.name))
        return e
      });
    },
    deleteTag(index, row) {
      this.$confirm(`是否删除文章 "${row.title}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/admin/api/reset/article/delete", {
              _id: row._id
            })
            .then(res => {
              this.$message({
                type: "success",
                message: res.message
              });
              this.getArticleList()
            });
        })
        .catch();
    }
  }
};
</script>

<style lang="less">
</style>