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
                <span style="position: relative; top: 2px; font-size: 15px">发起申领</span>
            </div>
            <div class="content">
                <el-button plain type="primary" style="margin-bottom: 20px" @click="showChose = true">
                    <i style="font-size: 14px; margin-right: 5px" class="erp erpicon_tianjia"></i> 添加
                </el-button>
                <div class="item" v-for="(item, index) in list" :key="index">
                    <p class="title">{{ item.agriculturalBo.title }}</p>
                    <div class="unit" style="padding: 20px 0">
                        <p>
                            <span class="tag">{{ item.agriculturalBo.agriculturalCategory }}</span>
                        </p>
                        <p style="color: #409eff">
                            库存量：{{ item.agriculturalUnit }}{{ item.agriculturalBo.unitmeasurement }}共{{
                                item.agriculturalCount
                            }}{{ item.agriculturalBo.unitweight }}
                        </p>
                    </div>
                    <div class="unit">
                        <p>{{ item.agriculturalBo.manufacturers }}</p>
                        <p>
                            ({{ item.agriculturalBo.agriculturalCount }}{{ item.agriculturalBo.unitweight }}/{{
                                item.agriculturalBo.unitmeasurement
                            }})
                        </p>
                    </div>
                    <div class="num">
                        <p>出库数量：</p>
                        <el-input style="width: 120px; margin: 0 10px" v-model="item.num" placeholder="请输入数量" />
                        <p>{{ item.agriculturalBo.unitweight }}</p>
                    </div>
                </div>
                <div class="step">
                    <p class="title">审核流程</p>
                    <div class="stepList">
                        <template v-for="(item, uindex) in userChosed" :key="uindex">
                            <el-tag closable @close="delUser(uindex)">{{ item.name }}</el-tag>
                            <i class="erp erpxiangyou1"></i>
                        </template>
                        <el-button
                            type="primary"
                            style="width: 28px"
                            plain
                            size="small"
                            v-if="!showSelect"
                            @click="showSelect = true"
                        >
                            <i class="erp erpicon_tianjia"></i>
                        </el-button>
                        <el-select
                            v-if="showSelect"
                            @change="select"
                            v-model="currentChose"
                            size="small"
                            style="margin-right: 10px"
                            placeholder="请选择用户"
                        >
                            <el-option
                                v-for="item in userlist"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
                <el-button type="primary" style="margin-top: 20px" @click="submit" :loading="submitting"
                    >提交</el-button
                >
            </div>
        </div>
        <MyStartChose v-if="showChose" @onClose="closeReg" @submit="chose"></MyStartChose>
    </div>
</template>

<script lang="js">
import MyStartChose from '@/components/my/MyStartChose';
import timer from "@/utils/timer.js";
export default {
    name: "stockPut",
    props: ["id"],
    data() {
        return {
            list: [], // 已选择的列表
            userlist: [], // 用户列表
            userChosed: [], // 已添加到流程的用户
            currentChose: '', // 当前选择的用户，只用于下拉框临时存值
            showSelect: false, // 是否显示下拉框
            note: '',
            showChose: false,
            input: '',
            submitting: false,
        }
    },
    mounted() {
        this.getUserlist();
        this.getStep();
    },
    components: {
        MyStartChose
    },
    methods: {
        // 获取用户列表
        getUserlist (){
            this.ajax.post('/api/v1/adam/task/getOrganizationUsers').then(r => {
                this.userlist = r.data;
            })
        },
        // 获取上次的审核流程
        getStep (){
            this.ajax.post('/api/v1/adam/workOrder/getManager-list').then(r => {
                this.userChosed = r.data.map(item => {
                    item.name = item.username;
                    item.id = item.aid;
                    return item;
                })
            })
        },
        // 返回列表
        back() {
            this.$router.push("/erp/my/product");
        },
        // 关闭登记新农资的弹窗
        closeReg (){
            let timer = setTimeout(() => {
                this.showChose = false;
                clearTimeout(timer);
            }, 500);
        },
        // 选择农资
        chose (v){
            this.list = [...this.list, ...v];
        },
        // 选择用户
        select (v){
            this.userlist.map(item => {
                if(item.id == v){
                    this.userChosed.push(item);
                }
            })
            this.currentChose = '';
            this.showSelect = false;
        },
        // 移除筛选
        delUser (index){
            console.log(index)
            this.userChosed.splice(index, 1);
        },
        // 提交工单
        submit (){
            if(this.list.length == 0){
                this.$message.warning('请选择农资');
                return;
            }
            if(this.userChosed.length == 0){
                this.$message.warning('请选择审核人');
                return;
            }
            let orderManagerBoList = this.userChosed.map(item => {
                return {
                    aid: item.id,
                    username: item.name
                }
            })
            let orderWorkBoList = this.list.map(item => {
                return {
                    agriculturalId: item.agriculturalBo.id,
                    id: item.id,
                    orderCount: item.num
                }
            })
            console.log(orderWorkBoList)
            let empty = false;
            orderWorkBoList.map(item => {
                if(!item.orderCount) empty = true;
            })
            if(empty){
                this.$message.warning('请输入农资数量');
                return;
            }
            this.submitting = true;
            this.ajax.post('/api/v1/adam/workOrder/saveWorkOrder', {
                orderManagerBoList, orderWorkBoList
            }).then(r => {
                this.submitting = false;
                if(r.code == 200){
                    this.$message.success('提交成功！');
                    let t = setTimeout(() => {
                        this.$router.push('/erp/my/product');
                        clearTimeout(t);
                    }, 500)
                }else{
                    this.$message.error(r.message);
                }
            })
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
    .tag {
        background: #c3f8c7;
        color: #000000;
        display: inline-block;
        padding: 2px 10px;
        font-size: 12px;
        border-radius: 3px;
    }
    .item {
        width: 400px;
        background: #f4f8fb;
        padding: 20px;
        border-radius: 18px;
        margin: 20px 0;
        p.tagBox {
            padding: 20px 0;
            .tag {
                margin-left: 0;
            }
        }
        .unit {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: rgba(175, 175, 175, 1);
        }
        .num {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 20px;
        }
    }
    .step {
        border-bottom: 1px solid rgba(0, 0, 0, 0.09);
        border-top: 1px solid rgba(0, 0, 0, 0.09);
        padding: 20px 0;
        .stepList {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 20px;
            i {
                margin: 0 10px;
            }
            i.erpxiangyou1 {
                color: rgba(219, 219, 219, 1);
            }
            i.erpicon_tianjia {
                padding: 10px;
            }
        }
    }
}
</style>
