<template>
  <div class="article-item" @click="toArticle">
    <h2 class="article-title">{{article.title}}</h2>
    <p class="article-content">{{article.content}}</p>
    <div class="article-about">
      <img class="author-cover" src="~/ASSETS/images/user-cover.jpg" alt />
      <span class="author-name">{{article.author}}</span>
      <span class="article-tag">
        标签 :
        <a href="#">{{article.tag}}</a>
      </span>
      <span class="article-date">日期 : {{article.date}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "article-item",
  props: {
    article: {
      type: Object,
      default: function() {
        return {
          id: 3,
          title: "中文假文产生器",
          content:
            "是他女人说说向着没有世界原来，乌黑句话窗外为不有意可爱。的鼻的时那样，天都格外他正上下。第二两个才有住的。所有原来他也面包我现主的，我还一段。大人好用不很地震睡了他的。听得就不不懂一声⋯说他人是会是小时看到，间的怎么应该辈子不需。偶像日本交通的原高兴活击。吃得己的所以，是下。退了已经人的然是，干净觉得不知仔细一样就会，而我到就魔法。",
          author: "大花园",
          cover: "",
          tag: "#文章#",
          date: "2019-09-08"
        };
      }
    }
  },
  methods: {
    toArticle() {
      this.$router.push({ path: `/article/${this.article.id}`});
    }
  }
};
</script>

<style lang="less">
@import "~COMMON/less/base.less";
.article-item {
  cursor: pointer;
  padding: 36px 0;
  border-bottom: 1px solid #e5e9ef;
  // transition: transform 0.3s;
  backface-visibility: hidden;
  &:hover {
    // -webkit-font-smoothing: subpixel-antialiased;
    // transform: perspective(1px) scale(1.01);
    .article-title {
      font-size: 30px;
      color: #00a1d6;
    }
  }
  .article-title {
    font-size: 28px;
    line-height: 38px;
    font-weight: bold;
    color: #4a4a4a;
    transition: all 0.3s;
  }
  .article-content {
    .Mult-line(4);
    margin-top: 16px;
    margin-bottom: 18px;
    font-size: 16px;
    letter-spacing: 0.5px;
    line-height: 24px;
    color: #333;
  }
  .article-about {
    color: #99a2aa;
    > span {
      margin-left: 8px;
    }
    .article-tag {
      > a {
        color: #eb7350;
      }
    }
    .author-cover {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
  }
}
</style>