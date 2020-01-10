<template>
  <div id="user-card" class="blog-item">
    <div class="user-card-top" :style="{'background-image': `url(${blogInfo.bgUrl})`}">
      <div class="user-card-bg-mask"></div>
      <img class="user-card-cover" :src="blogInfo.avatar" alt />
      <div class="user-card-info">
        <div class="user-name">{{blogInfo.name}}</div>
        <div class="user-card-desc">{{blogInfo.profile}}</div>
      </div>
    </div>
    <div class="user-card-sum">
      <a class="user-card-sum-item">
        <p class="num">{{userCount.articleCount}}</p>
        <p class="text">文章</p>
      </a>
      <a class="user-card-sum-item">
        <p class="num">{{userCount.shuoshuoCount}}</p>
        <p class="text">说说</p>
      </a>
      <a class="user-card-sum-item">
        <p class="num">{{userCount.evalutaionCount}}</p>
        <p class="text">评论</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userCount: {},
      blogInfo: {}
    };
  },
  mounted() {
    this.getInfo()
    this.getUserCount();
  },
  methods: {
    async getInfo() {
      if (this.$store.state.userInfo) {
        this.blogInfo = this.$store.state.userInfo;
      } else {
        let info = await this.$axios.post("/web/api/blogInfo");
        this.blogInfo = info.data;
        this.$store.commit('saveUserInfo', this.blogInfo)
      }
    },
    async getUserCount() {
      let info = await this.$axios.get("/web/api/user/count");
      this.userCount = info.data;
    }
  }
};
</script>

<style lang="less">
#user-card {
  padding: 0;
  .user-card-top {
    position: relative;
    width: 100%;
    height: 150px;
    background-size: cover;
    .user-card-bg-mask {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.3);
    }
    .user-card-cover {
      position: relative;
      z-index: 1;
      margin-left: 16px;
      margin-top: 24px;
      height: 56px;
      height: 56px;
      border-radius: 50%;
      border: 2px solid #fff;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1), 1px 1px 1px rgba(0, 0, 0, 0.1),
        1px 1px 1px rgba(0, 0, 0, 0.1);
    }
    .user-card-info {
      position: relative;
      z-index: 1;
      margin-top: 10px;
      padding-left: 16px;
      color: #fff;
      // text-shadow: 5px 2px 6px #000;
      .user-name {
        font-size: 16px;
      }
      .user-card-desc {
        margin-top: 4px;
        font-size: 14px;
      }
    }
  }
  .user-card-sum {
    display: flex;
    .user-card-sum-item {
      flex: 1;
      text-align: center;
      > p {
        font-weight: bold;
      }
      .num {
        padding-top: 15px;
        font-size: 14px;
        color: #00a1d6;
      }
      .text {
        padding-top: 9px;
        padding-bottom: 12px;
        font-size: 12px;
        color: #99a2aa;
      }
    }
  }
}
</style>