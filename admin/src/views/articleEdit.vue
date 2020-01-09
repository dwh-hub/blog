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
      <el-form-item label="编辑类型">
        <el-select v-model="editorType" placeholder="请选择" @change="changeEditorType">
          <el-option
            v-for="item in editorTypes"
            :key="item.value"
            :label="item.type"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input type="text" v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <mavon-editor ref="md" v-model="content" @imgAdd="$imgAdd" v-if="editorType == 1"/>
        <tinymce-editor id="tinymce" v-model="contentHtml" :init="tinymceInit" v-if="editorType == 2"></tinymce-editor>
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

import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver/theme";
import tinymceEditor from "@tinymce/tinymce-vue";

export default {
  props: {
    id: {}
  },
  data() {
    return {
      parentOptions: [],
      tags: [],
      title: "",
      content: "",
      contentHtml: "",
      tinymceInit: {
        language_url: '../../public/zh_CN.js',
        language: 'zh_CN',
        // skin_url: '../../public/skins/ui/oxide',
        height: 300
      },
      editorTypes: [{
        value: 1,
        type: 'markdown'
      },{
        value: 2,
        type: 'html'
      }],
      editorType: 1
    };
  },
  components: {
    tinymceEditor,
    mavonEditor
  },
  created() {
    this.id && this.fetch();
    this.getTagList();
  },
  mounted() {
    tinymce.init({})
  },
  methods: {
    async fetch() {
      const res = await this.$axios.get(`/admin/api/reset/article/${this.id}`);
      this.title = res.data.title;
      this.tags = res.data.tag;
      res.data.editorType == 1 ? this.content = res.data.content : this.contentHtml = res.data.content;
      this.editorType = res.data.editorType
    },
    async getTagList() {
      const res = await this.$axios.get("/admin/api/reset/tag");
      this.parentOptions = res.data;
    },
    async $imgAdd(pos, $file) {
      const formdata = new FormData();
      formdata.append("file", $file);
      const res = await this.$axios.post("/admin/api/upload", formdata);
      this.$refs.md.$img2Url(pos, res.data);
    },
    async saveArticle() {
      let res;
      if (this.id) {
        res = await this.$axios.post("/admin/api/reset/article/edit", {
          _id: this.id,
          title: this.title,
          tag: this.tags,
          content: this.editorType == 1 ? this.content : this.contentHtml,
          editorType: this.editorType
        });
      } else {
        res = await this.$axios.post("/admin/api/reset/article/add", {
          title: this.title,
          tag: this.tags,
          content: this.editorType == 1 ? this.content : this.contentHtml
        });
      }
      this.$message({
        message: res.message,
        type: "success"
      });
      this.$router.push({ path: "/article/list" });
    },
    changeEditorType() {
      console.log(this.editorType)
    }
  }
};
</script>

<style lang="less">
</style>