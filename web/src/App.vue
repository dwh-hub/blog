<template>
  <div id="app">
    <navigation></navigation>
    <div id="main">
      <div id="sidebar-left">
        <user-card></user-card>
        <user-contact></user-contact>
      </div>
      <div id="main-content">
        <router-view></router-view>
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

export default {
  name: "app",
  components: {
    navigation,
    userCard,
    userContact,
    tag
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
    display: flex;
    justify-content: center;
  }
  #sidebar-left {
    position: sticky;
    top: 12px;
    height: 100%;
  }
  #main-content {
    width: 750px;
    margin: 0 8px;
  }
  #sidebar-right {
    flex: 1;
  }
}
</style>
