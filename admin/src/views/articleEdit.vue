<template>
  <div class="article-tag">
    <h1>{{id ? '编辑' : '新增'}}文章</h1>
    <el-form label-width="120px">
      <el-form-item label="标签">
        <el-select v-model="tags" multiple placeholder="请选择">
          <el-option
            v-for="item in parentOptions"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input type="text" v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <mavon-editor ref="md" v-model="content" @imgAdd="$imgAdd" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveArticle()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  props: {
    id: {}
  },
  data() {
    return {
      parentOptions: [],
      tags: [],
      title: "",
      content: ""
    };
  },
  components: {
    mavonEditor
  },
  created() {
    this.id && this.fetch();
    this.getTagList();
  },
  methods: {
    async fetch() {
      const res = await this.$axios.get(`/admin/api/reset/article/${this.id}`);
      this.title = res.data.title;
      this.tags = res.data.tag;
      this.content = res.data.content;
    },
    async getTagList() {
      const res = await this.$axios.get("/admin/api/reset/tag");
      this.parentOptions = res.data;
    },
    async $imgAdd(pos, $file) {
      const formdata = new FormData()
      formdata.append('file', $file);
      const res = await this.$axios.post('/admin/api/upload', formdata)
      this.$refs.md.$img2Url(pos, res.data);
    },
    async saveArticle() {
      let res;
      if (this.id) {
        res = await this.$axios.post("/admin/api/reset/article/edit", {
          _id: this.id,
          title: this.title,
          tag: this.tags,
          content: this.content
        });
      } else {
        res = await this.$axios.post("/admin/api/reset/article/add", {
          title: this.title,
          tag: this.tags,
          content: this.content
        });
      }
      this.$message({
        message: res.message,
        type: "success"
      });
      this.$router.push({ path: "/article/list" });
    }
  }
};
</script>

<style lang="less">
</style>