(function(e){function t(t){for(var r,u,i=t[0],l=t[1],c=t[2],p=0,f=[];p<i.length;p++)u=i[p],o[u]&&f.push(o[u][0]),o[u]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);s&&s(t);while(f.length)f.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,i=1;i<n.length;i++){var l=n[i];0!==o[l]&&(r=!1)}r&&(a.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},o={app:0},a=[];function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var s=l;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);var r=n("2b0e"),o=n("bb71");n("da64");r["a"].use(o["a"],{theme:{primary:"#ee44aa",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"},customProperties:!0,iconfont:"md"});var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v("|\n    "),n("router-link",{attrs:{to:"/about"}},[e._v("About")])],1),n("router-view")],1)},u=[],i={},l=i,c=n("2877"),s=n("6544"),p=n.n(s),f=n("7496"),v=Object(c["a"])(l,a,u,!1,null,null,null);v.options.__file="App.vue";var d=v.exports;p()(v,{VApp:f["a"]});var b=n("8c4f"),m=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},_=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("img",{attrs:{alt:"Vue logo",src:n("cf05")}}),e._v("\n  dfafas\n")])}],h={name:"home"},g=h,y=Object(c["a"])(g,m,_,!1,null,null,null);y.options.__file="Home.vue";var w=y.exports,O=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},j=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"about"},[n("h1",[e._v("This is an about page")])])}],x={},F=Object(c["a"])(x,O,j,!1,null,null,null);F.options.__file="About.vue";var P=F.exports;r["a"].use(b["a"]);var S=new b["a"]({routes:[{path:"/",name:"home",component:w},{path:"/about",name:"about",component:P}]}),$=n("2f62");r["a"].use($["a"]);var k=new $["a"].Store({state:{},mutations:{},actions:{}});r["a"].config.productionTip=!1,new r["a"]({router:S,store:k,render:function(e){return e(d)}}).$mount("#app")},cf05:function(e,t,n){e.exports=n.p+"img/logo.82b9c7a5.png"}});
//# sourceMappingURL=app.411eca5d.js.map