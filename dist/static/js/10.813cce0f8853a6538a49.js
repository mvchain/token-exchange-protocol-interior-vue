webpackJsonp([10],{"/Gi7":function(t,e,a){e=t.exports=a("BkJT")(!0),e.push([t.i,".setting-con[data-v-4e36f557]{padding:30px}.setting-con .setting-grid[data-v-4e36f557]{padding:15px 0;line-height:30px;border-bottom:1px solid #ddd}.setting-con .label-switch[data-v-4e36f557]{position:relative;top:4px}","",{version:3,sources:["D:/njh/token-exchange-protocol-interior-vue/src/views/backSetting/index.vue"],names:[],mappings:"AACA,8BACE,YAAc,CACf,AACD,4CACI,eAAgB,AAChB,iBAAkB,AAClB,4BAA8B,CACjC,AACD,4CACI,kBAAmB,AACnB,OAAS,CACZ",file:"index.vue",sourcesContent:["\n.setting-con[data-v-4e36f557] {\n  padding: 30px;\n}\n.setting-con .setting-grid[data-v-4e36f557] {\n    padding: 15px 0;\n    line-height: 30px;\n    border-bottom: 1px solid #ddd;\n}\n.setting-con .label-switch[data-v-4e36f557] {\n    position: relative;\n    top: 4px;\n}\n"],sourceRoot:""}])},KRLD:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"setting-con"},t._l(t.tokenConfig,function(e,s){return a("el-row",{key:s,staticClass:"setting-grid",attrs:{gutter:24}},[a("el-col",{attrs:{span:2}},[a("div",{staticClass:"bg-purple"},[t._v("\n        "+t._s(e.tokenName)+"\n      ")])]),t._v(" "),a("el-col",{attrs:{span:4}},[a("div",{staticClass:"bg-purple"},[a("span",{staticClass:"label-switch"},[t._v("充提:")]),t._v(" "),a("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-text":"开","inactive-text":"关"},model:{value:e.rechargeStatus,callback:function(a){t.$set(e,"rechargeStatus",a)},expression:"v.rechargeStatus"}})],1)]),t._v(" "),a("el-col",{attrs:{span:4}},[a("div",{staticClass:"bg-purple"},[a("span",{staticClass:"label-switch"},[t._v("提现:")]),t._v(" "),a("el-switch",{attrs:{"active-value":1,"inactive-value":0,"active-text":"开","inactive-text":"关"},model:{value:e.withdrawStatus,callback:function(a){t.$set(e,"withdrawStatus",a)},expression:"v.withdrawStatus"}})],1)]),t._v(" "),a("el-col",{attrs:{span:4}},[a("div",{staticClass:"bg-purple"},[a("el-col",{staticClass:"label-switch",attrs:{span:12}},[t._v("最小提现金额:")]),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-input",{attrs:{placeholder:"最小提现金额"},model:{value:e.min,callback:function(a){t.$set(e,"min",a)},expression:"v.min"}})],1)],1)]),t._v(" "),a("el-col",{attrs:{span:5}},[a("div",{staticClass:"bg-purple"},[a("el-col",{staticClass:"label-switch",attrs:{span:12}},[t._v("单日提币上限:")]),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-input",{attrs:{placeholder:"单日提币上限"},model:{value:e.max,callback:function(a){t.$set(e,"max",a)},expression:"v.max"}})],1)],1)]),t._v(" "),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"bg-purple"},[a("el-col",{staticClass:"label-switch",attrs:{span:10}},[t._v("手续费:")]),t._v(" "),a("el-col",{attrs:{span:14}},[a("el-input",{attrs:{placeholder:"手续费"},model:{value:e.poundage,callback:function(a){t.$set(e,"poundage",a)},expression:"v.poundage"}})],1)],1)]),t._v(" "),a("el-col",{attrs:{span:1}},[a("div",{staticClass:"bg-purple"},[a("el-button",{on:{click:function(e){t.subModify(s)}}},[t._v("保存")])],1)])],1)}))},n=[],i={render:s,staticRenderFns:n};e.a=i},"n+PN":function(t,e,a){var s=a("/Gi7");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);a("8bSs")("0131406e",s,!0)},po7y:function(t,e,a){"use strict";function s(t){a("n+PN")}Object.defineProperty(e,"__esModule",{value:!0});var n=a("wo7Z"),i=a("KRLD"),o=a("/Xao"),l=s,c=o(n.a,i.a,!1,l,"data-v-4e36f557",null);e.default=c.exports},wo7Z:function(t,e,a){"use strict";var s=a("4YfN"),n=a.n(s),i=a("9rMa");e.a={name:"setting",data:function(){return{}},mounted:function(){this.getConfig()},computed:n()({},Object(i.b)({tokenConfig:"tokenConfig"})),methods:{getConfig:function(){var t=this;this.$store.dispatch("tokenConfigHandler").then(function(){}).catch(function(e){t.$message.error(e)})},subModify:function(t){var e=this;this.$store.dispatch("modifyTokenConfigHandler",this.tokenConfig[t]).then(function(){e.$message.success("修改成功")}).catch(function(t){e.$message.error(t)})}}}}});
//# sourceMappingURL=10.813cce0f8853a6538a49.js.map