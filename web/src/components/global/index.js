import Vue from "vue";

//引入同目录下的全部组件
const requireCom = require.context(".", true, /\.vue$/);

//依次进行注册
requireCom.keys().forEach((key) => {
  //获取单个组件内容
  const _component = requireCom(key);
  //获取组件名称
  const _componentName = key.split('/')[1]

  //注册在vue上
  Vue.component(_componentName, _component.default || _component);
});
