<template>
  <div class="article blog-item">
    <div class="title">
      <h2>{{ article.title }}</h2>
    </div>
    <div class="article-info">
      <span class="date">
        <i></i>
        <span>{{ article.addTime }}</span>
      </span>
    </div>
    <mavon-editor
      v-if="article.editorType == 1"
      class="md"
      :value="article.MDContent"
      :subfield="false"
      :defaultOpen="'preview'"
      :toolbarsFlag="false"
      :editable="false"
      :scrollStyle="true"
      :ishljs="true"
    ></mavon-editor>
    <div v-else class="article-content" v-html="article.HTMLContent"></div>
    <evaluate :articleId="id"></evaluate>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import evaluate from "COMPS/blog/evaluate";
console.log(mavonEditor);

export default {
  name: "article-content",
  props: {
    id: {},
  },
  data() {
    return {
      article: {},
    };
  },
  components: {
    evaluate,
    mavonEditor,
  },
  created() {
    this.getArticle();
  },
  methods: {
    async getArticle() {
      const res = await this.$api.article.fetchArticle({
        id: this.id,
      });
      res.data.addTime = res.data.addTime.slice(0, 10);
      this.article = res.data;
    },
  },
};
</script>

<style lang="less">
.article {
  padding: 0px 20px 20px 20px;
  .title {
    text-align: center;
    line-height: 30px;
    margin-top: 20px;
    > h2 {
      text-align: left;
    }
  }
  .article-info {
    margin-top: 5px;
    margin-bottom: 15px;
    .date {
      > i {
        vertical-align: middle;
        width: 15px;
        height: 15px;
        margin-right: 5px;
        background-image: url("~ASSETS/images/clock.png");
        background-size: cover;
      }
      > span {
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        color: #99a2aa;
      }
    }
  }
  /deep/ .v-note-wrapper {
    box-shadow: none !important;
  }
  /deep/ .v-show-content {
    background-color: #fff !important;
  }
}
</style>