<template>
  <div class="tinymce-editor">
    <div class="tools">
      <span>工具：</span>
      <el-button type="primary" size="small" @click="isPreview = true">预览</el-button>
    </div>
    <editor v-model="myValue" :init="init" :disabled="disabled" @onClick="onClick"></editor>

    <div class="preview-fullscreen" v-if="isPreview">
      <div class="content">
        <div class="tools">
          <span>工具：</span>
          <el-button type="primary" size="small" @click="isPreview = false">退出预览</el-button>
        </div>
        <div class="article" v-html="myValue"></div>
      </div>
    </div>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
// import "tinymce/themes/silver/theme";
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/wordcount"; // 字数统计插件
export default {
  components: {
    Editor
  },
  props: {
    //传入一个value，使组件支持v-model绑定
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: "lists image media table wordcount"
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat"
    }
  },
  data() {
    return {
      //初始化配置
      init: {
        language_url: "/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "/tinymce/skins/ui/oxide",
        content_css: `/tinymce/skins/content/default/content.css`,
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          //   const img = "data:image/jpeg;base64," + blobInfo.base64();
          //   success(img);
          this.insertImg(blobInfo, success, failure);
        }
      },
      isPreview: false,
      myValue: this.value
    };
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    //添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    onClick(e) {
      this.$emit("onClick", e, tinymce);
    },
    clear() {
      this.myValue = "";
    },
    async insertImg(blobInfo, success, failure) {
      let formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());
      // const res = await this.$api.upload.uploadImg(formData);
      const res1 = await this.$api.upload.getQiniuToken();
      formData.append("token", res1.data);
      const res2 = await this.$api.upload.uploadQiniu(formData);
      success(res2.data);
      // xhr.send(formData);
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit("input", newValue);
    }
  }
};
</script>
<style lang="less" scoped>
.tools {
  padding: 0 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.preview-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f4f5f7;
  z-index: 2;
  .content {
    margin: 0 auto;
    width: 750px;
    height: 100%;
    background-color: #fff;
  }
}
</style>