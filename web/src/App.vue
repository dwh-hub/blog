<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import navigation from "COMPS/base/navigation";
export default {
  name: "app",
  components: {
    navigation
  },
};
</script>

<style lang="less">
@import "~COMMON/less/reset.less";
</style>

