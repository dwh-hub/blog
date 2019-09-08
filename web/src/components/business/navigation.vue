<template>
  <div id="navigation">
    <div class="nav-lg">
      <div class="logo">LOGO文字</div>
      <div class="nav-main">
        <ul>
          <li class="nav-item" @click="homeback">
            <span>首页</span>
          </li>
        </ul>
      </div>
      <div class="search"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    homeback() {
      this.$router.push({ path: `/` });
    }
  }
};
</script>

<style lang="less">
#navigation {
  width: 100%;
  height: 42px;
  line-height: 42px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  .nav-lg {
    width: 1280px;
    height: 100%;
    margin: 0 auto;
    .logo {
      float: left;
      margin: 0 15px;
      font-weight: bold;
      font-size: 18px;
    }
    .nav-main {
      display: inline-block;
      .nav-item {
        cursor: pointer;
        padding: 0 10px;
        font-size: #222;
      }
    }
  }
}
</style>