webpackJsonp([8],{"+cGf":function(e,t,n){"use strict";function a(e){n("9GPD")}Object.defineProperty(t,"__esModule",{value:!0});var o=n("m+Pf"),r=n("m2E7"),i=n("/Xao"),s=a,d=i(o.a,r.a,!1,s,"data-v-167d6d34",null);t.default=d.exports},"9GPD":function(e,t,n){var a=n("B69K");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("8bSs")("741cd7ea",a,!0)},B69K:function(e,t,n){t=e.exports=n("BkJT")(!0),t.push([e.i,".project-manage[data-v-167d6d34]{padding:30px}.project-manage .project-manage-title[data-v-167d6d34]{margin-bottom:30px}.project-manage .manage-btn[data-v-167d6d34]{margin-right:10px}.project-manage .router-btn[data-v-167d6d34]{padding:5px 10px;border-radius:5px;border:1px solid #409eff}","",{version:3,sources:["D:/njh/token-exchange-protocol-interior-vue/src/views/projectManage/index.vue"],names:[],mappings:"AACA,iCACE,YAAc,CACf,AACD,uDACI,kBAAoB,CACvB,AACD,6CACI,iBAAmB,CACtB,AACD,6CACI,iBAAkB,AAClB,kBAAmB,AACnB,wBAA0B,CAC7B",file:"index.vue",sourcesContent:["\n.project-manage[data-v-167d6d34] {\n  padding: 30px;\n}\n.project-manage .project-manage-title[data-v-167d6d34] {\n    margin-bottom: 30px;\n}\n.project-manage .manage-btn[data-v-167d6d34] {\n    margin-right: 10px;\n}\n.project-manage .router-btn[data-v-167d6d34] {\n    padding: 5px 10px;\n    border-radius: 5px;\n    border: 1px solid #409eff;\n}\n"],sourceRoot:""}])},"m+Pf":function(e,t,n){"use strict";var a=n("3cXf"),o=n.n(a),r=n("4YfN"),i=n.n(r),s=n("9rMa");t.a={name:"projectIndex",data:function(){return{listLoading:!1,pageNum:1,toFlag:!1,toId:""}},mounted:function(){this.getProList("pageNum=1&pageSize=10&orderBy=created_at desc")},computed:i()({},Object(s.b)({projectList:"projectList",projectInfo:"projectInfo"})),methods:{handleCurrentChange:function(e){this.pageNum=e,this.getProList("pageNum="+e+"&pageSize=10&orderBy=created_at desc")},getProList:function(e){var t=this;this.listLoading=!0,this.$store.dispatch("getProjectList",e).then(function(){t.listLoading=!1}).catch(function(e){t.listLoading=!1,t.$message.error(e)})},toEdit:function(e){var t=this;this.toFlag=!0,this.toId=e,this.$store.dispatch("getProjectInfo",e).then(function(){var n=o()(t.projectInfo),a=JSON.parse(n),r={};r.white={name:a.whitePaperName,url:a.whitePaperAddress},r.introduction={name:a.projectImageName,url:a.projectImageAddress},r.leader={name:a.leaderImageName,url:a.leaderImageAddress},r.cover={name:a.projectCoverName,url:a.projectCoverAddress},t.toFlag=!1,window.sessionStorage.setItem("fileList",o()(r)),t.$router.push({path:"projectEdit",query:{id:e}})}).catch(function(e){t.toFlag=!1,t.$message.error(e)})},deleteHandler:function(e){var t=this;this.$confirm("此操作将永久删除该项目, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$store.dispatch("deleteProHandler",e).then(function(){t.getProList("pageNum=1&pageSize=10&orderBy=created_at desc"),t.$message({type:"success",message:"删除成功!"})}).catch(function(e){t.$message.error(e)})}).catch(function(){})},showHandler:function(e){var t=this;this.$store.dispatch("putProHandler",e).then(function(){t.getProList("pageNum=1&pageSize=10&orderBy=created_at desc")}).catch(function(e){t.$message.error(e)})},sendTokenFun:function(e){var t=this;this.$store.dispatch("sendTokenHandler",e).then(function(){t.$message.success("发币成功"),t.getProList("pageNum=1&pageSize=10&orderBy=created_at desc")}).catch(function(e){t.$message.error(e)})},retireFun:function(e){var t=this;this.$store.dispatch("retireHandler",e).then(function(){t.$message.success("清退成功"),t.getProList("pageNum=1&pageSize=10&orderBy=created_at desc")}).catch(function(e){t.$message.error(e)})}}}},m2E7:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"project-manage"},[n("div",{staticClass:"project-manage-title"},[n("router-link",{staticClass:"router-btn",attrs:{to:{path:"addProject"}}},[e._v("新建项目")])],1),e._v(" "),n("div",[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.projectList.list,border:""}},[n("el-table-column",{attrs:{prop:"title",label:"项目名",width:"150"}}),e._v(" "),n("el-table-column",{attrs:{label:"时间段"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.startTime)+"至"+e._s(t.row.stopTime))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("router-link",{staticClass:"manage-btn",attrs:{to:{path:"projectData",query:{id:t.row.id}}}},[e._v("项目数据")]),e._v(" "),n("el-button",{directives:[{name:"loading",rawName:"v-loading",value:e.toFlag&&e.toId===t.row.id,expression:"toFlag && toId === scope.row.id"}],staticClass:"manage-btn",attrs:{"element-loading-text":"正在跳转",type:"text"},on:{click:function(n){e.toEdit(t.row.id)}}},[e._v("项目编辑")])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-dropdown",[n("span",{staticClass:"el-dropdown-link"},[e._v("\n              下拉菜单"),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{directives:[{name:"show",rawName:"v-show",value:0===t.row.needShow,expression:"scope.row.needShow === 0"}],nativeOn:{click:function(n){e.showHandler({id:t.row.id,show:1})}}},[e._v("展示开启")]),e._v(" "),n("el-dropdown-item",{directives:[{name:"show",rawName:"v-show",value:0!==t.row.needShow,expression:"scope.row.needShow !== 0"}],nativeOn:{click:function(n){e.showHandler({id:t.row.id,show:0})}}},[e._v("展示关闭")]),e._v(" "),n("el-dropdown-item",{attrs:{disabled:!(2===t.row.status&&0===t.row.sendToken)},nativeOn:{click:function(n){e.sendTokenFun({id:t.row.id,send:1})}}},[e._v("项目发币")]),e._v(" "),n("el-dropdown-item",{attrs:{disabled:!(2===t.row.status&&0===t.row.retire)},nativeOn:{click:function(n){e.retireFun({id:t.row.id,retire:1})}}},[e._v("项目清退")]),e._v(" "),n("el-dropdown-item",{attrs:{disabled:!(0===t.row.status||1===t.row.sendToken)},nativeOn:{click:function(n){e.deleteHandler(t.row.id)}}},[e._v("删除项目")])],1)],1)]}}])})],1),e._v(" "),n("div",{staticStyle:{"margin-top":"30px","text-align":"center"}},[n("el-pagination",{attrs:{"page-size":10,layout:"prev, pager, next, jumper",total:e.projectList.total},on:{"current-change":e.handleCurrentChange}})],1)],1)])},o=[],r={render:a,staticRenderFns:o};t.a=r}});
//# sourceMappingURL=8.926f2b5d0bc264a1720d.js.map