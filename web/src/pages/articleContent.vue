<template>
  <div class="article-content blog-item"></div>
</template>

<script>
export default {
  name: "article-content",
  data() {
    return {
      id: ''
    }
  },
  mounted() {
    this.id = this.$route.params.id
  }
}
</script>

<style lang="less">

</style>