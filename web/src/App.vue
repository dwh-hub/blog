<template>
  <div id="app">
    <navigation></navigation>
    <div id="main">
      <div class="sidebar">
        <user-card></user-card>
        <user-contact></user-contact>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "COMPS/business/navigation"
import userCard from "COMPS/business/userCard"
import userContact from "COMPS/business/userContact"

export default {
  name: "app",
  components: {
    navigation,
    userCard,
    userContact
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
    margin: 16px auto;
    display: flex;
    // justify-content: center;
  }
}
</style>
