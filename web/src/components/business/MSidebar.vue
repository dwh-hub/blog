<template>
  <div class="m-sidebar" :style="{'left': sideLeft}">
    <div class="sidebar-content">
      <div class="cover">
        <img :src="blogInfo.avatar" />
      </div>
      <div class="name">{{blogInfo.name}}</div>
      <div class="mobile-menu">
        <div class="menu-item" @click="toRouter('/')">
          <i class="home"></i>
          <span>首页</span>
        </div>
      </div>
    </div>
    <div class="mask" v-if="showSidebar" @click="clickMask"></div>
  </div>
</template>

<script>
import EventBus from "../../utils/eventBus";
export default {
  data() {
    return {
      showSidebar: false,
      blogInfo: {}
    };
  },
  computed: {
    sideLeft() {
      return this.showSidebar ? "0px" : "-240px";
    }
  },
  mounted() {
    this.getInfo();
    EventBus.$on("toggleMenu", () => {
      this.showSidebar = !this.showSidebar;
    });
  },
  methods: {
    clickMask() {
      this.showSidebar = false;
    },
    async getInfo() {
      if (this.$store.state.userInfo) {
        this.blogInfo = this.$store.state.userInfo;
      } else {
        let info = await this.$axios.post("/web/api/blogInfo");
        this.blogInfo = info.data;
        this.$store.commit("saveUserInfo", this.blogInfo);
      }
    },
    toRouter(url) {
      this.$router.push(url)
      this.showSidebar = false
    }
  }
};
</script>

<style lang="less" scoped>
.m-sidebar {
  display: none;
  position: fixed;
  left: -240px;
  top: 0;
  height: 100%;
  width: 240px;
  background: url("https://shawnzeng.com/wp-content/themes/Giligili/img/mobile_bg.jpg")
    no-repeat center center;
  background-size: cover;
  transition: left 0.3s ease-out;
  z-index: 8;
  .sidebar-content {
    position: relative;
    z-index: 8;
    width: 100%;
    height: 100%;
    padding-top: 20px;
    background-color: rgba(0, 0, 0, 0.2);
    .cover {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      border: 2px solid #fff;
      box-sizing: border-box;
      border-radius: 50%;
      overflow: hidden;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      margin-top: 8px;
      text-align: center;
      color: #fff;
      font-size: 18px;
    }
  }
  .mobile-menu {
    cursor: pointer;
    margin-top: 20px;
    .menu-item {
      line-height: 20px;
      padding: 10px 40px;
      .home {
        vertical-align: middle;
        width: 16px;
        height: 16px;
        background-image: url("~ASSETS/images/home.png");
        background-size: cover;
      }
      > span {
        display: inline-block;
        margin-left: 5px;
        vertical-align: middle;
        font-size: 14px;
        color: #fff;
      }
      &:hover,
      &:active {
        background-color: rgba(128, 128, 128, 0.5);
      }
    }
  }
}
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 7;
  background-color: rgba(0, 0, 0, 0.3);
}
@media screen and (max-width: 900px) {
  .m-sidebar {
    display: block;
  }
}
</style>