<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router style="height: 100vh;" :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>内容管理
          </template>
          <el-menu-item-group>
            <span slot="title">标签</span>
            <el-menu-item index="/tag/add">添加标签</el-menu-item>
            <el-menu-item index="/tag/list">标签列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <span slot="title">文章</span>
            <el-menu-item index="/article/add">编辑文章</el-menu-item>
            <el-menu-item index="/article/list">文章列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <span slot="title">评论</span>
            <el-menu-item index="/evaluation">评论列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>系统设置
          </template>
          <el-menu-item-group>
            <span slot="title">管理员</span>
            <el-menu-item index="/user/add">编辑管理员</el-menu-item>
            <el-menu-item index="/user/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-message"></i>博客信息设置
          </template>
          <el-menu-item index="/blog/info">博客信息</el-menu-item>
          <!-- <el-menu-item-group>
            <span slot="title">博客信息</span>
          </el-menu-item-group> -->
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>