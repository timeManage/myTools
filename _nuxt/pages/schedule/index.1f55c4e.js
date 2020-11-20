(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{552:function(t,e,o){"use strict";o.r(e);o(268),o(27),o(28),o(16),o(547);var n={head:function(){return{title:"日常用到的小工具-任务定时计划",link:[{rel:"stylesheet",href:"./css/schedule/index.css"}]}},data:function(){var t=this;return{left:!1,formItem:{title:"",body:"",hour:0,minutes:0},times:[],times1:[],times2:[],times3:[],times4:[],columns:[{title:"标题",key:"title",align:"center"},{title:"描述",key:"body",align:"center"},{title:"倒计时",align:"center",render:function(t,e){return t("Time",{props:{time:e.row.timeStamp,interval:1}})}},{title:"状态",align:"center",render:function(t,e){return(new Date).getTime()-e.row.timeStamp>0?t("Tag",{props:{color:"success"}},"已完成"):t("Tag",{props:{color:"primary"}},"等待中")}},{title:"操作",align:"center",render:function(e,o){return e("Icon",{props:{type:"ios-trash-outline",size:26},style:{cursor:"pointer"},on:{click:function(){t.deleteTime(o.row.timeStamp)}}})}}]}},methods:{onMouseMove:function(t){console.log(t.clientX),t.clientX<2&&(this.left=!0)},test:function(){window.Notification?"granted"===window.Notification.permission?this.notification("test"):"default"===window.Notification.permission?(window.Notification.requestPermission(),this.$Message.warning("请允许网站通知。")):this.$Message.warning("请检查是否禁止网站通知。"):this.$Message.error("测试失败，该浏览器不支持通知。")},notification:function(t){console.log(t);var time=this.times.find((function(e){return e.timeStamp===t}));time||((time={title:"",body:""}).title="测试通知",time.body="这是一个测试通知"),new Notification(time.title,{body:time.body,icon:""}),this.timesGroup()},setTimeout:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(){var t=36e5*this.formItem.hour+6e4*this.formItem.minutes,e=(new Date).getTime()+t,o=setTimeout(this.notification,t,e),time={title:"",body:"",timeStamp:0,function:null};time.title=this.formItem.title,time.body=this.formItem.body,time.timeStamp=e,time.function=o,this.times.push(time),this.timesGroup()})),timesGroup:function(){var t=this;this.times1=[],this.times2=[],this.times3=[],this.times4=[],this.times.forEach((function(e){var o=e.timeStamp-(new Date).getTime();o<=18e5?(t.times1.push(e),t.timesSort(t.times1)):o<=36e5?(t.times2.push(e),t.timesSort(t.times2)):o<=108e5?(t.times3.push(e),t.timesSort(t.times3)):(t.times4.push(e),t.timesSort(t.times4))}))},timesSort:function(t){t.sort((function(a,b){return a.timeStamp-b.timeStamp}))},deleteTime:function(t){var e=this.times.findIndex((function(e){return e.timeStamp===t}));t>(new Date).getTime()&&clearTimeout(this.times[e].function),this.times.splice(e,1),this.timesGroup()}}},r=o(40),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"clock",on:{mousemove:t.onMouseMove}},[o("Row",{staticStyle:{height:"100%"},attrs:{type:"flex",justify:"center"}},[t.times1.length>0?o("Col",{staticStyle:{height:"50%"},attrs:{span:"11"}},[o("Card",[o("p",{attrs:{slot:"title"},slot:"title"},[o("Icon",{attrs:{type:"ios-clock-outline"}}),t._v("\n                    半小时内\n                ")],1),t._v(" "),o("Table",{attrs:{stripe:"",columns:t.columns,data:t.times1,size:"small"}})],1)],1):t._e(),t._v(" "),t.times2.length>0?o("Col",{staticStyle:{height:"50%"},attrs:{span:"11"}},[o("Card",[o("p",{attrs:{slot:"title"},slot:"title"},[o("Icon",{attrs:{type:"ios-clock-outline"}}),t._v("\n                    一小时内\n                ")],1),t._v(" "),o("Table",{attrs:{stripe:"",columns:t.columns,data:t.times2,size:"small"}})],1)],1):t._e(),t._v(" "),t.times3.length>0?o("Col",{staticStyle:{height:"50%"},attrs:{span:"11"}},[o("Card",[o("p",{attrs:{slot:"title"},slot:"title"},[o("Icon",{attrs:{type:"ios-clock-outline"}}),t._v("\n                    三小时内\n                ")],1),t._v(" "),o("Table",{attrs:{stripe:"",columns:t.columns,data:t.times3,size:"small"}})],1)],1):t._e(),t._v(" "),t.times4.length>0?o("Col",{staticStyle:{height:"50%"},attrs:{span:"11"}},[o("Card",[o("p",{attrs:{slot:"title"},slot:"title"},[o("Icon",{attrs:{type:"ios-clock-outline"}}),t._v("\n                    三小时之后\n                ")],1),t._v(" "),o("Table",{attrs:{stripe:"",columns:t.columns,data:t.times4,size:"small"}})],1)],1):t._e()],1),t._v(" "),o("Drawer",{attrs:{title:"使用说明",placement:"left",closable:!1,width:"20"},model:{value:t.left,callback:function(e){t.left=e},expression:"left"}},[o("Row",{attrs:{type:"flex",justify:"center",align:"middle"}},[o("Col",[o("Button",{attrs:{type:"primary"},on:{click:t.test}},[t._v("测试")])],1)],1),t._v(" "),o("br"),t._v(" "),o("Row",{attrs:{type:"flex",justify:"center",align:"middle"}},[o("Col",{attrs:{span:"22"}},[o("Form",{attrs:{model:t.formItem,"label-width":80}},[o("FormItem",{attrs:{label:"主题"}},[o("Input",{attrs:{placeholder:"可以为空"},model:{value:t.formItem.title,callback:function(e){t.$set(t.formItem,"title",e)},expression:"formItem.title"}})],1),t._v(" "),o("FormItem",{attrs:{label:"描述"}},[o("Input",{attrs:{placeholder:"可以为空"},model:{value:t.formItem.body,callback:function(e){t.$set(t.formItem,"body",e)},expression:"formItem.body"}})],1),t._v(" "),o("FormItem",{attrs:{label:"小时"}},[o("Input",{attrs:{type:"number"},model:{value:t.formItem.hour,callback:function(e){t.$set(t.formItem,"hour",e)},expression:"formItem.hour"}},[o("span",{attrs:{slot:"append"},slot:"append"},[t._v("小时（h）")])])],1),t._v(" "),o("FormItem",{attrs:{label:"分钟"}},[o("Input",{attrs:{type:"number"},model:{value:t.formItem.minutes,callback:function(e){t.$set(t.formItem,"minutes",e)},expression:"formItem.minutes"}},[o("span",{attrs:{slot:"append"},slot:"append"},[t._v("分钟（m）")])])],1),t._v(" "),o("FormItem",[o("Button",{attrs:{type:"primary"},on:{click:t.setTimeout}},[t._v("添加")])],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);