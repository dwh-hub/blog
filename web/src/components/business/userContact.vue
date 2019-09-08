<template>
  <div id="user-contact" class="blog-item">
    <div class="user-contact-item">
      <i class="contact_iconfont icon-qq"></i>
      <a class="contact-text">1160395060</a>
    </div>
    <div class="user-contact-item">
      <i class="contact_iconfont icon-email"></i>
      <a class="contact-text">dwhandwp@163.com</a>
    </div>
    <div class="user-contact-item">
      <i class="contact_iconfont icon-github"></i>
      <a class="contact-text" href="https://github.com/dwh-hub" target="_blank">dwh-hub</a>
    </div>
    <div class="user-contact-item">
      <i class="contact_iconfont icon-bilibili"></i>
      <a class="contact-text" href="https://space.bilibili.com/11500922" target="_blank">大花园</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-contact"
};
</script>

<style lang="less">
@import "~COMMON/less/font.less";
#user-contact {
  .user-contact-item {
    line-height: 44px;
    border-bottom: 1px solid #f0f0f0;
    .contact_iconfont {
      font-size: 18px;
      vertical-align: middle;
    }
    .icon-bilibili {
      font-size: 22px;
      margin-left: -2px;
    }
    .contact-text {
      margin-left: 5px;
      vertical-align: middle;
    }
  }
}
</style>