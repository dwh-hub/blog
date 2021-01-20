<template>
  <div class="calendar">
    <div class="week">
      <div
        class="week-item"
        v-for="(item, index) in week"
        :key="index"
        @click="changeWeek(item)"
      >
        {{ item.cn }}
      </div>
    </div>
    <div class="ani-list">
      <div class="ani" v-for="(item, index) in todayList" :key="index">
        <div class="ani-cover">
          <img :src="item.images.common" />
        </div>
        <div class="ani-name">{{item.name_cn}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      week: [],
      todayList: [],
      list: [],
    };
  },
  mounted() {
    this.getAni();
  },
  methods: {
    getAni() {
      this.$api.bangumi.getDailyDelivery().then((data) => {
        this.list = data;
        let curWeek = new Date().getDay();
        this.todayList = data[curWeek].items;
        console.log(this.todayList);
        data.forEach((e) => {
          this.week.push(e.weekday);
        });
      });
    },
    changeWeek(item) {
      this.list.forEach((e) => {
        if (e.weekday.id === item.id) {
          this.todayList = e.items;
        }
      });
    },
  },
};
</script>

<style lang="less">
.calendar {
  .week {
    .week-item {
      cursor: pointer;
      display: inline-block;
      margin: 10px 0;
      width: 80px;
      line-height: 30px;
      text-align: center;
    }
  }
  .ani-list {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 20px;
    .ani {
      cursor: pointer;
      .ani-cover {
        img {
          width: 100%;
          height: 100%;
        }
      }
      .ani-name {
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
}
</style>