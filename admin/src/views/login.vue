<template>
  <div id="login">
    <el-card shadow="always" header="登录" class="login-card">
      <el-form>
        <el-form-item label="用户名">
          <el-input type="text" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="user.password" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      let res = {}
      try {
        res = await this.$api.login.login(this.user)
      } catch {}
      if (res.code == 200) {
        localStorage.setItem('admin_token', res.data)
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="less">
#login {
  .login-card {
    margin: 10vw auto;
    .el-card__header {
      font-weight: bold;
    }
    width: 40vw;
    max-width: 450px;
    min-width: 250px;
  }
}
</style>