webpackJsonp([5],{"M/WV":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"user-list"},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.userList.list}},[n("el-table-column",{attrs:{prop:"id",label:"UID"}}),e._v(" "),n("el-table-column",{attrs:{prop:"username",label:"邮箱"}}),e._v(" "),n("el-table-column",{attrs:{prop:"phone",label:"手机号"}}),e._v(" "),n("el-table-column",{attrs:{prop:"orderNum",label:"订单数"}}),e._v(" "),n("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-dropdown",[n("span",{staticClass:"el-dropdown-link"},[e._v("\n            操作"),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{nativeOn:{click:function(n){e.operaRequest(t.row.id)}}},[e._v("用户详情")])],1)],1)]}}])})],1),e._v(" "),n("div",{staticStyle:{"margin-top":"30px","text-align":"center"}},[n("el-pagination",{attrs:{"page-size":10,layout:"prev, pager, next, jumper",total:e.userList.total},on:{"current-change":e.handleCurrentChange}})],1)],1)},r=[],s={render:a,staticRenderFns:r};t.a=s},VFU3:function(e,t,n){var a=n("W6QC");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("8bSs")("727cdae9",a,!0)},W6QC:function(e,t,n){t=e.exports=n("BkJT")(!0),t.push([e.i,".user-list[data-v-2f546dfe]{padding:30px}","",{version:3,sources:["D:/njh/token-exchange-protocol-interior-vue/src/views/userManage/basicInfo/index.vue"],names:[],mappings:"AACA,4BACE,YAAc,CACf",file:"index.vue",sourcesContent:["\n.user-list[data-v-2f546dfe] {\n  padding: 30px;\n}\n"],sourceRoot:""}])},sapI:function(e,t,n){"use strict";var a=n("4YfN"),r=n.n(a),s=n("9rMa");t.a={name:"basicInfo",data:function(){return{pageNum:1}},computed:r()({},Object(s.b)({userList:"userList"})),mounted:function(){this.getList("pageNum=1&pageSize=11&orderBy=created_at desc")},methods:{operaRequest:function(e){this.$router.push({path:"userInfo",query:{id:e}})},handleCurrentChange:function(e){this.pageNum=e,this.getList("pageNum="+e+"&pageSize=10&orderBy=created_at desc")},getList:function(e){var t=this;this.$store.dispatch("orderHandler",e).then(function(){}).catch(function(e){t.$message.error(e)})}}}},t9Sp:function(e,t,n){"use strict";function a(e){n("VFU3")}Object.defineProperty(t,"__esModule",{value:!0});var r=n("sapI"),s=n("M/WV"),o=n("/Xao"),i=a,l=o(r.a,s.a,!1,i,"data-v-2f546dfe",null);t.default=l.exports}});
//# sourceMappingURL=5.1312411ead014f2857fd.js.map