"use strict";(self["webpackChunktitan2"]=self["webpackChunktitan2"]||[]).push([[641],{2618:function(e,a,t){t.r(a),t.d(a,{default:function(){return ga}});var l=t(6252),s=t(3577);const i=e=>((0,l.dD)("data-v-2caff9b6"),e=e(),(0,l.Cn)(),e),o={class:"task inner"},n={class:"box"},r=i((()=>(0,l._)("div",{class:"head"},[(0,l._)("span",{class:"active"},"任务列表")],-1))),d={class:"ctrl"},u={class:"status"},c={class:"search"},p=(0,l.Uk)("查询"),g=i((()=>(0,l._)("i",{class:"erp erpjiufuqianbaoicon06"},null,-1))),m=(0,l.Uk)(" 创建任务"),h={class:"tableWrap"},w={class:"table"},k=(0,l.Uk)("查看详情"),v={key:0,class:"pages"},_={class:"total"};function f(e,a,t,i,f,D){const C=(0,l.up)("el-button"),y=(0,l.up)("el-badge"),x=(0,l.up)("el-input"),T=(0,l.up)("el-table-column"),b=(0,l.up)("el-table"),z=(0,l.up)("el-pagination"),B=(0,l.up)("TaskDetail"),U=(0,l.up)("TaskCreate"),W=(0,l.Q2)("loading");return(0,l.wg)(),(0,l.iD)("div",o,[(0,l._)("div",n,[r,(0,l._)("div",d,[(0,l._)("div",u,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(f.status,(e=>((0,l.wg)(),(0,l.j4)(y,{class:"statusItem",value:e.sup>0?e.sup:"",onClick:a=>D.statusClick(e.value),key:e.value},{default:(0,l.w5)((()=>[(0,l.Wm)(C,{type:f.currentStatus==e.value?"primary":"",link:""},{default:(0,l.w5)((()=>[(0,l.Uk)((0,s.zw)(e.title),1)])),_:2},1032,["type"])])),_:2},1032,["value","onClick"])))),128))]),(0,l._)("div",c,[(0,l.Wm)(x,{modelValue:f.searchKey,"onUpdate:modelValue":a[0]||(a[0]=e=>f.searchKey=e),class:"searchInput",placeholder:"关键词搜索：任务内容、检查建议..."},null,8,["modelValue"]),(0,l.Wm)(C,{type:"primary",class:"searchSubmit",onClick:D.getData,loading:f.searchLoading},{default:(0,l.w5)((()=>[p])),_:1},8,["onClick","loading"]),e.$store.state.power.createTaskBtn?((0,l.wg)(),(0,l.j4)(C,{key:0,type:"primary",class:"searchCreateNewTask",onClick:a[1]||(a[1]=e=>f.showCreateBox=!0)},{default:(0,l.w5)((()=>[g,m])),_:1})):(0,l.kq)("",!0)])]),(0,l._)("div",h,[(0,l._)("div",w,[(0,l.wy)(((0,l.wg)(),(0,l.j4)(b,{size:"large",data:f.list,style:{width:"100%"},"max-height":"600px"},{default:(0,l.w5)((()=>[(0,l.Wm)(T,{label:"任务单号",width:"150","show-overflow-tooltip":""},{default:(0,l.w5)((e=>[(0,l.Uk)(" RW"+(0,s.zw)(e.row.id),1)])),_:1}),(0,l.Wm)(T,{label:"所属棚区",width:"300","show-overflow-tooltip":""},{default:(0,l.w5)((e=>[(0,l.Uk)((0,s.zw)(e.row.gardenTitle)+"-"+(0,s.zw)(e.row.growPlantTitle)+"-"+(0,s.zw)(e.row.address),1)])),_:1}),(0,l.Wm)(T,{label:"执行人"},{default:(0,l.w5)((e=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.row.executors,(e=>((0,l.wg)(),(0,l.iD)("p",{key:e.id},(0,s.zw)(e.name),1)))),128))])),_:1}),(0,l.Wm)(T,{prop:"taskContent",label:"任务内容"}),(0,l.Wm)(T,{label:"状态",width:"200"},{default:(0,l.w5)((e=>[(0,l._)("span",{style:(0,s.j5)({color:e.row.color})},(0,s.zw)(e.row.statusText),5)])),_:1}),(0,l.Wm)(T,{label:"操作",width:"200"},{default:(0,l.w5)((a=>[e.$store.state.power.taskDetail?((0,l.wg)(),(0,l.j4)(C,{key:0,link:"",type:"primary",onClick:e=>D.showDetail(a.row.id)},{default:(0,l.w5)((()=>[k])),_:2},1032,["onClick"])):(0,l.kq)("",!0)])),_:1})])),_:1},8,["data"])),[[W,f.loading]]),f.list.length>0?((0,l.wg)(),(0,l.iD)("div",v,[(0,l._)("span",_,"共 "+(0,s.zw)(f.total)+" 条",1),(0,l.Wm)(z,{currentPage:f.currentPage,"onUpdate:currentPage":a[2]||(a[2]=e=>f.currentPage=e),"page-size":f.pageSize,"onUpdate:page-size":a[3]||(a[3]=e=>f.pageSize=e),onCurrentChange:D.getData,background:"",layout:"prev, pager, next, jumper",total:f.total},null,8,["currentPage","page-size","onCurrentChange","total"])])):(0,l.kq)("",!0)])])]),f.showDetailBox?((0,l.wg)(),(0,l.j4)(B,{key:0,id:f.currentId,onOnCloseDetail:D.onCloseDetail},null,8,["id","onOnCloseDetail"])):(0,l.kq)("",!0),f.showCreateBox?((0,l.wg)(),(0,l.j4)(U,{key:1,onOnCloseCreate:D.onCloseCreate},null,8,["onOnCloseCreate"])):(0,l.kq)("",!0)])}var D=t(8090),C=t(7795),y=t(7913),x=t(9536);const T=e=>((0,l.dD)("data-v-7ca620d1"),e=e(),(0,l.Cn)(),e),b={class:"taskDetail purchaseDetailBox"},z={class:"taskDetailInner purchaseDetailBoxInner"},B={key:0,class:"statusImg",src:D,alt:""},U={key:1,class:"statusImg",src:C,alt:""},W={key:2,class:"statusImg",src:y,alt:""},V={key:3,class:"statusImg",src:x,alt:""},P={class:"id wrap"},I={class:"create wrap"},j=T((()=>(0,l._)("div",null,"任务创建",-1))),q=T((()=>(0,l._)("div",null,"任务内容",-1))),L={class:"taskContent"},S=T((()=>(0,l._)("p",null,"操作视频：",-1))),N=["src"],Y={class:"nz"},$=T((()=>(0,l._)("div",{class:"title"},"需用农资：",-1))),R={class:"nzlist"},K={style:{position:"relative",top:"5px"}},O={key:0},A={class:"tag"},G=(0,l.Uk)(" 指定执行人："),F={key:4,class:"todo wrap"},H=T((()=>(0,l._)("div",null,"任务执行",-1))),Z={class:"a"},J={key:5,class:"todo wrap"},M=T((()=>(0,l._)("div",null,"任务检查",-1))),Q=T((()=>(0,l._)("div",null,"检查意见：",-1))),E={class:"todoContent"},X={style:{display:"block"}},ee=T((()=>(0,l._)("i",{class:"erp erptianxie",style:{"margin-right":"5px","font-size":"12px"}},null,-1))),ae=(0,l.Uk)(" 填写检查意见"),te={key:7,class:"form wrap"},le=T((()=>(0,l._)("div",null,"填写检查意见",-1))),se=(0,l.Uk)(" 是否合格： "),ie=(0,l.Uk)("合格"),oe=(0,l.Uk)("不合格"),ne=(0,l.Uk)("打回"),re={class:"formTextarea"},de=T((()=>(0,l._)("p",null,"意见建议：",-1))),ue={key:8,class:"btns"},ce=(0,l.Uk)("取消"),pe=(0,l.Uk)("确定"),ge={class:"btns"},me=(0,l.Uk)("删除任务");function he(e,a,t,i,o,n){const r=(0,l.up)("el-button"),d=(0,l.up)("el-radio"),u=(0,l.up)("el-radio-group"),c=(0,l.up)("el-input"),p=(0,l.up)("el-dialog"),g=(0,l.up)("PlantCropsDetailCDialogDetail"),m=(0,l.Q2)("loading");return(0,l.wg)(),(0,l.iD)("div",b,[(0,l.Wm)(p,{"custom-class":"taskDetail purchaseDetailBox","before-close":n.onClose,"append-to-body":"",modelValue:o.showDetailBox,"onUpdate:modelValue":a[6]||(a[6]=e=>o.showDetailBox=e),title:"任务详情",width:"700px"},{default:(0,l.w5)((()=>[(0,l.wy)(((0,l.wg)(),(0,l.iD)("div",z,[0==o.detail.status?((0,l.wg)(),(0,l.iD)("img",B)):(0,l.kq)("",!0),1==o.detail.status?((0,l.wg)(),(0,l.iD)("img",U)):(0,l.kq)("",!0),2==o.detail.status?((0,l.wg)(),(0,l.iD)("img",W)):(0,l.kq)("",!0),3==o.detail.status?((0,l.wg)(),(0,l.iD)("img",V)):(0,l.kq)("",!0),(0,l._)("div",P,"任务单号：RW"+(0,s.zw)(o.detail.id),1),(0,l._)("div",I,[j,(0,l._)("div",null,[(0,l._)("p",null,"创建人："+(0,s.zw)(o.detail.createUserName),1),(0,l._)("p",null,"创建时间："+(0,s.zw)(o.detail.createTime),1)]),q,(0,l._)("div",L,[(0,l._)("div",null,[(0,l._)("p",null,"园区："+(0,s.zw)(o.detail.gardenTitle),1),(0,l._)("p",null,"作物："+(0,s.zw)(o.detail.growPlantTitle)+"-"+(0,s.zw)(o.detail.address),1)]),(0,l._)("div",null,[(0,l._)("p",null,"内容："+(0,s.zw)(o.detail.taskContent),1),(0,l._)("div",null,[S,o.detail.reWire?((0,l.wg)(),(0,l.iD)("video",{key:0,controls:"",onClick:a[0]||(a[0]=e=>n.view(o.detail.reWire)),src:o.detail.reWire,alt:""},null,8,N)):(0,l.kq)("",!0)])])]),(0,l._)("div",Y,[$,(0,l._)("div",R,[(0,l._)("div",K,[o.detail.agricultural&&o.detail.agricultural.length<=0?((0,l.wg)(),(0,l.iD)("span",O,"暂无数据")):(0,l.kq)("",!0)]),((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(o.detail.agricultural,(e=>((0,l.wg)(),(0,l.iD)("div",{class:"nzitem",key:e.id},[(0,l._)("p",null,[(0,l._)("span",A,(0,s.zw)(e.agriculturalType),1)]),(0,l._)("p",null,(0,s.zw)(e.agricultural),1)])))),128))])]),(0,l._)("div",null,[(0,l._)("p",null,[G,((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(o.detail.executors,(e=>((0,l.wg)(),(0,l.iD)("span",{style:{margin:"0 5px"},key:e.id},(0,s.zw)(e.name),1)))),128))])]),(0,l._)("div",null,"开始时间："+(0,s.zw)(o.detail.startTime),1),(0,l._)("div",null,"截止时间："+(0,s.zw)(o.detail.endTime),1)]),0!=o.detail.status?((0,l.wg)(),(0,l.iD)("div",F,[H,(0,l._)("div",null,"执行提交时间："+(0,s.zw)(o.detail.farmRecordBo.workTime),1),(0,l._)("div",null,"执行提交人："+(0,s.zw)(o.detail.farmRecordBo.userName),1),(0,l._)("div",{class:"todoContent",onClick:a[1]||(a[1]=(...e)=>n.showDetailClick&&n.showDetailClick(...e))},[(0,l._)("div",null,[(0,l._)("p",Z,(0,s.zw)(o.detail.farmRecordBo.title),1),(0,l._)("p",null,(0,s.zw)(o.detail.farmRecordBo.workTime),1)]),(0,l._)("div",null,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(o.detail.farmRecordBo.farmUseBos,(e=>((0,l.wg)(),(0,l.iD)("p",{class:"u",key:e.id},(0,s.zw)(e.agricultural)+"      "+(0,s.zw)(e.agriculturalCount)+" "+(0,s.zw)(e.agriculturalUnit),1)))),128))]),(0,l._)("div",null,[(0,l._)("p",null,(0,s.zw)(o.detail.farmRecordBo.workText||"无备注"),1),(0,l._)("p",null,(0,s.zw)(o.detail.farmRecordBo.userName),1)])])])):(0,l.kq)("",!0),o.detail.status>1&&e.$store.state.power.checkTaskBtn?((0,l.wg)(),(0,l.iD)("div",J,[M,(0,l._)("div",null,"检查结果："+(0,s.zw)([0,0,"合格","不合格","打回"][o.detail.status]),1),Q,(0,l._)("div",E,[(0,l._)("div",X,(0,s.zw)(o.detail.opinion),1)])])):(0,l.kq)("",!0),o.showTextArea||1!=o.detail.status?(0,l.kq)("",!0):((0,l.wg)(),(0,l.j4)(r,{key:6,onClick:a[2]||(a[2]=e=>o.showTextArea=!0),type:"primary",link:"",style:{"margin-top":"20px"}},{default:(0,l.w5)((()=>[ee,ae])),_:1})),o.showTextArea?((0,l.wg)(),(0,l.iD)("div",te,[le,(0,l._)("div",null,[(0,l._)("div",null,[se,(0,l.Wm)(u,{modelValue:o.isPass,"onUpdate:modelValue":a[3]||(a[3]=e=>o.isPass=e),class:"ml-4"},{default:(0,l.w5)((()=>[(0,l.Wm)(d,{label:"2"},{default:(0,l.w5)((()=>[ie])),_:1}),(0,l.Wm)(d,{label:"3"},{default:(0,l.w5)((()=>[oe])),_:1}),(0,l.Wm)(d,{label:"4"},{default:(0,l.w5)((()=>[ne])),_:1})])),_:1},8,["modelValue"])])]),(0,l._)("div",re,[de,(0,l.Wm)(c,{modelValue:o.textarea,"onUpdate:modelValue":a[4]||(a[4]=e=>o.textarea=e),rows:5,type:"textarea",placeholder:"输入检查意见"},null,8,["modelValue"])])])):(0,l.kq)("",!0),o.showTextArea?((0,l.wg)(),(0,l.iD)("div",ue,[(0,l.Wm)(r,{type:"primary",plain:"",onClick:a[5]||(a[5]=e=>o.showTextArea=!1)},{default:(0,l.w5)((()=>[ce])),_:1}),(0,l.Wm)(r,{type:"primary",onClick:n.submitCheck,loading:o.submitting},{default:(0,l.w5)((()=>[pe])),_:1},8,["onClick","loading"])])):(0,l.kq)("",!0),(0,l._)("div",ge,[(0,l.Wm)(r,{type:"primary",plain:"",onClick:n.delTask},{default:(0,l.w5)((()=>[me])),_:1},8,["onClick"])])])),[[m,o.detailLoading]])])),_:1},8,["before-close","modelValue"]),o.showDetail?((0,l.wg)(),(0,l.j4)(g,{key:0,title:o.detailTitle,id:o.detailId,onClose:n.closeDetail,onLoad:n.getData},null,8,["title","id","onClose","onLoad"])):(0,l.kq)("",!0)])}var we=t(6571),ke=t(2335),ve={name:"taskDetail",props:["id"],data(){return{detailLoading:!1,showDetailBox:!0,detail:{farmRecordBo:{farmUseBos:[]}},showTextArea:!1,textarea:"",isPass:"2",submitting:!1,showDetail:!1,detailTitle:"",detailId:""}},components:{PlantCropsDetailCDialogDetail:we.Z},mounted(){this.getData()},methods:{delTask(){this.ajax.post("/api/v1/adam/task/deleteTask",{taskId:this.detail.id}).then((e=>{this.$message.success("删除成功"),this.onClose(1)}))},showDetailClick(e){this.detailTitle="农事记录详情",this.detailId=this.detail.farmRecordBo.id,this.showDetail=!0},view(e){window.open(e)},closeDetail(){setTimeout((()=>{this.showDetail=!1}),300)},getData(){this.detailLoading=!0,this.ajax.post("/api/v1/adam/task/taskDetail",{taskId:this.id}).then((e=>{this.detailLoading=!1,e.data.startTime=ke.Z.time("y-m-d h:i:s",e.data.startTime),e.data.endTime=ke.Z.time("y-m-d h:i:s",e.data.endTime),e.data.createTime=ke.Z.time("y-m-d h:i:s",e.data.createTime),e.data.executors=JSON.parse(e.data.executors),e.data.farmRecordBo=e.data.farmRecordBo||{farmUseBos:{}},e.data.farmRecordBo.farmUseBos=e.data.farmRecordBo.farmUseBos||{},e.data.agricultural=e.data.agricultural?JSON.parse(e.data.agricultural):[],e.data.agricultural=e.data.agricultural.map((e=>(e.agriculturalType||e.agricultural||(e.agricultural=e.agriculturalBo.title,e.agriculturalType=e.agriculturalBo.agriculturalCategory),e))),this.detail=e.data}))},onClose(e=null){"function"==typeof e&&(e=null),this.$emit("onCloseDetail",e),this.showDetailBox=!1},submitCheck(){this.submitting=!0,this.ajax.post("/api/v1/adam/task/taskCheck",{checkStatus:this.isPass,taskId:this.id,taskOpinion:this.textarea}).then((e=>{this.submitting=!1,this.$message.success("提交成功"),this.onClose(1)}))}}},_e=t(8118);const fe=(0,_e.Z)(ve,[["render",he],["__scopeId","data-v-7ca620d1"]]);var De=fe;const Ce=e=>((0,l.dD)("data-v-bf5f0cfe"),e=e(),(0,l.Cn)(),e),ye={class:"taskDetail purchaseDetailBox"},xe={class:"taskDetailInner purchaseDetailBoxInner"},Te={class:"item"},be=Ce((()=>(0,l._)("p",{class:"title"},"园区：",-1))),ze={class:"item"},Be=Ce((()=>(0,l._)("p",{class:"title"},"作物：",-1))),Ue={class:"item"},We=Ce((()=>(0,l._)("p",{class:"title"},"具体内容：",-1))),Ve={class:"item",style:{"align-items":"flex-start"}},Pe=Ce((()=>(0,l._)("p",{class:"title"},"需用农资：",-1))),Ie={class:"nz"},je={class:"nzBox"},qe={class:"tag"},Le=Ce((()=>(0,l._)("span",null,null,-1))),Se=["onClick"],Ne=Ce((()=>(0,l._)("i",{class:"erp erpicon_tianjia"},null,-1))),Ye=(0,l.Uk)(" 添加农资"),$e=[Ne,Ye],Re={class:"item"},Ke=Ce((()=>(0,l._)("p",{class:"title"},"操作指导：",-1))),Oe={class:"upload"},Ae=["src"],Ge={key:2,class:"uploadBox"},Fe={key:1},He=Ce((()=>(0,l._)("i",{class:"erp erpshangchuan"},null,-1))),Ze=[He],Je={key:2},Me={class:"item"},Qe=Ce((()=>(0,l._)("p",{class:"title"},"执行人：",-1))),Ee={class:"item"},Xe=Ce((()=>(0,l._)("p",{class:"title"},"开始时间：",-1))),ea={class:"item"},aa=Ce((()=>(0,l._)("p",{class:"title"},"截止时间：",-1))),ta={class:"btns"},la=(0,l.Uk)("取消"),sa=(0,l.Uk)("确定");function ia(e,a,t,i,o,n){const r=(0,l.up)("el-option"),d=(0,l.up)("el-select"),u=(0,l.up)("el-input"),c=(0,l.up)("el-progress"),p=(0,l.up)("el-date-picker"),g=(0,l.up)("el-button"),m=(0,l.up)("el-dialog"),h=(0,l.up)("PlantCropsDetailBDialogChose"),w=(0,l.Q2)("loading");return(0,l.wg)(),(0,l.iD)("div",ye,[(0,l.Wm)(m,{"custom-class":"taskDetail purchaseDetailBox","before-close":n.onClose,"append-to-body":"",modelValue:o.showDetailBox,"onUpdate:modelValue":a[9]||(a[9]=e=>o.showDetailBox=e),title:"创建任务",width:"700px"},{default:(0,l.w5)((()=>[(0,l.wy)(((0,l.wg)(),(0,l.iD)("div",xe,[(0,l._)("div",Te,[be,(0,l.Wm)(d,{modelValue:o.selectedGarden,"onUpdate:modelValue":a[0]||(a[0]=e=>o.selectedGarden=e),style:{width:"650px"},class:"m-2",placeholder:"请选择园区"},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(o.gardenList,((e,a)=>((0,l.wg)(),(0,l.j4)(r,{key:a,label:e.title,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])]),(0,l._)("div",ze,[Be,(0,l.Wm)(d,{modelValue:o.selectedPlant,"onUpdate:modelValue":a[1]||(a[1]=e=>o.selectedPlant=e),multiple:"",style:{width:"650px"},class:"m-2",placeholder:"请选择作物"},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(o.plantList,((e,a)=>((0,l.wg)(),(0,l.j4)(r,{key:a,label:e.categoryTitle+"-"+e.address,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])]),(0,l._)("div",Ue,[We,(0,l.Wm)(u,{modelValue:o.taskContent,"onUpdate:modelValue":a[2]||(a[2]=e=>o.taskContent=e),style:{width:"650px"},placeholder:"请输入内容"},null,8,["modelValue"])]),(0,l._)("div",Ve,[Pe,(0,l._)("div",Ie,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(o.farmUseBos,((e,a)=>((0,l.wg)(),(0,l.iD)("div",{class:"nzItem",key:e.id},[(0,l._)("div",je,[(0,l._)("span",null,[(0,l._)("span",qe,(0,s.zw)(e.agriculturalType),1)]),Le,(0,l._)("span",null,(0,s.zw)(e.agricultural),1)]),(0,l._)("i",{class:"erp erpshanchu",onClick:e=>n.removeNz(a)},null,8,Se)])))),128)),(0,l._)("div",{class:"nzAdd",onClick:a[3]||(a[3]=(...e)=>n.addNz&&n.addNz(...e))},$e)])]),(0,l._)("div",Re,[Ke,(0,l._)("div",Oe,[o.video?((0,l.wg)(),(0,l.iD)("video",{key:0,controls:"",src:o.video,alt:""},null,8,Ae)):(0,l.kq)("",!0),o.video?((0,l.wg)(),(0,l.iD)("i",{key:1,class:"erp erpguanbi",onClick:a[4]||(a[4]=e=>o.video="")})):(0,l.kq)("",!0),o.video?(0,l.kq)("",!0):((0,l.wg)(),(0,l.iD)("div",Ge,[o.uploading?(0,l.kq)("",!0):((0,l.wg)(),(0,l.iD)("input",{key:0,onChange:a[5]||(a[5]=(...e)=>n.uploadFile&&n.uploadFile(...e)),ref:"file",type:"file"},null,544)),o.uploading?(0,l.kq)("",!0):((0,l.wg)(),(0,l.iD)("p",Fe,Ze)),o.uploading?(0,l.kq)("",!0):((0,l.wg)(),(0,l.iD)("p",Je,"点击上传视频")),o.uploading?((0,l.wg)(),(0,l.j4)(c,{key:3,width:90,type:"circle",percentage:o.percentage},null,8,["percentage"])):(0,l.kq)("",!0)]))])]),(0,l._)("div",Me,[Qe,(0,l.Wm)(d,{modelValue:o.selectedUser,"onUpdate:modelValue":a[6]||(a[6]=e=>o.selectedUser=e),multiple:"",style:{width:"650px"},class:"m-2",placeholder:"请选择执行人"},{default:(0,l.w5)((()=>[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(o.userlist,((e,a)=>((0,l.wg)(),(0,l.j4)(r,{key:a,label:e.name,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])]),(0,l._)("div",Ee,[Xe,(0,l.Wm)(p,{"value-format":"YYYY-MM-DD",style:{width:"650px"},modelValue:o.startTime,"onUpdate:modelValue":a[7]||(a[7]=e=>o.startTime=e),type:"date",placeholder:"请选择开始时间"},null,8,["modelValue"])]),(0,l._)("div",ea,[aa,(0,l.Wm)(p,{style:{width:"650px"},"value-format":"YYYY-MM-DD",modelValue:o.endTime,"onUpdate:modelValue":a[8]||(a[8]=e=>o.endTime=e),type:"date",placeholder:"请选择截止时间"},null,8,["modelValue"])])])),[[w,o.detailLoading]]),(0,l._)("div",ta,[(0,l.Wm)(g,{plain:"",onClick:n.onClose},{default:(0,l.w5)((()=>[la])),_:1},8,["onClick"]),(0,l.Wm)(g,{type:"primary",onClick:n.submit,loading:o.submitting},{default:(0,l.w5)((()=>[sa])),_:1},8,["onClick","loading"])])])),_:1},8,["before-close","modelValue"]),o.showChose?((0,l.wg)(),(0,l.j4)(h,{key:0,onSave:n.save,onChose:n.chose,selected:o.farmUseBos,onClose:n.closeChose,neednum:"no"},null,8,["onSave","onChose","selected","onClose"])):(0,l.kq)("",!0)])}var oa=t(3483),na=t(8618),ra={name:"taskDetail",props:["id"],data(){return{detailLoading:!1,showDetailBox:!0,detail:"",showTextArea:!1,textarea:"",isPass:"1",selectedGarden:"",selectedPlant:[],selectedUser:[],gardenList:[],plantList:[],userlist:[],taskContent:"",startTime:"",endTime:"",video:"",uploading:!1,percentage:0,searchCropLoading:!1,submitting:!1,showChose:!1,farmUseBos:[],agricultural:[]}},mounted(){let e=this,a=async function(){await e.getGardenList(),await e.getUserlist()};a()},watch:{selectedGarden(){this.plantList=[],this.selectedPlant="",this.ajax.post("/api/v1/adam/task/getPlantsByGarden",{gardenId:this.selectedGarden}).then((e=>{console.log(e.data),this.plantList=e.data}))}},components:{PlantCropsDetailBDialogChose:na.Z},methods:{closeChose(){setTimeout((()=>{this.showChose=!1}),300)},chose(e){console.log(e);let a=[...this.farmUseBos,...e].map((e=>(e.agriculturalCount=Number(e.agriculturalCount),e)));var t=function(e){for(var a=[],t=[],l=0;l<e.length;l++)t.indexOf(e[l].agricultural)>-1?a[t.indexOf(e[l].agricultural)].agriculturalCount=e[l].agriculturalCount:(t.push(e[l].agricultural),e[l].isUse=1,a.push(e[l]));return a};this.farmUseBos=t(a)},removeNz(e){this.farmUseBos.splice(e,1)},save(e){this.farmUseBos.push(e)},addNz(){this.showChose=!0},getGardenList(){return new Promise(((e,a)=>{this.ajax.post("/api/v1/adam/garden/list",{pageNum:1,pageSize:100,param:{}}).then((a=>{this.gardenList=a.data,e()}))}))},getUserlist(){return new Promise(((e,a)=>{this.ajax.post("/api/v1/adam/task/getOrganizationUsers",{pageNum:1,pageSize:100,param:{}}).then((a=>{this.userlist=a.data,e()}))}))},onClose(e=null){"function"==typeof e&&(e=null),this.$emit("onCloseCreate",e),this.showDetailBox=!1},uploadFile(){this.uploading=!0;let e=this.$refs.file.files[0];(0,oa.Z)(e,`erp/park/${e.name}`).then((e=>{e.url&&(this.video=e.url,this.uploading=!1,this.percentage=0)}))},searchCrop(){},submit(){let e="";if(this.gardenList.map((a=>{a.id==this.selectedGarden&&(e=a.title)})),!this.selectedGarden)return void this.$message.warning("请选择园区");if(0==this.selectedPlant.length)return void this.$message.warning("请选择作物");if(!this.taskContent)return void this.$message.warning("请输入具体内容");if(0==this.selectedUser.length)return void this.$message.warning("请选择执行人");if(!this.startTime)return void this.$message.warning("请选择开始时间");if(!this.endTime)return void this.$message.warning("请选择截止时间");let a=this.selectedUser.map((e=>{let a={id:"",name:""};return this.userlist.map((t=>{e==t.id&&(a.id=t.id,a.name=t.name)})),a}));this.submitting=!0,this.ajax.post("/api/v1/adam/task/createTask",{endTime:this.endTime,executors:JSON.stringify(a),gardenId:this.selectedGarden,gardenTitle:e,growPlants:this.selectedPlant,opinion:"",reWire:this.video,startTime:this.startTime,taskContent:this.taskContent,agricultural:JSON.stringify(this.farmUseBos)}).then((e=>{this.submitting=!1,200==e.code&&1==e.data?(this.onClose(1),this.showDetailBox=!1):this.$message.error(e.message)}))}}};const da=(0,_e.Z)(ra,[["render",ia],["__scopeId","data-v-bf5f0cfe"]]);var ua=da,ca={name:"task",data(){return{status:[{title:"全部",value:"-1",sup:0},{title:"待执行",value:"0",sup:0},{title:"待检查",value:"1",sup:0},{title:"合格",value:"2",sup:0},{title:"不合格",value:"3",sup:0}],loading:!1,currentStatus:"-1",searchKey:"",searchLoading:!1,list:[],currentPage:1,pageSize:10,total:0,showDetailBox:!1,showCreateBox:!1,currentId:""}},components:{TaskDetail:De,TaskCreate:ua},mounted(){this.getData(),this.getStatus_1()},methods:{statusClick(e){this.currentStatus=e,this.getData()},getStatus_1(){this.ajax.post("/api/v1/adam/task/manageTaskList",{pageNum:this.currentPage,pageSize:10,param:{gardenId:"",growPlantId:"",status:1,keyWord:""}}).then((e=>{this.status[2].sup=e.total}))},getData(){this.loading=!0,this.ajax.post("/api/v1/adam/task/manageTaskList",{pageNum:this.currentPage,pageSize:10,param:{gardenId:-1,growPlantId:-1,status:this.currentStatus,keyWord:this.searchKey}}).then((e=>{this.list=e.data.map((e=>{switch(e.executors=JSON.parse(e.executors),e.status){case 0:e.statusText="待执行",e.color="#A8A8A8";break;case 1:e.statusText="待检查",e.color="#1890FF";break;case 2:e.statusText="合格",e.color="#0DD71C";break;case 3:e.statusText="不合格",e.color="#FF4949";break;case 4:e.statusText="打回",e.color="#FF4949";break}return e})),this.total=e.total,this.loading=!1}))},showDetail(e){this.currentId=e,this.showDetailBox=!0},onCloseDetail(e){1==e&&this.getData();let a=setTimeout((()=>{this.showDetailBox=!1,clearTimeout(a)}),500)},onCloseCreate(e){1==e&&this.getData(),console.log(e);let a=setTimeout((()=>{this.showCreateBox=!1,clearTimeout(a)}),500)}}};const pa=(0,_e.Z)(ca,[["render",f],["__scopeId","data-v-2caff9b6"]]);var ga=pa},8090:function(e,a,t){e.exports=t.p+"img/0.b107b999.png"},7795:function(e,a,t){e.exports=t.p+"img/1.a4a41189.png"},7913:function(e,a,t){e.exports=t.p+"img/2.16b2581e.png"},9536:function(e,a,t){e.exports=t.p+"img/3.6bfbb5bf.png"}}]);
//# sourceMappingURL=641.f3c2e65b.js.map