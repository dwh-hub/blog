<template>
  <div class="user-list">
    <h1>管理员列表</h1>
    <page-table :data="tableData" @pageChange="loadData" :paging="pageInfo">
      <el-table-column label="id" prop="_id"></el-table-column>
      <el-table-column label="管理员名字" prop="username"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="$router.push(`/user/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteTag(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </page-table>
  </div>
</template>

<script>
import pageTable from "COMPS/pageTable";
import pageTableMixin from "@/mixin/pageTableMixin";

export default {
  data() {
    return {
      tableData: [],
    };
  },
  components: {
    pageTable,
  },
  mixins: [pageTableMixin],
  methods: {
    async loadData() {
      const res = await this.$api.user.fetchUserList({
        params: {
          pageNo: this.pageInfo.pageNo,
          pageSize: this.pageInfo.pageSize,
        },
      });
      this.handleData(res);
    },
    deleteTag(index, row) {
      this.$confirm(`是否删除管理员 "${row.username}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.user
            .deleteUser({
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

<style lang="less">
</style>