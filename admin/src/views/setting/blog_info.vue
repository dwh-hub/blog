<template>
  <div class="blog-info">
    <h1>编辑博客信息</h1>
    <el-form label-width="120px">
      <el-form-item label="昵称">
        <el-input type="text" v-model="blogInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="text" v-model="blogInfo.profile"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <div class="assess-img-wrapper">
          <div
            class="assess-img"
            @click="previewImage(blogInfo.avatar)"
            v-if="blogInfo.avatar"
          >
            <img :src="blogInfo.avatar" class="avatar-img" />
            <i class="delete-icon" @click.stop="blogInfo.avatar = ''"></i>
          </div>
          <div class="uploader" v-else>
            <input type="file" class="uploader-input" @change="selectAvatar" />
            <img src="~ASSETS/images/picture.png" />
          </div>
        </div>
      </el-form-item>
      <el-form-item label="信息卡背景图">
        <div class="assess-img-wrapper">
          <div
            class="assess-img bg-img"
            @click="previewImage(blogInfo.bgUrl)"
            v-if="blogInfo.bgUrl"
          >
            <img :src="blogInfo.bgUrl" class="bg-img" />
            <i class="delete-icon" @click.stop="blogInfo.bgUrl = ''"></i>
          </div>
          <div class="uploader" v-else>
            <input type="file" class="uploader-input" @change="selectBG" />
            <img src="~ASSETS/images/picture.png" />
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save()">保存</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="previewVisible">
      <img width="100%" :src="previewSrc" alt />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "blogInfo",
  data() {
    return {
      blogInfo: {
        name: "",
        profile: "",
        avatar: "",
        bgUrl: "",
      },
      previewSrc: "",
      previewVisible: false,
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      let info = await this.$api.setting.fetchBlogInfo();
      if (info.data) {
        for (let k in this.blogInfo) {
          this.blogInfo[k] = info.data[k];
        }
      }
    },
    async save() {
      for (let k in this.blogInfo) {
        if (!this.blogInfo[k]) {
          return this.$message({
            message: `缺失${k}`,
            type: "warning",
          });
        }
      }
      const res = await this.$api.setting.updateBlogInfo(this.blogInfo);
      this.$message({
        message: res.message,
        type: "success",
      });
    },
    previewImage(url) {
      this.previewSrc = url;
      this.previewVisible = true;
    },
    avatarBeforeUpload(file) {
      console.log(file);
    },
    avatarSuccess(file) {
      console.log(file);
    },
    async uploadImg(e) {
      let file = e.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      const res1 = await this.$api.upload.getQiniuToken();
      formData.append("token", res1.data);
      const res2 = await this.$api.upload.uploadQiniu(formData);
      return res2.data
    },
    selectAvatar(e) {
      this.uploadImg(e).then((url) => {
        this.blogInfo.avatar = url;
      });
    },
    selectBG(e) {
      this.uploadImg(e).then((url) => {
        this.blogInfo.bgUrl = url;
      });
    },
  },
};
</script>

<style lang="less">
.assess-img-wrapper {
  .assess-img {
    position: relative;
    display: inline-block;
    margin-right: 10px;
    > img {
      cursor: pointer;
      width: 100%;
      height: 100%;
      object-fit: cover;
      &.avatar-img {
        border-radius: 50%;
        width: 100px;
        height: 100px;
      }
      &.bg-img {
        width: 167px;
        height: 100px;
      }
    }
    .delete-icon {
      cursor: pointer;
      position: absolute;
      right: -5px;
      top: -5px;
      display: inline-block;
      width: 22px;
      height: 22px;
      z-index: 2;
      background-image: url("~ASSETS/images/close.png");
      background-size: cover;
      background-color: #fff;
      border-radius: 50%;
    }
  }
}
.uploader {
  position: relative;
  display: inline-block;
  .uploader-input {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  > img {
    width: 100px;
    height: 100px;
  }
}
</style>