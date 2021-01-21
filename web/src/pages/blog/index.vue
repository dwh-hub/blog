<template>
  <div id="home-index">
    <m-sidebar></m-sidebar>
    <div id="main">
      <div id="sidebar-left">
        <user-card></user-card>
        <user-contact></user-contact>
      </div>
      <div id="main-content">
        <!-- <transition name="fade"> -->
          <router-view :key="$route.path + $route.query.t"></router-view>
        <!-- </transition> -->
      </div>
      <div id="sidebar-right">
        <tag></tag>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "COMPS/base/navigation";
import userCard from "COMPS/blog/user_card";
import userContact from "COMPS/blog/user_contact";
import tag from "COMPS/blog/tag";
import MSidebar from "COMPS/blog/MSidebar";

export default {
  name: "app",
  components: {
    navigation,
    userCard,
    userContact,
    tag,
    MSidebar
  },
};
</script>

<style lang="less">
@import "~COMMON/less/font.less";
@import "~COMMON/less/base.less";
#home-index {
  overflow: hidden;
  #main {
    width: 1280px;
    max-width: 100%;
    margin: 12px auto;
    justify-content: center;
  }
  #sidebar-left {
    position: sticky;
    top: 12px;
    float: left;
    width: 20%;
    height: 100%;
    padding-left: 5px;
    box-sizing: border-box;
  }
  #main-content {
    display: inline-block;
    width: 60%;
    box-sizing: border-box;
    padding: 0 8px;
  }
  #sidebar-right {
    width: 20%;
    box-sizing: border-box;
    float: right;
    padding-right: 5px;
  }
  @media screen and (max-width: 900px) {
    #main-content {
      width: 100%;
    }
    #sidebar-left {
      display: none;
    }
    #sidebar-right {
      display: none;
    }
  }

  .fade-leave-active,
  .fade-leave-to {
    display: none;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease-in;
    position: relative; //这里的定位使用relative可以解决切换时页面残影
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
