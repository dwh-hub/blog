<template>
  <div class="animation">
    <navigation></navigation>
    <h1>动画区</h1>
  </div>
</template>

<script>
import navigation from "COMPS/base/navigation";
export default {
  name: "animation",
  components: {
    navigation,
  },
  mounted() {
    this.getAni();
  },
  methods: {
    getAni() {
      this.$api.bangumi.getDailyDelivery().then(res => {
        console.log(res)
      })
    },
  },
};
</script>

<style>
</style>