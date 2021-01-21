<template>
  <div class="animation-page">54545456</div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      detail: {},
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getAniDetail();
  },
  methods: {
    getAniDetail() {
      this.$api.bangumi.getAniDetail(this.id).then((data) => {
        console.log(data);
      });
    },
  },
};
</script>

<style lang="less">
</style>