// bangumi API接口地址 https://github.com/bangumi/api by dwh for 2021/1/20

export default {
  // 获取番剧每日放送
  getDailyDelivery() {
    return fetch('/bgm/calendar').then(res => res.json())
  },
  // 获取番剧详情
  getBgmDetail(id) {
    return fetch(`/bgm//subject/${id}?responseGroup=large`).then(res => res.json())
  },
  // 查询相似番剧
  getSimilarityBgm(id) {
    return fetch(`https://search.bakery.moe/api/search/similarity/${id}`).then(res => res.json())
  }
};
