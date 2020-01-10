<template>
  <div id="app">
    <navigation></navigation>
    <m-sidebar></m-sidebar>
    <div id="main">
      <div id="sidebar-left">
        <user-card></user-card>
        <user-contact></user-contact>
      </div>
      <div id="main-content">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
      <div id="sidebar-right">
        <tag></tag>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "COMPS/business/navigation";
import userCard from "COMPS/business/userCard";
import userContact from "COMPS/business/userContact";
import tag from "COMPS/business/tag";
import MSidebar from "COMPS/business/MSidebar";

export default {
  name: "app",
  components: {
    navigation,
    userCard,
    userContact,
    tag,
    MSidebar
  }
};
</script>

<style lang="less">
@import "~COMMON/less/reset.less";
@import "~COMMON/less/base.less";
#app {
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

  // .fade-leave-active,
  // .fade-leave-to {
  //   display: none;
  // }
  // .fade-enter-active,
  // .fade-leave-active {
  //   transition: all 0.5s;
  //   position: relative; //这里的定位使用relative可以解决切换时页面残影
  // }
  // .fade-enter,
  // .fade-leave-to {
  //   opacity: 0;
  // }
}
</style>
