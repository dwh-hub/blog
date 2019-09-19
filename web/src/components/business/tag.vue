<template>
  <div class="tag blog-item">
    <div class="tag-title">
      <i class="icon"></i>
      <span>标签</span>
    </div>
    <div class="tag-item" v-for="(item, index) in tagList" :key="index">{{item.name}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagList: []
    }
  },
  mounted() {
    this.getTagList()
  },
  methods: {
    async getTagList() {
      const res = await this.$axios.get("/admin/api/reset/tag");
      this.tagList = res.data;
    }
  }
};
</script>

<style lang="less">
.tag {
  .tag-title {
    line-height: 32px;
    margin-bottom: 12px;
  }
  .tag-item {
    display: inline-block;
    cursor: pointer;
    margin-right: 5px;
    margin-bottom: 15px;
    line-height: 24px;
    padding: 0 10px;
    border-radius: 4px;
    background-color: #f4f5f6;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>