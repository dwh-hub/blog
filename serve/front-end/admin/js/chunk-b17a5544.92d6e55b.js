(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b17a5544"],{"3bf4":function(t,e,a){"use strict";var n,i,o={data:function(){return{tableData:[],pageInfo:{pageNo:1,pageSize:10,pageSizes:[10,30,50],total:0}}},created:function(){this.loadData()},methods:{handleData:function(t){t.data.list.length&&(this.pageInfo.total=t.data.total,this.tableData=t.data.list)},resetData:function(){this.pageInfo={pageNo:1,pageSize:10,pageSizes:[10,30,50],total:0},this.tableData=[],this.loadData()}}},s=o,r=a("2877"),l=Object(r["a"])(s,n,i,!1,null,null,null);e["a"]=l.exports},"490d":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"add-list"},[a("h1",[t._v("标签列表")]),a("page-table",{attrs:{data:t.tableData,paging:t.pageInfo},on:{pageChange:t.loadData}},[a("el-table-column",{attrs:{label:"id",prop:"_id"}}),a("el-table-column",{attrs:{label:"上级标签",prop:"parent.name"}}),a("el-table-column",{attrs:{label:"标签名",prop:"name"}}),a("el-table-column",{attrs:{align:"right"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(a){return t.$router.push("/tag/edit/"+e.row._id)}}},[t._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(a){return t.deleteTag(e.$index,e.row)}}},[t._v("删除")])]}}])})],1)],1)},i=[],o=(a("7f7f"),a("96cf"),a("3b8d")),s=a("e3d9"),r=a("3bf4"),l={data:function(){return{}},components:{pageTable:s["a"]},mixins:[r["a"]],methods:{loadData:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$api.tag.fetchTagList({pageNo:this.pageInfo.pageNo,pageSize:this.pageInfo.pageSize});case 2:e=t.sent,this.handleData(e);case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),editTag:function(t,e){var a=this;this.$prompt("请输入修改后的标签名","编辑",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(t){var n=t.value;a.$api.tag.editTag({_id:e._id,name:n}).then(function(t){a.$message({type:"success",message:t.message}),a.loadData()})}).catch(function(){a.$message({type:"info",message:"取消输入"})})},deleteTag:function(t,e){var a=this;this.$confirm('是否删除标签 "'.concat(e.name,'"?'),"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.$api.tag.deleteTag({_id:e._id}).then(function(t){a.$message({type:"success",message:t.message}),a.loadData()})}).catch()}}},g=l,c=a("2877"),u=Object(c["a"])(g,n,i,!1,null,null,null);e["default"]=u.exports},"7f7f":function(t,e,a){var n=a("86cc").f,i=Function.prototype,o=/^\s*function ([^ (]*)/,s="name";s in i||a("9e1e")&&n(i,s,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(t){return""}}})},bd14:function(t,e,a){"use strict";var n=a("ef7b"),i=a.n(n);i.a},e3d9:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-table"},[a("el-row",{attrs:{type:"flex",justify:"center"}},[a("el-col",{attrs:{span:24}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.tableLoading,expression:"tableLoading"}],attrs:{data:t.data,"max-height":t.maxHeight,height:t.height,"element-loading-text":"拼命加载中...",stripe:t.stripe}},[t.showIndex?a("el-table-column",{attrs:{type:"index",width:"50"}}):t._e(),t._t("default")],2)],1)],1),t.hasPagination?a("el-row",[a("el-col",{attrs:{span:24}},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next, total, sizes",total:t.paging.total,"current-page":t.paging.pageNo,"page-sizes":t.paging.pageSizes,"page-size":t.paging.pageSize},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1):t._e()],1)},i=[],o={name:"pageTable",props:{data:{type:Array,default:function(){return[]}},maxHeight:String,height:String,stripe:{type:Boolean,default:!0},showIndex:{type:Boolean,default:!1},hasPagination:{type:Boolean,default:!0},paging:{type:Object,default:function(){return{pageNo:1,pageSize:10,pageSizes:[10,30,50],total:0}}}},data:function(){return{tableLoading:!1}},methods:{handleCurrentChange:function(t){this.paging.pageNo!=t&&(this.paging.pageNo=t,this.$emit("pageChange"))},handleSizeChange:function(t){this.paging.pageSize!=t&&(this.paging.pageSize=t,this.$emit("pageChange"))}}},s=o,r=(a("bd14"),a("2877")),l=Object(r["a"])(s,n,i,!1,null,null,null);e["a"]=l.exports},ef7b:function(t,e,a){}}]);
//# sourceMappingURL=chunk-b17a5544.92d6e55b.js.map