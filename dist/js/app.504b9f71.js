(function(t){function e(e){for(var a,r,i=e[0],c=e[1],l=e[2],d=0,f=[];d<i.length;d++)r=i[d],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&f.push(s[r][0]),s[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);u&&u(e);while(f.length)f.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,i=1;i<n.length;i++){var c=n[i];0!==s[c]&&(a=!1)}a&&(o.splice(e--,1),t=r(r.s=n[0]))}return t}var a={},s={app:0},o=[];function r(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=a,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var u=c;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},1:function(t,e){},"1fbb":function(t,e,n){"use strict";var a=n("e31e"),s=n.n(a);s.a},3375:function(t,e,n){"use strict";var a=n("b70b"),s=n.n(a);s.a},"508e":function(t,e,n){"use strict";var a=n("6895"),s=n.n(a);s.a},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a,s=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("Chat")],1)},r=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{ref:"list",staticClass:"list",attrs:{id:"list"}},[n("ul",t._l(t.msglist,(function(t,e){return n("li",{key:e},[t.me?n("RightItem",{attrs:{id:t.id,type:t.type,content:t.content}}):n("LeftItem",{attrs:{id:t.id,type:t.type,content:t.content}}),n("div",{directives:[{name:"scroll",rawName:"v-scroll"}],staticStyle:{height:"0"}})],1)})),0)]),n("div",{staticClass:"bottom"},[n("div",{staticClass:"line"}),n("div",{staticClass:"input-send"},[n("van-field",{staticClass:"input",attrs:{placeholder:"欢迎使用智能医生助手！请输入聊天内容..."},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.send(e)}},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}}),n("van-button",{staticClass:"send",attrs:{type:"primary"},on:{click:t.send}},[t._v("发送")])],1)])])},c=[],l=(n("99af"),n("d3b7"),n("ac1f"),n("3ca3"),n("5319"),n("ddb0"),n("2b3d"),n("d4ec")),u=n("bee2"),d=n("3452"),f=n.n(d),p=new URL("wss://spark-api.xf-yun.com/v1.1/chat"),h="8373bf37",m="OTNiOTllMWI3Y2Y4YmZmNWI4MzY3ZTRi",v="6f8dc8141b2304e336f94f7ef0f7f8d1",b="",g="";function y(){switch(p.pathname){case"/v1.1/chat":a="general";break;case"/v2.1/chat":a="generalv2";break;case"/v3.1/chat":a="generalv3";break;case"/v3.5/chat":a="generalv3.5";break}return new Promise((function(t){var e=v,n=m,a="wss://"+p.host+p.pathname,s=location.host,o=(new Date).toGMTString(),r="hmac-sha256",i="host date request-line",c="host: ".concat(s,"\ndate: ").concat(o,"\nGET ").concat(p.pathname," HTTP/1.1"),l=f.a.HmacSHA256(c,n),u=f.a.enc.Base64.stringify(l),d='api_key="'.concat(e,'", algorithm="').concat(r,'", headers="').concat(i,'", signature="').concat(u,'"'),h=btoa(d);a="".concat(a,"?authorization=").concat(h,"&date=").concat(o,"&host=").concat(s),t(a)}))}var k=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.appId,a=void 0===n?h:n;Object(l["a"])(this,t),this.appId=a,this.status="init"}return Object(u["a"])(t,[{key:"setStatus",value:function(t){this.onWillStatusChange&&this.onWillStatusChange(this.status,t),this.status=t}},{key:"start",value:function(){return g="",this.connectWebSocket().finally((function(){console.log("start函数执行完毕")}))}},{key:"connectWebSocket",value:function(){var t=this;return new Promise((function(e){return t.setStatus("ttsing"),y().then((function(n){var a;if("WebSocket"in window)a=new WebSocket(n);else if(!("MozWebSocket"in window))return void alert("浏览器不支持WebSocket");t.ttsWS=a,a.onopen=function(){t.webSocketSend()},a.onmessage=function(n){t.result(n.data).then((function(){e()}))},a.onerror=function(){clearTimeout(t.playTimeout),t.setStatus("error"),alert("WebSocket报错，请f12查看详情"),console.error("详情查看：".concat(encodeURI(n.replace("wss:","https:"))))},a.onclose=function(t){console.log(t)}}))}))}},{key:"webSocketSend",value:function(){console.log(a);var t={header:{app_id:this.appId,uid:"fd3f47e4-d"},parameter:{chat:{domain:a,temperature:.5,max_tokens:1024}},payload:{message:{text:[{role:"user",content:b}]}}};console.log(JSON.stringify(t)),this.ttsWS.send(JSON.stringify(t))}},{key:"result",value:function(t){var e=this;return new Promise((function(n){var a=JSON.parse(t);if(g+=a.payload.choices.text[0].content,2===a.payload.choices.status&&(console.log("回答："+g),n(g)),0!==a.header.code)return alert("提问失败: ".concat(a.header.code,":").concat(a.header.message)),void console.error("".concat(a.header.code,":").concat(a.header.message));0===a.header.code&&2===a.header.status&&(e.ttsWS.close(),w.setStatus("init"))}))}}]),t}(),w=new k;function x(t){return new Promise((function(e){b=t,g="",w.start().then((function(){console.log("start()方法执行完毕"),console.log("返回值："+g),e(g)}))}))}var S=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("img",{staticClass:"head",attrs:{src:n("5751")}}),a("div",{staticClass:"content"},[1===t.type?a("div",{staticClass:"text"},[t._v(" "+t._s(t.resText)+" ")]):2===t.type?a("img",{staticClass:"img",attrs:{src:t.content},on:{click:function(e){return t.preview(t.content)}}}):t._e()])])},_=[],O=(n("96cf"),n("1da1")),C=n("886e"),j=n.n(C),T=n("9ce6"),W=n.n(T),I={name:"LeftItem",props:["id","type","content"],components:{"vue-markdown":W.a},data:function(){return{resText:""}},created:function(){this.printText()},methods:{printText:function(){var t=this;return Object(O["a"])(regeneratorRuntime.mark((function e(){var n,a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=t.content,a="",s=0;case 3:if(!(s<n.length)){e.next=11;break}return a+=n.charAt(s),e.next=7,new Promise((function(t){setTimeout(t,50)}));case 7:t.resText=a;case 8:s++,e.next=3;break;case 11:case"end":return e.stop()}}),e)})))()},preview:function(t){j()([t])}}},P=I,R=(n("1fbb"),n("2877")),M=Object(R["a"])(P,S,_,!1,null,"36a8ec38",null),E=M.exports,N=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"content"},[1===t.type?n("div",{staticClass:"text",staticStyle:{"word-break":"break-all"}},[t._v(" "+t._s(t.content)+" ")]):2===t.type?n("img",{staticClass:"img",attrs:{src:t.content}}):t._e()])])},$=[],J={name:"RightItem",props:["id","type","content"]},z=J,L=(n("3375"),Object(R["a"])(z,N,$,!1,null,"5d15dbc6",null)),Y=L.exports;s["default"].directive("scroll",{inserted:function(t){t.scrollIntoView()}});var A={name:"Chat",components:{LeftItem:E,RightItem:Y},data:function(){return{text:"",msglist:[{id:1,type:1,content:"您好！有什么我可以帮助您的吗？",me:!1}]}},methods:{send:function(){this.text&&(this.msglist.push({id:this.msglist[this.msglist.length-1].id+1,type:1,content:this.text,me:!0}),"图片"===this.text?this.msglist.push({id:this.msglist[this.msglist.length-1].id+1,type:2,content:"http://6emm.hxzdhn.com/img/2020/06/28/jausoellbtf.jpg",me:!1}):this.getResponse(this.text),this.text="")},getResponse:function(t){var e=this;x(t).then((function(t){console.log("打印"+t),e.msglist.push({id:e.msglist[e.msglist.length-1].id+1,type:1,content:t,me:!1})}))}}},H=A,G=(n("508e"),Object(R["a"])(H,i,c,!1,null,"2cf2019b",null)),U=G.exports,Z={name:"App",components:{Chat:U}},q=Z,B=Object(R["a"])(q,o,r,!1,null,"2b4406ae",null),D=B.exports,V=n("1157"),F=n.n(V);n("79bb"),s["default"].config.productionTip=!1,new s["default"]({$:F.a,render:function(t){return t(D)}}).$mount("#app")},5751:function(t,e,n){t.exports=n.p+"img/doctor.df67b946.png"},6895:function(t,e,n){},"79bb":function(t,e,n){"use strict";n.r(e);var a=n("2b0e"),s=n("b970"),o=(n("157a"),n("343b"));a["default"].use(s["a"]),a["default"].use(o["a"])},b70b:function(t,e,n){},e31e:function(t,e,n){}});
//# sourceMappingURL=app.504b9f71.js.map