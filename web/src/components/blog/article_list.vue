<template>
  <div class="article-list blog-item">
    <article-item v-for="(item, index) in articleList" :key="index" :article="item"></article-item>
    <div class="list-none" v-if="!isLoading && !articleList.length">暂无文章</div>
  </div>
</template>

<script>
import articleItem from "COMPS/base/article_item";
import { formatDate } from "COMMON/js/tools"
export default {
  name: "articleList",
  data() {
    return {
      articleList: [],
      isLoading: false
    };
  },
  components: {
    articleItem
  },
  mounted() {
    this.getArticleList();
  },
  methods: {
    async getArticleList() {
      this.isLoading = true
      let tagId = this.$route.params.id
      const res = await this.$api.article.fetchArticleList({
        id: tagId
      });
      this.articleList = res.data.map(e => {
        e.tag = String(e.tag.map(t => `#${t.name}#`));
        return {
          id: e._id,
          title: e.title,
          content: this.delHtmlTag(e.HTMLContent || ""),
          author: "大花园",
          cover: "",
          tag: e.tag,
          date: formatDate(new Date(e.addTime), 'yyyy/MM/dd hh:mm')
        };
      });
      this.isLoading = false
    },
    // 去除html标签
    delHtmlTag(str) {
      return str.replace(/<[^>]+>/g, "");
    }
  }
};
</script>

<style lang="less">
.article-list {
  &.blog-item {
    box-sizing: border-box;
    padding: 12px 30px;
  }
  .list-none {
    text-align: center;
    line-height: 30px;
    color: #999;
  }
}
</style>