<template>
  <div class="add-tag">
    <h1>{{id ? '编辑' : '新增'}}标签</h1>
    <el-form label-width="120px">
      <el-form-item label="上级标签">
        <el-select v-model="parentTag" placeholder="请选择">
          <el-option
            v-for="item in parentOptions"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签名">
        <el-input type="text" v-model="tag"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveTag()">保存</el-button>
        <el-button @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      parentOptions: [],
      parentTag: "",
      tag: ""
    };
  },
  created() {
    this.id && this.fetch();
    this.getTagList();
  },
  methods: {
    async fetch() {
      const res = await this.$api.tag.fetchTag({
        id: this.id
      });
      this.parentTag = res.data.parent;
      this.tag = res.data.name;
    },
    async getTagList() {
      const res = await this.$api.tag.fetchTagList();
      this.parentOptions = [{name: '无', _id: undefined}].concat(res.data.list);
    },
    async saveTag() {
      let res;
      if (this.id) {
        res = await this.$api.tag.editTag({
          _id: this.id,
          parent: this.parentTag,
          name: this.tag
        });
      } else {
        res = await this.$api.tag.addTag({
          parent: this.parentTag || undefined,
          name: this.tag
        });
      }
      this.$message({
        message: res.message,
        type: "success"
      });
      this.$router.push({ path: "/tag/list" });
    },
    reset() {
      this.tag = "";
      parentTag = "";
    }
  }
};
</script>

<style>
</style>