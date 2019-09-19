<template>
  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
  >
    <el-table-column label="id" prop="_id"></el-table-column>
    <el-table-column label="Name" prop="name"></el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
      </template>
      <template slot-scope="scope">
        <el-button size="mini" type="primary" @click="editTag(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="deleteTag(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      search: ""
    };
  },
  mounted() {
    this.getTagList();
  },
  methods: {
    async getTagList() {
      const res = await this.$axios.get("/admin/api/tagList");
      this.tableData = res.data;
    },
    editTag(index, row) {
      this.$prompt("请输入修改后的标签名", "编辑", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$axios
            .post("/admin/api/tag/edit", {
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
      this.$confirm("是否删除该标签?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/admin/api/tag/delete", {
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