<template>
  <div class="animation">
    <div class="animation-main">
      <div class="swiper-wrapper">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="http://img.animetamashi.cn/guide/df96af-preview" />
            </div>
            <div class="swiper-slide">
              <img src="http://img.animetamashi.cn/guide/93150e-preview" />
            </div>
            <div class="swiper-slide">
              <img src="http://img.animetamashi.cn/guide/5049bd-preview" />
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <calendar></calendar>
    </div>
  </div>
</template>

<script>
import calendar from "COMPS/animation/calendar";
import Swiper, { Navigation, Pagination } from "swiper";
Swiper.use([Navigation, Pagination]);

export default {
  name: "animation",
  components: {
    calendar,
  },
  mounted() {
    var mySwiper = new Swiper(".swiper-container", {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
      },
    });
  },
  methods: {
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log("slide change");
    },
  },
};
</script>

<style lang="less">
.animation-main {
  margin: 0 auto;
  max-width: 1120px;
}
.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  opacity: 1;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}
.swiper-pagination-bullet-active {
  width: 24px;
  background-image: linear-gradient(to right, #f3c759, #ff719b);
  border-radius: 4px;
}
.swiper-wrapper {
  width: 705px;
}
.swiper-container {
  height: 300px;
}
</style>