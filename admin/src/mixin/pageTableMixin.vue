<script>
export default {
  data() {
    return {
      tableData: [],
      pageInfo: {
        pageNo: 1,
        pageSize: 10,
        pageSizes: [10, 30, 50],
        total: 0
      }
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    handleData(data) {
      if (!data.data.list.length) {
        return;
      }
      this.pageInfo.total = data.data.total;
      this.tableData = data.data.list;
    },
    resetData() {
      this.pageInfo = {
        pageNo: 1,
        pageSize: 10,
        pageSizes: [10, 30, 50],
        total: 0
      };
      this.tableData = []
      this.loadData()
    }
  }
};
</script>