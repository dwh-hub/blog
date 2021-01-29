<template>
  <div class="loading" v-if="loading">
    <div class="loading-main">
      <div class="loading-icon">正在加载...</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    }
  },
};
</script>

<style lang="less" scoped>
.loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.6);
  .loading-main {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>