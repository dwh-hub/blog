<template>
  <div class="add-user">
    <h1>{{id ? '编辑' : '新增'}}管理员</h1>
    <el-form label-width="120px">
      <el-form-item label="用户名">
        <el-input type="text" v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveUser()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      username: '',
      password: ''
    };
  },
  created() {
    this.id && this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$axios.get(`/admin/api/reset/user/${this.id}`);
      this.username = res.data.username
    },
    async saveUser() {
      let res;
      if (this.id) {
        res = await this.$axios.post("/admin/api/reset/user/edit", {
          _id: this.id,
          username: this.username,
          password: this.password
        });
      } else {
        res = await this.$axios.post("/admin/api/reset/user/add", {
          username: this.username,
          password: this.password
        });
      }
      this.$message({
        message: res.message,
        type: "success"
      });
      this.$router.push({ path: "/user/list" });
    }
  }
};
</script>

<style>
</style>