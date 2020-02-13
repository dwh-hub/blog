<template>
  <div class="article-list">
    <h1>文章列表</h1>
    <page-table :data="tableData" @pageChange="loadData" :paging="pageInfo">
      <el-table-column label="id" prop="_id"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="标签" prop="tags"></el-table-column>
      <el-table-column align="right" width="240">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="$router.push(`/article/edit/${scope.row._id}`);"
          >编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteTag(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" type="primary" @click="toEvaluation(scope.$index, scope.row)">查看评价</el-button>
        </template>
      </el-table-column>
    </page-table>
  </div>
</template>

<script>
import pageTable from "COMPS/pageTable";
import pageTableMixin from "../mixin/pageTableMixin";

export default {
  data() {
    return {
      tableData: []
    };
  },
  components: {
    pageTable
  },
  mixins: [pageTableMixin],
  methods: {
    async loadData() {
      const res = await this.$axios.get("/admin/api/reset/article", {
        params: {
          pageNo: this.pageInfo.pageNo,
          pageSize: this.pageInfo.pageSize
        }
      });
      res.data.list = res.data.list.map(e => {
        e.tags = String(e.tag.map(t => t.name));
        return e;
      });
      this.handleData(res)
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
              this.loadData();
            });
        })
        .catch();
    },
    toEvaluation(index, row) {
      this.$router.push(`/evaluation/${row._id}`);
    }
  }
};
</script>

<style lang="less">
</style>