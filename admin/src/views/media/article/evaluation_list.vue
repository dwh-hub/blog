<template>
  <div class="evaluation">
    <h1>评论列表</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="id" prop="_id"></el-table-column>
      <el-table-column label="昵称" prop="nickname"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="内容" prop="content"></el-table-column>
      <el-table-column label="时间" prop="addTime"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="primary">编辑</el-button> -->
          <el-button
            size="mini"
            type="danger"
            @click="deleteEvaluatioin(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import pageTable from "COMPS/pageTable";
import pageTableMixin from "@/mixin/pageTableMixin";
import { formatDate } from "COMMON/js/tools";

export default {
  props: {
    id: {},
  },
  data() {
    return {
      tableData: [],
    };
  },
  components: {
    pageTable,
  },
  mixins: [pageTableMixin],
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      // let url = this.id
      //   ? `/admin/api/reset/evaluation/${this.id}`
      //   : "/admin/api/reset/evaluation";
      let res = await this.$api.article.fetchEvaluation({
        params: {
          articleId: this.id || null,
          pageNo: this.pageInfo.pageNo,
          pageSize: this.pageInfo.pageSize,
        },
      });
      res.data.list = res.data.list.map((e) => {
        e.addTime = e.addTime
          ? formatDate(new Date(e.addTime), "yyyy-MM-dd hh:ss")
          : "--";
        return e;
      });
      this.handleData(res);
    },
    deleteEvaluatioin(index, row) {
      this.$confirm(`是否删除该评论?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.article
            .deleteEvaluation({
              _id: row._id,
            })
            .then((res) => {
              this.$message({
                type: "success",
                message: res.message,
              });
              this.loadData();
            });
        })
        .catch();
    },
  },
};
</script>

<style lang="less" scoped>
</style>