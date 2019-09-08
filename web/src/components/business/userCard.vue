<template>
  <div id="user-card" class="blog-item">
    <div class="user-card-bg">
      <img class="user-card-cover" src="~/ASSETS/images/user-cover.jpg" alt />
      <div class="user-card-info">
        <div class="user-name">大花园</div>
        <div class="user-card-desc">巴拉巴拉一堆的简介</div>
      </div>
    </div>
    <div class="user-card-sum">
      <a class="user-card-sum-item">
        <p class="num">30</p>
        <p class="text">文章</p>
      </a>
      <a class="user-card-sum-item">
        <p class="num">21</p>
        <p class="text">说说</p>
      </a>
      <a class="user-card-sum-item">
        <p class="num">1535</p>
        <p class="text">评论</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
#user-card {
  width: 250px;
  padding: 0;
  .user-card-bg {
    width: 100%;
    height: 150px;
    background: url("~ASSETS/images/user-card-bg.jpg") no-repeat;
    background-size: cover;
    .user-card-cover {
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
      margin-top: 10px;
      padding-left: 16px;
      color: #fff;
      text-shadow:5px 2px 6px #000;
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