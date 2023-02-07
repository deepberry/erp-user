<template>
    <div class="stockPut inner">
        <div class="box">
            <div class="head">
                <el-button link type="primary" @click="back"
                    ><i
                        class="erp erpfanhui"
                        style="font-size: 14px; margin-right: 5px; position: relative; top: -1px"
                    ></i>
                    返回</el-button
                >
                <span style="position: relative; top: 2px; font-size: 15px">农资入库</span>
            </div>
            <div class="content" v-loading="loading">
                <div class="item" v-for="(item, index) in list" :key="index">
                    <div class="info">
                        <p>
                            <span>{{ item.agriculturalBo.title }}</span>
                            <span class="tag">{{ item.agriculturalBo.agriculturalCategory }}</span>
                        </p>
                        <p>{{ item.agriculturalBo.manufacturers }}</p>
                        <p>
                            规格：{{ item.agriculturalBo.agriculturalCount }}{{ item.agriculturalBo.unitweight }}/{{
                                item.agriculturalBo.unitmeasurement
                            }}
                        </p>
                    </div>
                    <div class="info">
                        <p style="color: #409eff">
                            库存：{{ item.agriculturalUnit }}{{ item.agriculturalBo.unitmeasurement }} (共{{
                                item.agriculturalCount
                            }}{{ item.agriculturalBo.unitweight }})
                        </p>
                        <p>
                            <span>入库数量：</span>
                            <el-input size="small" style="width: 70px; margin-right: 10px" v-model="item.num" />
                            <span>{{ item.agriculturalBo.unitweight }}</span>
                        </p>
                        <p v-if="index == 0">
                            <el-button size="small" type="primary" @click="add">
                                <i style="font-size: 12px; margin-right: 5px" class="erp erpicon_tianjia"></i> 添加
                            </el-button>
                        </p>
                    </div>
                </div>
                <div class="item log">
                    <p>
                        <span class="must">*</span> 入库类型：
                        <el-select v-model="defaultType" class="m-2" style="width: 220px" placeholder="请选择入库类型">
                            <el-option v-for="item in typeList" :key="item.id" :label="item.title" :value="item.id" />
                        </el-select>
                    </p>
                    <p>
                        <span class="must">*</span> 入库时间：
                        <el-date-picker v-model="outInTime" type="datetime" placeholder="请选择时间" />
                    </p>
                    <p v-show="defaultType == backUser">
                        <span class="must">*</span> 退回人：
                        <el-select
                            v-model="userName"
                            class="m-2"
                            style="width: 220px; margin-left: 14px"
                            placeholder="请选择退回人"
                        >
                            <el-option v-for="item in userlist" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select>
                    </p>
                </div>
                <div class="item">
                    <p class="title"><span class="must">*</span> 单据、凭证、照片：</p>
                    <div class="pics">
                        <div class="img" v-for="(item, imgIndex) in imgs" :key="imgIndex">
                            <img :src="item" alt="" />
                            <i class="erp erpguanbi" @click="removeImg(imgIndex)"></i>
                        </div>
                        <div class="upload" v-if="imgs.length < 2">
                            <input v-if="!uploading" @change="uploadFile" ref="file" type="file" />
                            <p v-if="!uploading"><i class="erp erpshangchuan"></i></p>
                            <p v-if="!uploading">点击上传单据、凭证、照片</p>
                            <el-progress v-if="uploading" width="90" type="circle" :percentage="percentage" />
                        </div>
                    </div>
                </div>
                <div class="item">
                    <p class="title">备注：</p>
                    <el-input v-model="note" :rows="5" type="textarea" placeholder="输入备注内容" />
                </div>
                <div class="item">
                    <el-button type="primary" @click="submit" :loading="submitting">提交</el-button>
                </div>
            </div>
        </div>
        <StockReg
            title="请选择要操作的农资"
            v-if="showReg"
            default="1"
            :selected="selected"
            @onSubmit="onRegSubmit"
            @closeReg="closeReg"
        ></StockReg>
    </div>
</template>

<script lang="js">
import upload from '@/utils/upload';
import { ElMessage, ElMessageBox } from "element-plus";
import StockReg from '@/components/stock/StockReg.vue';
export default {
    name: "stockPut",
    data() {
        return {
            loading: false,
            list: [],
            defaultType: '',
            backUser: '', // 入库类型为【已领用退回】的值
            typeList: [], // 入库类型
            userlist: [], // 用户列表
            userName: '',
            num: '', // 出库数量
            outInTime: new Date(),
            note: '',
            showReg: false,
            uploading: false,
            imgs: [],
            percentage: 0, // 上传进度
            submitting: false,
            selected: [], // 已选的农资
        }
    },
    components: {
        StockReg
    },
    mounted() {
        // 获取详情数据
        let t = this;
        const ajax = async function (){
            t.loading = true;
            await t.getDetail();
            await t.getPutTypeList();
            await t.getUserList();
            t.loading = false;
        }
        ajax();
    },
    methods: {
        // 添加
        add (){
            this.selected = this.list.map(item => {
                return item.agriculturalBo.id;
            })
            this.showReg = true;
        },
        // 获取详情
        getDetail (){
            return new Promise ((a,b) => {
                this.ajax.post('/api/v1/adam/farmLand/agricultural-detail', {
                    id: this.$route.query.id
                }).then(r => {
                    r.data.num = '';
                    this.list.push(r.data);
                    a();
                })
            })
        },
        // 获取入库类型
        getPutTypeList (){
            return new Promise ((a,b) => {
                this.ajax.post('/api/v1/adam/farmLand/getStorageType').then(r => {
                    this.typeList = r.data;
                    r.data.map(item => {
                        if(item.title == '已领用退回'){
                            this.backUser = item.id;
                        }
                    })
                    a();
                })
            })
        },
        // 获取用户列表
        getUserList (){
            return new Promise ((a,b) => {
                this.ajax.post('/api/v1/adam/task/getOrganizationUsers').then(r => {
                    this.userlist = r.data;
                    a();
                })
            })
        },
        // 返回列表
        back() {
            this.$router.push("/erp/stock");
        },
        // 关闭登记新农资的弹窗
        closeReg (){
            let timer = setTimeout(() => {
                this.showReg = false;
                clearTimeout(timer);
            }, 500);
        },
        onRegSubmit (v){
            let r = [];
            v.map(item => {
                let isset = false;
                this.list.map(l => {
                    if(item.id == l.id){
                        isset = true;
                    }
                })
                if(!isset){
                    item.agriculturalBo = JSON.parse(JSON.stringify(item));
                    r.push(item);
                }
            })
            this.list = [...this.list, ...r];
        },
        // 上传图片
        uploadFile (){
            this.uploading = true;
            let file = this.$refs.file.files[0];
            upload(file, `erp/materialsInto/${file.name}`).then(r => {
                if(r.url){
                    this.imgs.push(r.url);
                    this.uploading = false;
                    this.percentage = 0;
                }
            })
        },
        // 移除图片
        removeImg (index){
            console.log(index)
            this.imgs.splice(index, 1);
        },
        // 提交入库
        submit (){
            // 处理参数
            let haveEmptyNum = -1;
            let emptyNumName = '';
            let agriculturalOutInBos = this.list.map((item, index) => {
                if(!item.num && haveEmptyNum == -1){
                    haveEmptyNum = index;
                    emptyNumName = item.agriculturalBo.title;
                }
                return {
                    agriculturalCount: item.num,
                    id: item.id,
                    title: item.agriculturalBo.title
                }
            })
            ElMessageBox.confirm(
                `农资名称：${agriculturalOutInBos.map(i => i.title).join('、')} <br> 确定要入库吗？`,
                "农资入库",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    dangerouslyUseHTMLString: true,
                }
            )
            .then(() => {
                if(haveEmptyNum > -1){
                    this.$message.warning(`请输入 [ ${emptyNumName} ] 的入库数量`);
                    return;
                }
                if(!this.defaultType){
                    this.$message.warning('请选择入库类型');
                    return;
                }
                if(!this.outInTime){
                    this.$message.warning('请选择入库时间');
                    return;
                }
                if(this.defaultType == this.backUser && !this.userName){
                    this.$message.warning('请输入退回人');
                    return;
                }
                if(this.imgs.length <= 0){
                    this.$message.warning('请上传凭证');
                    return;
                }
                let workTypeName = '';
                this.typeList.map(item => {
                    if(item.id == this.defaultType){
                        workTypeName = item.title;
                    }
                })
                let username = '';
                if(this.userName){
                    this.userlist.map(item => {
                        if(item.id == this.userName){
                            username = item.name;
                        }
                    })
                }
                this.submitting = true;
                this.ajax.post('/api/v1/adam/farmLand/saveAgriculturalStorage', {
                    agriculturalOutInBos,
                    image: this.imgs.join(','),
                    outInTime: this.outInTime,
                    remark: this.note,
                    type: 0,
                    workAid: this.userName,
                    username,
                    workType: this.defaultType,
                    workTypeName
                }).then(r => {
                    if(r.code == 200){
                        this.$message.success('入库成功！');
                        let t = setTimeout(() => {
                            this.$router.push("/erp/stock");
                            clearTimeout(t);
                        }, 800)
                    }else{
                        this.$message.error('操作失败，请联系管理员！');
                    }
                })
            })
            .catch(() => {});
        }
    },
}
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
.content {
    width: calc(100% - 200px);
    height: calc(100% - 100px);
    overflow-x: hidden;
    overflow-y: auto;
    padding: 20px 100px;
    .item {
        padding: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.09);
        .must {
            color: red;
        }
        .info {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 10px 0;
            p {
                width: 300px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .tag {
                    background: #c3f8c7;
                    color: #000000;
                    display: inline-block;
                    padding: 2px 10px;
                    font-size: 12px;
                    border-radius: 3px;
                    margin-left: 10px;
                }
            }
        }
        .title {
            padding-bottom: 10px;
        }
        .pics {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            .img {
                width: 180px;
                height: 100px;
                border-radius: 5px;
                margin: 0 10px;
                position: relative;
                overflow: hidden;
                img {
                    width: 180px;
                    height: 100px;
                }
                i {
                    display: inline-block;
                    font-size: 14px;
                    color: #ffffff;
                    position: absolute;
                    top: 0;
                    right: 0;
                    cursor: pointer;
                    background: rgba(0, 0, 0, 0.5);
                    padding: 5px;
                }
            }
            .upload {
                width: 180px;
                height: 100px;
                border-radius: 5px;
                background: rgba(244, 248, 251, 1);
                display: flex;
                justify-content: center;
                align-content: center;
                flex-wrap: wrap;
                font-size: 12px;
                color: rgba(107, 145, 242, 1);
                cursor: pointer;
                position: relative;
                p {
                    width: 100%;
                    text-align: center;
                    padding: 5px 0;
                    i {
                        font-size: 22px;
                    }
                }
                input {
                    width: 180px;
                    height: 100px;
                    background: rgba(0, 0, 0, 0.5);
                    position: absolute;
                    top: 0;
                    left: 0;
                    cursor: pointer;
                    opacity: 0;
                }
                .el-progress--circle {
                    position: absolute;
                    top: 5px;
                    z-index: 10;
                }
            }
        }
    }
    .item.log {
        p {
            padding: 10px 0;
        }
    }
    .item:last-child {
        border: none;
    }
}
</style>
