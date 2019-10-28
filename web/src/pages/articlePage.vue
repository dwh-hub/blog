<template>
  <div class="article blog-item">
    <h1 class="tiile">{{article.title}}</h1>
    <div class="article-content" v-html="article.content"></div>
  </div>
</template>

<script>
import marked from "marked"
export default {
  name: "article-content",
  props: {
    id: {}
  },
  data() {
    return {
      article: {}
    }
  },
  created() {
    this.getArticle()
  },
  methods: {
    async getArticle() {
      const res = await this.$axios.get(`/web/api/article/${this.id}`);
      res.data.content = marked(res.data.content || '')
      this.article = res.data
    },
  }
}
</script>

<style lang="less">

</style>