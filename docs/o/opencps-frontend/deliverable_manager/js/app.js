(function(e){function t(t){for(var n,r,s=t[0],l=t[1],c=t[2],d=0,p=[];d<s.length;d++)r=s[d],o[r]&&p.push(o[r][0]),o[r]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);u&&u(t);while(p.length)p.shift()();return i.push.apply(i,c||[]),a()}function a(){for(var e,t=0;t<i.length;t++){for(var a=i[t],n=!0,s=1;s<a.length;s++){var l=a[s];0!==o[l]&&(n=!1)}n&&(i.splice(t--,1),e=r(r.s=a[0]))}return e}var n={},o={app:0},i=[];function r(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=n,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=l;i.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"146f":function(module,__webpack_exports__,__webpack_require__){"use strict";var _DatetimePicker_vue__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("fa98");__webpack_exports__["a"]={props:["id"],components:{DatetimePicker:_DatetimePicker_vue__WEBPACK_IMPORTED_MODULE_0__["a"]},data:function(){return{config:{},pullOk:!0,pullCounter:0,valid:!0,loading:!1,data:{},dataSocket:{},cmOptions:{tabSize:4,mode:"text/javascript",theme:"base16-light",lineNumbers:!0,line:!0},rules:{required:function(e){return!!e||"Bắt buộc phải nhập."},number:function(e){var t=/^\d+$/;return t.test(e)||"Bắt buộc phải nhập kiểu số."},email:function(e){var t=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(e)||"Sai định dạng thư điện tử."}}}},computed:{detailForm:function detailForm(){return eval("( "+this.$store.getters.getContentFile+" )")}},methods:{clearLoading:function(){this.loading=!1},processRules:function processRules(rulesStr){return eval("( "+rulesStr+" )")},processChangeDataSource:function(e,t){var a=this;t.hasOwnProperty("concatina")&&(a.pullOk=!1,a.pullCounter=a.pullCounter+1,a.$socket.sendObj({type:"api",cmd:"get",respone:t.concatina["datasource_key"],api:t.concatina["datasource_api"]+"?"+t.concatina["query"]+"="+e,headers:{Token:a.getAuthToken(),groupId:a.getScopeGroupId(),USER_ID:a.getUserId()}}))},processDataSourceVerify:function(){var e=this;for(var t in e.detailForm)e.detailForm[t].hasOwnProperty("datasource_api")&&e.detailForm[t].hasOwnProperty("datasource_key")&&e.data.hasOwnProperty(e.detailForm[t]["model"])&&String(e.data[e.detailForm[t]["model"]]).startsWith("[")&&(e.data[e.detailForm[t]["model"]]=JSON.parse(e.data[e.detailForm[t]["model"]]))},processDataSource:function(){var e=this;for(var t in e.detailForm)if(e.detailForm[t].hasOwnProperty("datasource_api")&&e.detailForm[t].hasOwnProperty("datasource_key")){e.pullOk=!1,e.pullCounter=e.pullCounter+1;var a=e.detailForm[t]["datasource_api"];e.detailForm[t]["dependency"]&&e.detailForm[t].hasOwnProperty("pk")&&(a=a+"?pk="+e.id+"&col="+e.detailForm[t]["pk"]),e.$socket.sendObj({type:"api",cmd:"get",respone:e.detailForm[t]["datasource_key"],api:a,headers:{Token:e.getAuthToken(),groupId:e.getScopeGroupId(),USER_ID:e.getUserId()}})}}}}},"1a0d":function(e,t,a){"use strict";var n=a("d593"),o=a.n(n);o.a},"2af9":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[null!==e.detailForm&&e.detailForm.length>0?a("v-layout",{staticStyle:{"margin-bottom":"100px"},attrs:{row:"",wrap:""}},e._l(e.detailForm,function(t,n){return a("v-flex",{key:n,class:t["class"]},["avatar"===t.type?a("attached-file-avatar",{attrs:{pk:e.data[t.model],"pick-item":t,"current-data":e.data}}):e._e(),"date"===t.type?a("datetime-picker",{class:t["class_component"],attrs:{item:t,"data-value":e.data[t.model]},model:{value:e.data[t.model],callback:function(a){e.$set(e.data,t.model,a)},expression:"data[item.model]"}}):e._e(),"button"===t.type&&t["link"]&&(t.dependency&&"0"!==String(e.id)||!t.dependency)?a("v-btn",{class:t["class_component"],attrs:{color:"blue darken-3",dark:"",to:t.url+"?pk="+e.data[t.pk]+"&col="+t.pk}},["link"===t["btn_type"]?a("v-icon",{staticClass:"mr-1",attrs:{size:"14"}},[e._v("how_to_vote")]):e._e(),"popup"===t["btn_type"]?a("v-icon",{staticClass:"mr-1",attrs:{size:"14"}},[e._v("flip_to_back")]):e._e(),e._v("\n        "+e._s(t.label)+"\n      ")],1):e._e(),"button"===t.type&&t["account"]&&(t.dependency&&"0"!==String(e.id)||!t.dependency)?a("v-btn",{class:t["class_component"],attrs:{color:"blue darken-3",dark:""},nativeOn:{click:function(a){e.showAccount(t)}}},["link"===t["btn_type"]?a("v-icon",{staticClass:"mr-1",attrs:{size:"14"}},[e._v("how_to_vote")]):e._e(),"popup"===t["btn_type"]?a("v-icon",{staticClass:"mr-1",attrs:{size:"14"}},[e._v("flip_to_back")]):e._e(),e._v("\n        "+e._s(t.label)+"\n      ")],1):e._e(),"button"===t.type&&t["attached"]&&(t.dependency&&"0"!==String(e.id)||!t.dependency)?a("v-btn",{class:t["class_component"],attrs:{color:"blue darken-3",dark:""},nativeOn:{click:function(a){e.showAttached(t)}}},["link"===t["btn_type"]?a("v-icon",{staticClass:"mr-1",attrs:{size:"14"}},[e._v("how_to_vote")]):e._e(),"popup"===t["btn_type"]?a("v-icon",{staticClass:"mr-1",attrs:{size:"14"}},[e._v("flip_to_back")]):e._e(),e._v("\n        "+e._s(t.label)+"\n      ")],1):e._e(),"button"===t.type&&t["fileform"]&&(t.dependency&&"0"!==String(e.id)||!t.dependency)?a("v-btn",{class:t["class_component"],attrs:{color:"blue darken-3",dark:""},nativeOn:{click:function(a){e.showAttached(t)}}},["link"===t["btn_type"]?a("v-icon",{staticClass:"mr-1",attrs:{size:"14"}},[e._v("how_to_vote")]):e._e(),"popup"===t["btn_type"]?a("v-icon",{staticClass:"mr-1",attrs:{size:"14"}},[e._v("flip_to_back")]):e._e(),e._v("\n        "+e._s(t.label)+"\n      ")],1):e._e(),"selects"===t.type&&!e.pullOk&&t.hasOwnProperty("datasource_key")?a("content-placeholders",[a("content-placeholders-text",{attrs:{lines:1}})],1):e._e(),"selects"===t.type&&e.pullOk&&t.hasOwnProperty("datasource_key")?a("v-autocomplete",{class:t["class_component"],attrs:{items:e.dataSocket[t["datasource_key"]],"item-text":t.itemText,"item-value":t.itemValue,box:"",label:t.required?t["label"]+" 💥":t["label"],rules:e.processRules(t.rules),"no-data-text":"Không tìm thấy dữ liệu "+t["label"],chips:t["chips"],multiple:t["multiple"],clearable:""},on:{change:function(a){e.processChangeDataSource(a,t)}},model:{value:e.data[t.model],callback:function(a){e.$set(e.data,t.model,a)},expression:"data[item.model]"}}):e._e(),"selects"!==t.type||t.hasOwnProperty("datasource_key")?e._e():a("v-autocomplete",{class:t["class_component"],attrs:{items:t.datasource,"item-text":t.itemText,"item-value":t.itemValue,box:"",label:t.required?t["label"]+" 💥":t["label"],rules:e.processRules(t.rules),"no-data-text":"Không tìm thấy dữ liệu "+t["label"],chips:t["chips"],multiple:t["multiple"],clearable:""},on:{change:function(a){e.processChangeDataSource(a,t)}},model:{value:e.data[t.model],callback:function(a){e.$set(e.data,t.model,a)},expression:"data[item.model]"}}),"text-fields"===t.type?a("v-text-field",{class:t["class_component"],attrs:{label:t.required?t["label"]+" 💥":t["label"],rules:e.processRules(t.rules),placeholder:t["placeholder"],box:"",clearable:""},model:{value:e.data[t.model],callback:function(a){e.$set(e.data,t.model,a)},expression:"data[item.model]"}}):e._e(),"textarea"===t.type?a("v-textarea",{class:t["class_component"],attrs:{label:t.required?t["label"]+" 💥":t["label"],rules:e.processRules(t.rules),placeholder:t["placeholder"],box:"",clearable:""},model:{value:e.data[t.model],callback:function(a){e.$set(e.data,t.model,a)},expression:"data[item.model]"}}):e._e(),"codemirror"===t.type?a("v-subheader",{staticClass:"px-0"},[e._v(e._s(t["label"]))]):e._e(),"codemirror"===t.type?a("codemirror",{attrs:{options:e.cmOptions},model:{value:e.data[t.model],callback:function(a){e.$set(e.data,t.model,a)},expression:"data[item.model]"}}):e._e(),"v-switch"===t.type?a("v-switch",{class:t["class_component"],attrs:{label:t["label"]},model:{value:e.data[t.model],callback:function(a){e.$set(e.data,t.model,a)},expression:"data[item.model]"}}):e._e(),e._l(t["alongside"],function(n,o){return t.hasOwnProperty("alongside")?a("div",{key:o},["avatar"===n.type?a("attached-file-avatar",{class:n["class_component"],attrs:{pk:e.data[n.model],"pick-item":n}}):e._e(),"date"===n.type?a("datetime-picker",{class:n["class_component"],attrs:{item:n,"data-value":e.data[n.model]},model:{value:e.data[n.model],callback:function(t){e.$set(e.data,n.model,t)},expression:"data[itemChild.model]"}}):e._e(),"button"===n.type&&n["link"]&&(n.dependency&&"0"!==String(e.id)||!n.dependency)?a("v-btn",{class:n["class_component"],attrs:{color:"blue darken-3",dark:"",to:n.url+"?pk="+e.data[n.pk]+"&col="+n.pk}},["link"===n["btn_type"]?a("v-icon",{staticClass:"mr-1",attrs:{size:"14"}},[e._v("how_to_vote")]):e._e(),"popup"===n["btn_type"]?a("v-icon",{staticClass:"mr-1",attrs:{size:"14"}},[e._v("flip_to_back")]):e._e(),e._v("\n          "+e._s(n.label)+"\n        ")],1):e._e(),"button"===n.type&&n["account"]&&(n.dependency&&"0"!==String(e.id)||!n.dependency)?a("v-btn",{class:n["class_component"],attrs:{color:"blue darken-3",dark:""},nativeOn:{click:function(t){e.showAccount(n)}}},["link"===n["btn_type"]?a("v-icon",{staticClass:"mr-1",attrs:{size:"14"}},[e._v("how_to_vote")]):e._e(),"popup"===n["btn_type"]?a("v-icon",{staticClass:"mr-1",attrs:{size:"14"}},[e._v("flip_to_back")]):e._e(),e._v("\n          "+e._s(n.label)+"\n        ")],1):e._e(),"button"===n.type&&n["attached"]&&(n.dependency&&"0"!==String(e.id)||!n.dependency)?a("v-btn",{class:n["class_component"],attrs:{color:"blue darken-3",dark:""},nativeOn:{click:function(t){e.showAttached(n)}}},["link"===n["btn_type"]?a("v-icon",{staticClass:"mr-1",attrs:{size:"14"}},[e._v("how_to_vote")]):e._e(),"popup"===n["btn_type"]?a("v-icon",{staticClass:"mr-1",attrs:{size:"14"}},[e._v("flip_to_back")]):e._e(),e._v("\n          "+e._s(n.label)+"\n        ")],1):e._e(),"selects"===n.type&&!e.pullOk&&n.hasOwnProperty("datasource_key")?a("content-placeholders",[a("content-placeholders-text",{attrs:{lines:1}})],1):e._e(),"selects"===n.type&&e.pullOk&&n.hasOwnProperty("datasource_key")?a("v-autocomplete",{class:n["class_component"],attrs:{items:e.dataSocket[n["datasource_key"]],"item-text":n.itemText,"item-value":n.itemValue,box:"",label:n.required?n["label"]+" 💥":n["label"],rules:e.processRules(n.rules),"no-data-text":"Không tìm thấy dữ liệu "+n["label"],chips:t["chips"],multiple:t["multiple"],clearable:""},on:{change:function(t){e.processChangeDataSource(t,n)}},model:{value:e.data[n.model],callback:function(t){e.$set(e.data,n.model,t)},expression:"data[itemChild.model]"}}):e._e(),"selects"!==n.type||n.hasOwnProperty("datasource_key")?e._e():a("v-autocomplete",{class:n["class_component"],attrs:{items:n.datasource,"item-text":n.itemText,"item-value":n.itemValue,box:"",label:n.required?n["label"]+" 💥":n["label"],rules:e.processRules(n.rules),"no-data-text":"Không tìm thấy dữ liệu "+n["label"],chips:t["chips"],multiple:t["multiple"],clearable:""},on:{change:function(t){e.processChangeDataSource(t,n)}},model:{value:e.data[n.model],callback:function(t){e.$set(e.data,n.model,t)},expression:"data[itemChild.model]"}}),"text-fields"===n.type?a("v-text-field",{class:n["class_component"],attrs:{label:n.required?n["label"]+" 💥":n["label"],rules:e.processRules(n.rules),placeholder:n["placeholder"],box:"",clearable:""},model:{value:e.data[n.model],callback:function(t){e.$set(e.data,n.model,t)},expression:"data[itemChild.model]"}}):e._e(),"textarea"===n.type?a("v-textarea",{class:n["class_component"],attrs:{label:n.required?n["label"]+" 💥":n["label"],rules:e.processRules(n.rules),placeholder:n["placeholder"],box:"",clearable:""},model:{value:e.data[n.model],callback:function(t){e.$set(e.data,n.model,t)},expression:"data[itemChild.model]"}}):e._e(),"codemirror"===n.type?a("v-subheader",{staticClass:"px-0"},[e._v(e._s(n["label"]))]):e._e(),"codemirror"===n.type?a("codemirror",{attrs:{options:e.cmOptions},model:{value:e.data[n.model],callback:function(t){e.$set(e.data,n.model,t)},expression:"data[itemChild.model]"}}):e._e(),"v-switch"===n.type?a("v-switch",{class:n["class_component"],attrs:{label:n["label"]},model:{value:e.data[n.model],callback:function(t){e.$set(e.data,n.model,t)},expression:"data[itemChild.model]"}}):e._e()],1):e._e()})],2)})):a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{xs12:""}},[a("div",{staticClass:"video-preloader",attrs:{id:"video-preloader"}},[a("video",{attrs:{loop:"",id:"editor-video-preloader",width:"100%",height:"350",muted:"true",src:"https://editorassets.parastorage.com/video-preloader/editor-video-preloader-2-@2x.mp4"},domProps:{muted:!0}})])])],1)],1)},o=[],i=a("146f"),r=i["a"],s=a("2877"),l=Object(s["a"])(r,n,o,!1,null,null,null);l.options.__file="BbatTableEditorComponent.vue";var c=l.exports,u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticStyle:{"text-align":"left",position:"absolute","line-height":"46px"}},[e._v("Tổng số "),a("span",{staticClass:"text-bold primary--text"},[e._v(e._s(e.total))]),e._v(" bản ghi. ")]),e.total>0?a("div",{staticClass:"vue-tiny-pagination pagination layout",staticStyle:{"justify-content":"flex-end","-webkit-justify-content":"flex-end"}},[a("div",{staticClass:"px-3 xs2 flex"},[a("v-autocomplete",{attrs:{items:e.totalPagesData,"item-text":"text","item-value":"value",autocomplete:""},on:{input:e.goToPage},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1),a("ul",{staticClass:"tiny-pagination",class:e.customClass},[a("li",{staticClass:"page-item",class:e.classFirstPage},[a("button",{staticClass:"pagination__navigation",class:e.classFirstPage,on:{click:function(t){return t.preventDefault(),e.lastPageLast(t)}}},[a("i",{staticClass:"material-icons icon",attrs:{"aria-hidden":"true"}},[e._v("first_page")])])]),a("li",{staticClass:"page-item",class:e.classFirstPage},[a("button",{staticClass:"pagination__navigation",class:e.classFirstPage,staticStyle:{"border-left":"0"},on:{click:function(t){return t.preventDefault(),e.lastPage(t)}}},[a("i",{staticClass:"material-icons icon",attrs:{"aria-hidden":"true"}},[e._v("chevron_left")])])]),a("li",{staticClass:"page-item",class:e.classLastPage,staticStyle:{"margin-right":"0"}},[a("button",{staticClass:"pagination__navigation",class:e.classLastPage,staticStyle:{"border-left":"0"},on:{click:function(t){return t.preventDefault(),e.nextPage(t)}}},[a("i",{staticClass:"material-icons icon",attrs:{"aria-hidden":"true"}},[e._v("chevron_right")])])]),a("li",{staticClass:"page-item",class:e.classLastPage},[a("button",{staticClass:"pagination__navigation",class:e.classLastPage,on:{click:function(t){return t.preventDefault(),e.nextPageLast(t)}}},[a("i",{staticClass:"material-icons icon",attrs:{"aria-hidden":"true"}},[e._v("last_page")])])])])]):e._e()])},d=[],p="TinyPagination",m={name:p,props:{total:{type:Number,required:!0},page:{type:Number,default:1},lang:{type:String,default:"en"},customClass:{type:String},limits:{type:Array,default:function(){return[10,15,20,50,100]}},showLimit:{type:Boolean,default:!0}},data:function(){return{version:"0.2.1",currentPage:1,currentLimit:10,translations:{en:{prev:"Previous",title:"Page",next:"Next"}},availableLanguages:["en"]}},created:function(){this.currentPage=this.page},watch:{page:function(e){this.currentPage=parseInt(e)}},computed:{translation:function(){return this.availableLanguages.includes(this.lang)?this.translations[this.lang]:this.translations["en"]},totalPages:function(){return Math.ceil(this.total/this.currentLimit)},totalPagesData:function(){for(var e=[],t={},a=1;a<=this.totalPages;++a)t={value:a,text:"Trang "+a},e.push(t);return e},titlePage:function(){return"".concat(this.currentPage)},classFirstPage:function(){return{"c-not-allowed pagination__navigation--disabled":1===this.currentPage}},classLastPage:function(){return{"c-not-allowed pagination__navigation--disabled":this.currentPage===this.totalPages}}},methods:{nextPage:function(){this.currentPage!==this.totalPages&&(this.currentPage+=1,this.$emit("tiny:change-page",{page:this.currentPage}))},lastPage:function(){this.currentPage>1&&(this.currentPage-=1,this.$emit("tiny:change-page",{page:this.currentPage}))},nextPageLast:function(){this.currentPage=this.totalPages,this.$emit("tiny:change-page",{page:this.totalPages})},lastPageLast:function(){this.currentPage=1,this.$emit("tiny:change-page",{page:1})},goToPage:function(){this.$emit("tiny:change-page",{page:this.currentPage})},onLimitChange:function(){this.currentPage=1}}},v=m,_=Object(s["a"])(v,u,d,!1,null,null,null);_.options.__file="TinyPagination.vue";var h=_.exports;a("fa98");a.d(t,"a",function(){return c}),a.d(t,"b",function(){return h})},"56d7":function(e,t,a){"use strict";a.r(t);var n=a("a026"),o=a("ce5b"),i=a.n(o);n["default"].use(i.a,{theme:{primary:"#212121",secondary:"#424242",accent:"#459fed",error:"#ff8e8e",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}});a("ca9a"),a("a51b"),a("c35c"),a("861c");var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",{attrs:{id:"app"}},[a("router-view"),a("go-top",{attrs:{size:42,"bg-color":"#0064c7"}})],1)},s=[],l=a("49ec"),c=a.n(l),u={props:["index"],data:function(){return{}},components:{GoTop:c.a},computed:{},methods:{}},d=u,p=a("2877"),m=Object(p["a"])(d,r,s,!1,null,null,null);m.options.__file="App.vue";var v=m.exports,_=a("8c4f"),h=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-navigation-drawer",{attrs:{fixed:"",app:"",width:"240"},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[a("v-list",{attrs:{dense:""}},e._l(e.items,function(t,n){return a("v-list-tile",{key:n,attrs:{to:"/danh-sach-giay-to/"+n}},[a("v-list-tile-action",[String(n)===String(e.index)?a("v-icon",{attrs:{color:"blue darken-3"}},[e._v("play_arrow")]):a("v-icon",[e._v("description")])],1),a("v-list-tile-content",[a("v-list-tile-title",[e._v(e._s(t.typeName))])],1)],1)}))],1),a("v-content",[a("router-view")],1),a("v-snackbar",{attrs:{bottom:!1,left:!1,"multi-line":!1,right:!0,timeout:2e3,top:!0,vertical:!1,color:"red darken-3"},model:{value:e.snackbarerror,callback:function(t){e.snackbarerror=t},expression:"snackbarerror"}},[e._v("\n    Yêu cầu thực hiện thất bại\n    "),a("v-btn",{attrs:{icon:""},on:{click:function(t){e.closeError()}}},[a("v-icon",[e._v("clear")])],1)],1),a("v-snackbar",{attrs:{bottom:!0,left:!1,"multi-line":!0,right:!1,timeout:0,top:!0,vertical:!1,color:"red darken-3"},model:{value:e.snackbarsocket,callback:function(t){e.snackbarsocket=t},expression:"snackbarsocket"}},[a("v-progress-circular",{attrs:{size:20,width:1,color:"white",indeterminate:""}}),e._v("\n     \n    Mất kết nối, tự động kết nối lại trong giây lát ... \n    \n    "),a("v-btn",{attrs:{icon:""},on:{click:function(t){e.reloadPage()}}},[a("v-icon",[e._v("replay")])],1)],1)],1)},f=[],g={props:["index"],data:function(){return{dialog:!1,drawer:null,dataSocket:{}}},computed:{items:function(){return this.$store.getters.getDeliverableTypes},snackbarerror:{get:function(){return this.$store.getters.getsnackbarerror},set:function(e){this.$store.commit("setsnackbarerror",e)}},snackbarsocket:{get:function(){return this.$store.getters.getsnackbarsocket},set:function(e){this.$store.commit("setsnackbarsocket",e)}}},methods:{redirectFilter:function(e){this.$router.push(e+"?state_change="+Math.floor(100*Math.random())+1)},closeError:function(){this.$store.commit("setsnackbarerror",!1)},reloadPage:function(){window.location.reload(!0)},deliverableRouter:function(e){console.log(e)}}},b=g,y=Object(p["a"])(b,h,f,!1,null,null,null);y.options.__file="Home.vue";var k=y.exports,w=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{fluid:""}},[e._v("\n    Not found\n")])},x=[],C={},D=C,P=(a("1a0d"),Object(p["a"])(D,w,x,!1,null,"6c946066",null));P.options.__file="NotFound.vue";var S=P.exports,O=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"row-header no__hidden_class"},[a("div",{staticClass:"background-triangle-big"},[a("span",[e._v(e._s(void 0!==e.items[e.index]?e.items[e.index]["typeName"]:""))])]),a("div",{staticClass:"layout row wrap header_tools row-blue"},[a("div",{staticClass:"flex pl-3 text-ellipsis text-bold",staticStyle:{position:"relative"}}),a("div",{staticClass:"flex text-right",staticStyle:{"margin-left":"auto","max-width":"50px"}},[a("v-btn",{staticClass:"my-0 mx-2",attrs:{icon:""}},[a("v-icon",{attrs:{size:"16"}},[e._v("filter_list")])],1)],1)])]),a("div",{staticStyle:{"text-align":"right"}},[a("v-btn",{attrs:{color:"blue darken-3",dark:"",to:"/danh-sach-giay-to/"+e.index+"/editor/0"}},[e._v("\n      Thêm giấy phép\n    ")])],1),a("v-data-table",{staticClass:"table-landing table-bordered",attrs:{headers:e.headers,items:e.hosoDatas,"total-items":e.hosoDatasTotal,"item-key":"deliverableId","no-data-text":"Không có giấy phép nào","hide-actions":""},scopedSlots:e._u([{key:"items",fn:function(t){return[a("tr",[a("td",{staticClass:"text-xs-center px-0 py-0"},[e.loadingTable?a("content-placeholders",[a("content-placeholders-text",{attrs:{lines:1}})],1):a("span",{staticStyle:{cursor:"pointer"},on:{click:function(a){e.viewDetail(t.item,t.index)}}},[e._v("\n            "+e._s(15*e.hosoDatasPage-15+t.index+1)+"\n          ")])],1),e._l(e.headers,function(n,o){return n.hasOwnProperty("value")?a("td",{key:o+"_"+t.item.deliverableId,class:n["class_column"]},[e.loadingTable?a("content-placeholders",[a("content-placeholders-text",{attrs:{lines:1}})],1):a("div",{class:{no_acction__event:!t.item["permission"]},staticStyle:{cursor:"pointer"},on:{click:function(a){e.viewDetail(t.item,t.index)}}},[n.hasOwnProperty("layout_view")?a("template-rendering",{attrs:{item:t.item,layout_view:n.layout_view}}):a("span",[e._v("\n              "+e._s(t.item[n.value])+"\n            ")])],1)],1):e._e()}),e.hideAction?e._e():a("td",{staticClass:"text-xs-center px-0 py-0"},[e.loadingTable?a("content-placeholders",[a("content-placeholders-text",{attrs:{lines:1}})],1):e._e(),e._v("\n          pdf\n        ")],1)],2)]}}]),model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}}),a("div",{staticClass:"text-xs-right layout wrap",staticStyle:{position:"relative"}},[a("div",{staticClass:"flex pagging-table px-2"},[a("tiny-pagination",{attrs:{total:e.hosoDatasTotal,page:e.hosoDatasPage,"custom-class":"custom-tiny-class"},on:{"tiny:change-page":e.paggingData}})],1)])],1)},T=[],E=a("d3a7"),$=E["a"],F=Object(p["a"])($,O,T,!1,null,null,null);F.options.__file="DeliverableList.vue";var I=F.exports,R=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"row-header no__hidden_class"},[a("div",{staticClass:"background-triangle-big"},[a("span",[e._v(e._s(void 0!==e.items[e.index]?e.items[e.index]["typeName"]:""))])]),a("div",{staticClass:"layout row wrap header_tools row-blue"},[a("div",{staticClass:"flex pl-3 text-ellipsis text-bold",staticStyle:{position:"relative"}}),a("div",{staticClass:"flex xs4 sm2 text-right",staticStyle:{"margin-left":"auto"}},[a("v-btn",{staticClass:"my-0 mx-0 btn-border-left",attrs:{flat:"","active-class":"temp_active"},on:{click:e.goBack}},[e._v("\n          Quay lại  \n          "),a("v-icon",{attrs:{size:"16"}},[e._v("undo")])],1)],1)])]),a("bbat-table-editor-component",{ref:"bbatForm",attrs:{id:e.id}})],1)},A=[],L=a("2af9"),N={props:["index","id"],components:{BbatTableEditorComponent:L["a"]},data:function(){return{dataSocket:{}}},created:function(){var e=this;e.$nextTick(function(){setTimeout(function(){var t=e.items[e.index]["formScriptFileId"];console.log("formId",t),e.$store.dispatch("getContentFile",t).then(function(e){console.log(e)})},100)})},watch:{$route:function(e,t){}},computed:{items:function(){return this.$store.getters.getDeliverableTypes}},methods:{goBack:function(){window.history.back()}}},z=N,j=Object(p["a"])(z,R,A,!1,null,null,null);j.options.__file="DeliverableEditor.vue";var q=j.exports,M=[{path:"/danh-sach-giay-to/:index",name:"Home",component:k,props:!0,meta:{requiresAuth:!0},children:[{path:"/danh-sach-giay-to/:index",name:"DeliverableList",component:I,props:!0,meta:{requiresAuth:!0}},{path:"/danh-sach-giay-to/:index/editor/:id",name:"DeliverableEditor",component:q,props:!0,meta:{requiresAuth:!0}}]},{path:"*",name:"NotFound",component:S}];n["default"].use(_["a"]);var U=new _["a"]({routes:M});U.beforeEach(function(e,t,a){e.matched.some(function(e){return e.meta.requiresAuth});a()});var B,K=U,W=a("2f62"),G=a("bc3a"),V=a.n(G),H="\n    {\n        getDeliverableTypes(start: -1, end: -1) {\n            typeCode\n            typeName\n            formScriptFileId\n            formReportFileId\n            dataConfig\n            tableConfig\n        }\n    }\n",Z={getDeliverableTypes:H};function J(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}n["default"].use(W["a"]);var Y=new W["a"].Store({state:{groupId:void 0!==window.themeDisplay?window.themeDisplay.getScopeGroupId():0,snackbarerror:!1,snackbarsocket:!1,refreshSocket:0,initData:{},tocken:"",loginUser:[{email:"",role:""}],user:null,socket:{isConnected:!1,message:"",reconnectError:!1},endPointApi:"/o/rest/v2",getDeliverableTypes:[],getContentFile:""},actions:{loadInitResource:function(e){var t=e.state;return new Promise(function(e){null!==window.themeDisplay&&void 0!==window.themeDisplay?(t.initData["groupId"]=window.themeDisplay.getScopeGroupId(),t.initData["user"]={userName:window.themeDisplay.getUserName(),userEmail:"",userId:window.themeDisplay.getUserId()}):(t.initData["groupId"]=0,t.initData["user"]={userName:"",userEmail:"",userId:20103}),e(t.initData)})},getDeliverableTypes:function(e){var t=e.commit,a=e.state;return new Promise(function(){var e={headers:{Authorization:"Basic dGVzdEBsaWZlcmF5LmNvbTp0ZXN0",groupId:a.groupId,"Content-Type":"text/plain",Accept:"application/json"}},n=Z.getDeliverableTypes;V.a.post("/o/v1/opencps/deliverable",n,e).then(function(e){a.getDeliverableTypes=e.data["getDeliverableTypes"]}).catch(function(){a.getDeliverableTypes=[],t("setsnackbarerror",!0)})})},getContentFile:function(e,t){e.commit;var a=e.state;return new Promise(function(){var e={headers:{groupId:a.groupId,Accept:"text/plain"}};V.a.get("/o/v1/opencps/fileattach/"+t+"/text",e).then(function(e){a.getContentFile=e.data}).catch(function(){rstate.getContentFile=""})})}},mutations:(B={SOCKET_ONOPEN:function(e,t){n["default"].prototype.$socket=t.currentTarget,e.socket.isConnected=!0,setTimeout(function(){e.socket.isConnected&&3===e.refreshSocket&&(e.refreshSocket=0,window.location.reload(!0))},4e3)},SOCKET_ONCLOSE:function(e,t){console.log("SOCKET_ONCLOSE",t),e.refreshSocket=3,e.snackbarsocket=!0,e.socket.isConnected=!1},SOCKET_ONERROR:function(e,t){console.error(e,t)},SOCKET_ONMESSAGE:function(e,t){e.message=t}},J(B,WebSocket.WS_RECONNECT,function(e,t){console.log("WS_RECONNECT",e),console.log("WS_RECONNECT",t)}),J(B,WebSocket.WS_RECONNECT_ERROR,function(e){e.socket.reconnectError=!0}),J(B,"setInitData",function(e,t){e.initData=t}),J(B,"setsnackbarerror",function(e,t){e.snackbarerror=t}),J(B,"setsnackbarsocket",function(e,t){e.snackbarsocket=t}),B),getters:{getsnackbarerror:function(e){return e.snackbarerror},getsnackbarsocket:function(e){return e.snackbarsocket},getDeliverableTypes:function(e){return e.getDeliverableTypes},getContentFile:function(e){return e.getContentFile}}}),Q=a("b408"),X=a.n(Q),ee=a("967d"),te=a("e0e8");n["default"].use(te["a"]),n["default"].use(ee["default"]);var ae=void 0!==window.themeDisplay?window.themeDisplay.getScopeGroupId():0,ne=void 0!==window.themeDisplay?window.themeDisplay.getCompanyId():0,oe=void 0!==window.themeDisplay?window.themeDisplay.getUserId():0,ie=void 0!==window.themeDisplay?window.themeDisplay.getUserName():"",re=void 0!==window.themeDisplay?window.themeDisplay.getPortalURL().replace("http://",""):"localhost:8080",se=void 0!==window.themeDisplay?window.Liferay.authToken:"",le=re.indexOf(":")>0?re.substr(0,re.indexOf(":")):re;n["default"].use(X.a,"ws://"+le+":8080/o/v1/socket/web?groupId="+ae+"&portalURL="+re+"&companyId="+ne+"&userId="+oe+"&userName="+ie+"&Token="+se,{store:Y,format:"json",reconnection:!0,reconnectionAttempts:5,reconnectionDelay:3e3,maxHttpBufferSize:31457280,maxPayload:31457280}),V.a.defaults.headers.common["Token"]=void 0!==window.Liferay?window.Liferay.authToken:"",V.a.defaults.headers.common["groupId"]=ae,n["default"].config.productionTip=!0,n["default"].mixin({methods:{getScopeGroupId:function(){return null!==window.themeDisplay&&void 0!==window.themeDisplay?window.themeDisplay.getScopeGroupId():0},getAuthToken:function(){return null!==window.themeDisplay&&void 0!==window.themeDisplay?window.Liferay.authToken:""},getUserId:function(){return null!==window.themeDisplay&&void 0!==window.themeDisplay?window.themeDisplay.getUserId():0}}}),new n["default"]({el:"#app",router:K,store:Y,render:function(e){return e(v)},created:function(){var e=this;e.$nextTick(function(){e.$store.dispatch("getDeliverableTypes")})}})},"861c":function(e,t,a){},a51b:function(e,t,a){},c35c:function(e,t,a){},ca9a:function(e,t,a){},d3a7:function(module,__webpack_exports__,__webpack_require__){"use strict";var _components__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("2af9");__webpack_exports__["a"]={props:["index"],components:{TinyPagination:_components__WEBPACK_IMPORTED_MODULE_0__["b"]},data:function(){return{headers:[],hideAction:!1,hosoDatas:[],hosoDatasTotal:0,hosoDatasPage:1,hosoTotalPage:0,dataSocket:{}}},created:function created(){var vm=this;vm.$nextTick(function(){setTimeout(function(){console.log(vm.items),vm.headers=eval("( "+vm.items[vm.index]["tableConfig"]+" )")["headers"]},100)})},watch:{$route:function(e,t){},index:function index(val){var vm=this;vm.headers=eval("( "+vm.items[val]["tableConfig"]+" )")["headers"]}},computed:{items:function(){return this.$store.getters.getDeliverableTypes},loadingTable:function(){return this.$store.getters.loadingTable}},methods:{paggingData:function(e){var t=this,a=t.$router.history.current,n=a.query,o="?";for(var i in n["page"]="",n)""!==n[i]&&"undefined"!==n[i]&&void 0!==n[i]&&(o+=i+"="+n[i]+"&");o+="page="+e.page,t.$router.push({path:a.path+o})}}}},d593:function(e,t,a){},f04e:function(module,__webpack_exports__,__webpack_require__){"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(e,t){var a=[],n=!0,o=!1,i=void 0;try{for(var r,s=e[Symbol.iterator]();!(n=(r=s.next()).done);n=!0)if(a.push(r.value),t&&a.length===t)break}catch(e){o=!0,i=e}finally{try{n||null==s["return"]||s["return"]()}finally{if(o)throw i}}return a}function _arrayWithHoles(e){if(Array.isArray(e))return e}__webpack_exports__["a"]={data:function(){return{toDateFormatted:null,toDate:null}},props:["value","item","dataValue"],watch:{toDate:function(e){this.toDateFormatted=this.formatDate(e),this.$emit("input",new Date(e).getTime())}},methods:{formatDate:function(e){if(!e)return null;var t=new Date(e);return t.getDate()+"/"+(t.getMonth()+1)+"/"+t.getFullYear()},parseDate:function(e){if(!e)return null;var t=e.split("/"),a=_slicedToArray(t,3),n=a[0],o=a[1],i=a[2];return"".concat(i,"-").concat(o.padStart(2,"0"),"-").concat(n.padStart(2,"0"))},processRules:function processRules(rulesStr){return eval("( "+rulesStr+" )")}}}},fa98:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-menu",{attrs:{"close-on-content-click":!0,lazy:"",transition:"fade-transition","offset-y":"","full-width":"","max-width":"290px","min-width":"290px"}},[a("v-text-field",{attrs:{slot:"activator",box:"","append-icon":"event",label:e.item.required?e.item["label"]+" 💥":e.item["label"],rules:e.processRules(e.item.rules),value:e.formatDate(e.dataValue)},on:{blur:function(t){e.toDate=e.parseDate(e.toDateFormatted)}},slot:"activator"}),a("v-date-picker",{attrs:{"no-title":""},model:{value:e.toDate,callback:function(t){e.toDate=t},expression:"toDate"}})],1)},o=[],i=a("f04e"),r=i["a"],s=a("2877"),l=Object(s["a"])(r,n,o,!1,null,null,null);l.options.__file="DatetimePicker.vue";t["a"]=l.exports}});
//# sourceMappingURL=app.js.map