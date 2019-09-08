<template>
  <div class="article-list blog-item">
    <article-item v-for="(item, index) in 5" :key="index"></article-item>
  </div>
</template>

<script>
import articleItem from 'COMPS/base/articleItem'
export default {
  name: 'articleList',
  components: {
    articleItem
  }
}
</script>

<style lang="less">
  .article-list {
    width: 750px;
    &.blog-item {
      padding: 12px 30px;
    }
  }
</style>