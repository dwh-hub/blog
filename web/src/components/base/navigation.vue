<template>
  <div id="navigation">
    <div class="nav-lg">
      <div class="logo" @click="homeback">大花园</div>
      <div class="nav-main">
        <ul>
          <li class="nav-item" @click="homeback">
            <span>首页</span>
          </li>
          <li class="nav-item" @click="toAnimation">
            <span>动画</span>
          </li>
        </ul>
      </div>
      <div class="search"></div>
    </div>
    <div class="nav-mobile">
      <div class="header-menu header-icon-wrapper" @click="toggleMenu">
        <i></i>
      </div>
      <div class="nav-title">大花园</div>
      <div class="header-right header-icon-wrapper">
        <i></i>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "../../utils/eventBus";

export default {
  methods: {
    homeback() {
      this.$router.push({ path: '/' });
    },
    toAnimation() {
      this.$router.push({ path: '/animation' });
    },
    toggleMenu() {
      EventBus.$emit("toggleMenu");
    },
  },
};
</script>

<style lang="less">
@import "~COMMON/less/base.less";
#navigation {
  width: 100%;
  height: 46px;
  line-height: 46px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  .nav-lg {
    width: 1280px;
    height: 100%;
    margin: 0 auto;
    .logo {
      cursor: pointer;
      float: left;
      margin: 0 15px;
      font-weight: bold;
      font-size: 18px;
    }
    .nav-main {
      display: inline-block;
      .nav-item {
        display: inline-block;
        cursor: pointer;
        padding: 0 10px;
        font-size: #222;
      }
    }
  }
  .nav-mobile {
    display: none;
    position: sticky;
    top: 0;
    .header-icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 42px;
      width: 42px;
    }
    .header-menu {
      float: left;
      > i {
        display: inline-block;
        width: 25px;
        height: 27px;
        background-image: url("~ASSETS/images/menu.png");
        background-size: cover;
      }
    }
    .nav-title {
      flex: 1;
      display: inline-block;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }
    .header-right {
      float: right;
    }
  }
}

@media screen and (max-width: 900px) {
  #navigation {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
    .nav-lg {
      display: none;
    }
    .nav-mobile {
      display: block;
      display: flex;
    }
  }
}
</style>