<template>
  <div class="animation-detail">
    <animation :id="id"></animation>
    <div class="dividing-line"></div>
    <similarity-bgm :id="id"></similarity-bgm>
  </div>
</template>

<script>
import animation from "@/components/animation/animation";
import similarityBgm from "@/components/animation/similarity-bgm";
export default {
  data() {
    return {
      id: "",
    };
  },
  components: {
    animation,
    similarityBgm,
  },
  created() {
    this.id = this.$route.params.id;
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.animation-detail {
  display: flex;
  justify-content: center;
  margin: 20px auto 0 auto;
  .dividing-line {
    width: 25px;
  }
}
</style>