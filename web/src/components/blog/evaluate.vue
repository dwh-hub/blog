<template>
  <div class="evaluate">
    <div class="nickname cell">
      <span class="cell-label">昵称</span>
      <input type="text" v-model="nickname" />
    </div>
    <div class="email cell">
      <span class="cell-label">邮箱</span>
      <input type="text" v-model="email" />
    </div>
    <div class="content">
      <textarea v-model="content"></textarea>
    </div>
    <button class="submit" @click="evaluate">发表评论</button>
  </div>
</template>

<script>
export default {
  name: "evaluate",
  props: {
    articleId: String,
  },
  data() {
    return {
      nickname: "",
      email: "",
      content: "",
      evalutaions: [],
    };
  },
  created() {
    this.getEvalutaions();
  },
  methods: {
    async getEvalutaions() {
      let res = await this.$api.article.fetchArticleEvalutaions({
        articleId: this.articleId,
      });
    },
    async evaluate() {
      if (!this.nickname) return alert("请填写昵称");
      let params = {
        articleId: this.articleId,
        nickname: this.nickname,
        email: this.email,
        content: this.content,
      };
      let res = await this.$api.article.sendComments(params);
      alert(res.message);
    },
  },
};
</script>

<style lang="less" scoped>
.evaluate {
  .cell {
    .cell-label {
    }
  }
  .content {
    > textarea {
      resize: none;
    }
  }
}
</style>