<template>
  <div class="add-tag">
    <h1>新建标签</h1>
    <el-form>
      <el-form-item label="标签名">
        <el-input type="text" v-model="tag"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitTag()">提交</el-button>
        <el-button @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tag: ""
    };
  },
  methods: {
    async submitTag() {
      // const res = this.$axios.post('',{})
    },
    reset() {
      this.tag = "";
    }
  }
};
</script>

<style>
</style>