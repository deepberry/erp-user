"use strict";(self["webpackChunktitan2"]=self["webpackChunktitan2"]||[]).push([[353],{353:function(t,e,i){i.r(e),i.d(e,{default:function(){return L}});var n=i(6252),s=i(3577);const l=t=>((0,n.dD)("data-v-1c67066a"),t=t(),(0,n.Cn)(),t),a={class:"plantDetail"},r={class:"list"},o=["onClick"],u={class:"left"},h=["src"],p={class:"right"},m=["onClick"],c={class:"contentItem"},g=l((()=>(0,n._)("span",null,"天数：",-1))),d=l((()=>(0,n._)("span",null,"品种：",-1))),w={class:"contentItem"},k=l((()=>(0,n._)("span",null,"面积：",-1))),y={class:"btn"},D=l((()=>(0,n._)("i",{class:"erp erpjiekouyunwei"},null,-1))),$=(0,n.Uk)(" 智能设备"),b=[D,$],_=["onClick"],v={class:"erp erprili"},T={key:0},C=(0,n.Uk)(" 种植任务 ");function M(t,e,i,l,D,$){const M=(0,n.up)("el-empty"),N=(0,n.Q2)("loading");return(0,n.wg)(),(0,n.iD)("div",a,[0==D.list.length?((0,n.wg)(),(0,n.j4)(M,{key:0,description:"暂无数据",style:{"margin-top":"200px"}})):(0,n.kq)("",!0),(0,n.wy)(((0,n.wg)(),(0,n.iD)("div",r,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(D.list,((i,l)=>((0,n.wg)(),(0,n.iD)("div",{class:"item",key:l},[(0,n._)("div",{class:"head",onClick:e=>t.$store.state.power.plantDetail?$.itemClick(i.id):()=>{}},[(0,n._)("div",u,[(0,n._)("img",{src:i.image,alt:""},null,8,h),(0,n._)("p",null,(0,s.zw)(i.categoryTitle),1)]),(0,n._)("div",p,"棚区："+(0,s.zw)(i.address),1)],8,o),(0,n._)("div",{class:"content",onClick:t=>$.itemClick(i.id)},[(0,n._)("div",c,[(0,n._)("p",null,[g,(0,n.Uk)("第"+(0,s.zw)(i.count)+"天",1)]),(0,n._)("p",null,[d,(0,n.Uk)((0,s.zw)(i.varietyTitle),1)])]),(0,n._)("div",w,[(0,n._)("p",null,[k,(0,n.Uk)((0,s.zw)(i.area)+"亩",1)]),(0,n._)("p",null,(0,s.zw)(i.plantTime)+" 定植",1)])],8,m),(0,n._)("div",y,[i.smartDevice>0?((0,n.wg)(),(0,n.iD)("p",{key:0,onClick:e[0]||(e[0]=(...t)=>$.openUrl&&$.openUrl(...t))},b)):(0,n.kq)("",!0),(0,n._)("p",{onClick:t=>$.itemClick(i.id)},[(0,n._)("i",v,[i.task>0?((0,n.wg)(),(0,n.iD)("span",T)):(0,n.kq)("",!0)]),C],8,_)])])))),128)),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(D.listSpace,(t=>((0,n.wg)(),(0,n.iD)("div",{class:"itemSpace",key:t})))),128))])),[[N,D.loading]])])}var N=i(2335),I={name:"plantDetail",data(){return{list:[],listSpace:0,loading:!1}},mounted(){this.getData()},watch:{$route(){this.getData()}},methods:{openUrl(){window.open("https://io.deepberry.cn/insights")},getData(){this.loading=!0,this.ajax.post("/api/v1/adam/garden/details",{id:this.$route.query.id}).then((t=>{this.list=t.data.growPlantsBoList.map((t=>(t.count=(new Date).getTime()/1e3-N.Z.parse(t.plantTime).getTime()/1e3,t.count=Math.ceil(t.count/60/60/24),t.plantTime=N.Z.time("y-m-d",N.Z.parse(t.plantTime)),t.task=!1,t))),this.listSpace=this.list.length%4>0?4-this.list.length%4:0,console.log(this.listSpace),this.loading=!1,this.getTaskCount()}))},getTaskCount(){this.ajax.post("/api/v1/adam/task/getTaskCountByUser",{gardenId:this.$route.query.id}).then((t=>{this.list=this.list.map((e=>(t.data.map((t=>{e.id==t.growPlantId&&(e.task=t.count)})),e)))}))},itemClick(t){this.$router.push({path:"/erp/plant/crops/detail",query:{id:t,gardenId:this.$route.query.id}})}}},f=i(8118);const x=(0,f.Z)(I,[["render",M],["__scopeId","data-v-1c67066a"]]);var L=x},2335:function(t,e){const i={to2:t=>Number(t)<10?`0${Number(t)}`:String(t),time(t="y-m-d",e=null){let i=e?new Date(e):new Date;return t=t.replace("y",i.getFullYear()),t=t.replace("m",this.to2(i.getMonth()+1)),t=t.replace("d",this.to2(i.getDate())),t=t.replace("h",this.to2(i.getHours())),t=t.replace("i",this.to2(i.getMinutes())),t=t.replace("s",this.to2(i.getSeconds())),t=t.replace("w",i.getDay()),t},monthLength(t=null){let e=1*this.time("y",t),i=this.to2(1*this.time("m",t)+1);if(13==i)return 31;{let t=new Date(`${e}-${i}-01`).getTime()-864e5;return Number(this.time("d",t))}},preMonthLenggth(t=null){let e=1*this.time("y",t),i=this.to2(1*this.time("m",t)),n=new Date(`${e}-${i}-01`).getTime()-864e5;return Number(this.time("d",n))},nextMonthLenggth(t=null){let e=1*this.time("y",t),i=this.to2(1*this.time("m",t)+2),n=new Date(`${e}-${i}-01`).getTime()-864e5;return Number(this.time("d",n))},monthFirst(t=null){let e=this.time("y-m",t)+"-01";return this.time("y-m-d",e)},monthLast(t=null){let e=1*this.time("y",t),i=this.to2(1*this.time("m",t)+1),n=new Date(`${e}-${i}-01`).getTime()-864e5;return this.time("y-m-d",n)},preMonthToday(t=null){let e=Number(t.substr(0,4)),i=Number(t.substr(5,2)),n=Number(t.substr(8));return n>this.preMonthLenggth(`{y}-${i}-01`)&&(n=this.preMonthLenggth(`{y}-${i}-01`)),1==i?(e-=1,i=12):i-=1,`${e}-${i}-${n}`},nextMonthToday(t=null){let e=Number(t.substr(0,4)),i=Number(t.substr(5,2)),n=Number(t.substr(8));return n>this.nextMonthLenggth(`{y}-${i}-01`)&&(n=this.nextMonthLenggth(`{y}-${i}-01`)),12==i?(e+=1,i=1):i+=1,`${e}-${i}-${n}`},timeout(t){},timeRemaining(t,e){return e-=parseInt((new Date).getTime()/1e3),this.unixToString(t,e)},unixToString(t,e){let n=parseInt(e/60/60/24),s=parseInt((e-86400*n)/3600),l=parseInt((e-86400*n-3600*s)/60),a=e-86400*n-3600*s-60*l;return t=t.replace("d",i.to2(i.low(n))),t=t.replace("h",i.to2(i.low(s))),t=t.replace("i",i.to2(i.low(l))),t=t.replace("s",i.to2(i.low(a))),t},low(t){return t<0?0:t},parse(t){return new Date(t)}};e["Z"]=i}}]);
//# sourceMappingURL=353.56e8f1dc.js.map