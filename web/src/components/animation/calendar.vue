<template>
  <div class="calendar">
    <div class="week">
      <div class="bgm-icon"></div>
      <span class="calendar-title">每日放送</span>
      <div
        class="week-item"
        :class="{ today: curWeek == index }"
        v-for="(item, index) in week"
        :key="index"
        @click="changeWeek(index)"
      >
        {{ item.cn }}
      </div>
    </div>
    <div class="ani-list">
      <div
        class="ani"
        v-for="(item, index) in todayList"
        :key="index"
        @click="toDetail(item.id)"
      >
        <div class="ani-cover">
          <img :src="item.images.common" />
        </div>
        <div class="ani-name">{{ item.name_cn || item.name }}</div>
      </div>
      <loading :loading="loading"></loading>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      week: [],
      curWeek: null, // 0 - 6
      todayList: [],
      list: [],
      loading: true,
    };
  },
  mounted() {
    this.getWeek();
    this.getAni();
  },
  methods: {
    getWeek() {
      let week = [
        {
          en: "Mon",
          cn: "星期一",
          ja: "月耀日",
          id: 1,
        },
        {
          en: "Tue",
          cn: "星期二",
          ja: "火耀日",
          id: 2,
        },
        {
          en: "Wed",
          cn: "星期三",
          ja: "水耀日",
          id: 3,
        },
        {
          en: "Thu",
          cn: "星期四",
          ja: "木耀日",
          id: 4,
          isToday: true,
        },
        {
          en: "Fri",
          cn: "星期五",
          ja: "金耀日",
          id: 5,
        },
        {
          en: "Sat",
          cn: "星期六",
          ja: "土耀日",
          id: 6,
        },
        {
          en: "Sun",
          cn: "星期日",
          ja: "日耀日",
          id: 7,
        },
      ];
      let day = new Date().getDay();
      let curWeek = day === 0 ? 6 : day - 1;
      this.curWeek = curWeek;
      this.week = week;
    },
    getAni() {
      this.loading = true;
      this.$api.bangumi.getDailyDelivery().then((data) => {
        this.list = data;
        this.todayList = data[this.curWeek].items;
        this.loading = false;
      });
    },
    changeWeek(index) {
      this.curWeek = index;
      this.todayList = this.list[index].items;
    },
    toDetail(id) {
      this.$router.push({ path: `/animation/detail/${id}` });
    },
  },
};
</script>

<style lang="less" scoped>
.calendar {
  background: #fff;
  border-radius: 4px;
  padding: 5px 10px 10px 10px;
  .week {
    display: flex;
    align-items: center;
    .bgm-icon {
      width: 36px;
      height: 36px;
      margin-right: 4px;
      background-image: url("~ASSETS/images/bgm_icon.jpg");
      background-repeat: no-repeat;
      background-size: cover;
    }
    .calendar-title {
      font-size: 15px;
      color: #555;
      font-weight: bold;
      margin-right: 10px;
    }
    .week-item {
      cursor: pointer;
      margin: 10px 0;
      width: 80px;
      line-height: 30px;
      text-align: center;
    }
    .today {
      font-size: 15px;
      font-weight: bold;
    }
  }
  .ani-list {
    position: relative;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 20px;
    min-height: 220px;
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