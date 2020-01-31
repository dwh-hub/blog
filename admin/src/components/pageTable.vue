<template>
  <div class="page-table">
    <el-row type="flex" justify="center">
      <el-col :span="24">
        <el-table
          :data="data"
          :max-height="maxHeight"
          :height="height"
          v-loading="tableLoading"
          element-loading-text="拼命加载中..."
          :stripe="stripe"
        >
          <el-table-column v-if="showIndex" type="index" width="50"></el-table-column>
          <slot></slot>
        </el-table>
      </el-col>
    </el-row>
    <!--分页栏-->
    <el-row v-if="hasPagination">
      <el-col :span="24">
        <el-pagination
          background
          layout="prev, pager, next, total, sizes"
          :total="paging.total"
          :current-page="paging.pageNo"
          :page-sizes="paging.pageSizes"
          :page-size="paging.pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "pageTable",
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    maxHeight: String,
    height: String,
    stripe: {
      type: Boolean,
      default: true
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    hasPagination: {
      type: Boolean,
      default: true
    },
    paging: {
      type: Object,
      default: function() {
        return { pageNo: 1, pageSize: 10, pageSizes: [10, 30, 50], total: 0 };
      }
    }
  },
  data() {
    return {
      tableLoading: false
    };
  },
  methods: {
    handleCurrentChange(val) {
      if (this.paging.pageNo == val) return
      this.paging.pageNo = val
      this.$emit('pageChange')
    },
    handleSizeChange(size) {
      if (this.paging.pageSize == size) return
      this.paging.pageSize = size
      this.$emit('pageChange')
    }
  }
};
</script>

<style lang="less">
.el-pagination {
  margin-top: 15px;
}
</style>