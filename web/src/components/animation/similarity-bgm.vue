<template>
  <div class="recommend">
    <div class="recommend-title">推荐番剧</div>
    <div
      class="bgm-item"
      v-for="item in list"
      :key="item.bgmid"
      @click="toDetail(item.bgmid)"
    >
      <div class="bgm-cover">
        <img :src="item.cover" />
      </div>
      <div class="bgm-info">
        <div class="bgm-info-top">
          <div class="bgm-type">{{ item.type }}</div>
          <div class="bgm-name">{{ item.title }}</div>
        </div>
        <div class="bgm-bottom">
          <div class="alias">{{ item.alias[0] }}</div>
          <div class="ep">集数：{{ item.episode }}话</div>
          <div class="score">bangumi评分：{{ item.rank }}</div>
          <div class="similarity">相似度：{{ item.similarityRate }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number | String,
    },
  },
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.getSimilarityBgm();
  },
  methods: {
    getSimilarityBgm() {
      this.$api.bangumi.getSimilarityBgm(this.id).then((data) => {
        let list = data.items.map((e, index) => {
          e.similarityRate = data.similarities[index];
          return e;
        });
        this.list = list;
      }).catch(e => {
        console.log(e)
        // TODO 新番剧可能没有，没有就从bangumi那那rank排名
      });
    },
    toDetail(id) {
      this.$router.push({ path: `/animation/detail/${id}` });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~COMMON/less/base.less";
.recommend {
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  width: 350px;
  .recommend-title {
    font-size: 18px;
    font-weight: bold;
    color: #555;
  }
  .bgm-item {
    display: flex;
    margin-top: 15px;
    cursor: pointer;
    .bgm-cover {
      flex-shrink: 0;
      width: 100px;
      margin-right: 10px;
    }
    .bgm-info {
      flex: 1;
      padding: 5px 0;
      .bgm-info-top {
        display: flex;
        align-items: center;
        .bgm-type {
          flex-shrink: 0;
          font-size: 15px;
          background-color: #d19a66;
          color: #fff;
          line-height: 20px;
          height: 20px;
          padding: 0 4px;
          margin-right: 5px;
        }
        .bgm-name {
          flex: 1;
          font-size: 16px;
          color: #555;
          font-weight: bold;
          .Mult-line(1);
        }
      }
      .bgm-bottom {
        margin-top: 15px;
        line-height: 26px;
        color: #333;
        font-size: 15px;
      }
    }
  }
}
</style>