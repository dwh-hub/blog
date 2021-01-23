// bangumi API接口地址 https://github.com/bangumi/api by dwh for 2021/1/20

export default {
  baseUrl: "https://api.bgm.tv",
  // 获取番剧每日放送
  getDailyDelivery() {
    return fetch('/bgm/calendar').then(res => res.json())
  },
  // 获取动画详情
  getAniDetail(id) {
    return fetch(`/bgm//subject/${id}?responseGroup=large`).then(res => res.json())
  },
};
