<template>
    <div class="stockPut inner">
        <div class="box">
            <div class="head">
                <el-button link type="primary" @click="back">
                    <i
                        class="erp erpfanhui"
                        style="font-size: 14px; margin-right: 5px; position: relative; top: -1px"
                    ></i>
                    返回
                </el-button>
                <span style="position: relative; top: 2px; font-size: 15px">历史种植详情</span>
            </div>
            <div class="main" v-loading="loading">
                <div class="wrap">{{ detail.categoryTitle }}</div>
                <div class="wrap info">
                    <div class="plant">
                        <img :src="detail.image" alt="" />
                        <div>
                            <p>{{ detail.categoryTitle }}-{{ detail.varietyTitle }}-{{ detail.address }}</p>
                            <p><span>面积：</span>{{ detail.area }}亩</p>
                            <p><span>产量：</span>{{ detail.weightAll }}公斤</p>
                        </div>
                    </div>
                    <div class="space"></div>
                    <div class="time">
                        <div class="start">
                            <p>{{ detail.plantTime }}</p>
                            <p>开始时间</p>
                        </div>
                        <div class="line">
                            <img src="../../assets/img/img-jiantou.png" alt="" />
                        </div>
                        <div class="start">
                            <p>{{ detail.endTime }}</p>
                            <p>结束时间</p>
                        </div>
                    </div>
                </div>
                <div class="t">历史种植数据：</div>
                <div class="list">
                    <div class="table">
                        <div class="tableTitle">（采收统计）</div>
                        <div class="tableItem tableHead">
                            <p>采收时间</p>
                            <p>重量</p>
                        </div>
                        <div class="tableItems">
                            <el-empty description="暂无数据" v-if="reap.length == 0" />
                            <div class="tableItem" v-for="(item, index) in reap" :key="index">
                                <p>{{ item.workTime }}</p>
                                <p>{{ item.weightAll || 0 }}</p>
                            </div>
                            <div class="tableItem tableAll" v-if="reap.length > 0">
                                <p>合计</p>
                                <p>{{ reapCount }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="table">
                        <div class="tableTitle">（农资使用）</div>
                        <div class="tableItem tableHead">
                            <p>类型</p>
                            <p>用量</p>
                        </div>
                        <div class="tableItems">
                            <el-empty description="暂无数据" v-if="farmUseBos.length == 0" />
                            <div class="tableItem" v-for="(item, index) in farmUseBos" :key="index">
                                <p>{{ item.agricultural }}</p>
                                <p
                                    style="color: #6397fd; cursor: pointer; text-decoration: underline"
                                    @click="
                                        $store.state.power.agricultureMaterialsBtn
                                            ? showDialogBox('农资使用统计', item.id)
                                            : () => {}
                                    "
                                >
                                    {{ item.agriculturalCount || 0 }}{{ item.agriculturalUnit }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="table">
                        <div class="tableTitle">（工时统计）</div>
                        <div class="tableItem tableHead">
                            <p>农事类型</p>
                            <p>工时（小时）</p>
                        </div>
                        <div class="tableItems">
                            <el-empty description="暂无数据" v-if="farmWorkBos.length == 0" />
                            <div class="tableItem" v-for="(item, index) in farmWorkBos" :key="index">
                                <p>{{ item.agricultural }}</p>
                                <p
                                    style="color: #6397fd; cursor: pointer; text-decoration: underline"
                                    @click="
                                        $store.state.power.workingHoursBtn
                                            ? showDialogBox('工时使用统计', item.id, item.agricultural)
                                            : () => {}
                                    "
                                >
                                    {{ item.agriculturalCount || 0 }}
                                </p>
                            </div>
                            <div class="tableItem tableAll" v-if="farmWorkBos.length > 0">
                                <p>合计</p>
                                <p>{{ farmWorkBosCount }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <PlantCropsDetailCDialog
            :id="dialogId"
            :title="dialogTitle"
            :title2="dialogTitle2"
            v-if="showDialog"
            @close="closeDialog"
        ></PlantCropsDetailCDialog>
    </div>
</template>

<script lang="js">
import PlantCropsDetailCDialog from '@/components/plant/PlantCropsDetailCDialog';
import timer from "@/utils/timer.js";
export default {
    name: "stockRecord",
    data() {
        return {
            loading: false,
            detail: {},
            reap: [],
            farmUseBos: [],
            farmWorkBos: [],
            showDialog: false,
            dialogTitle: '',
            dialogTitle2: '',
            dialogId: ''
        }
    },
    components: {
        PlantCropsDetailCDialog
    },
    computed: {
        farmWorkBosCount (){
            let r = 0;
            this.farmWorkBos.map(item => {
                r += item.agriculturalCount || 0;
            })
            return r;
        },
        reapCount (){
            let r = 0;
            this.reap.map(item => {
                r += item.weightAll || 0;
            })
            return r;
        }
    },
    mounted() {
        let t = this;
        let ajax = async function (){
            t.loading = true;
            await t.getData();
            await t.getReap();
            await t.getStat();
            t.loading = false;
        }
        ajax();
    },
    methods: {
        showDialogBox (title, id, title2){
            this.dialogTitle = title;
            this.dialogTitle2 = title2;
            this.dialogId = id;
            console.log(title2)
            this.showDialog = true;
        },
        closeDialog (){
            this.showDialog = false;
        },
        // 返回列表
        back() {
            this.$router.push({
                path: '/erp/plant/history',
                query: {
                    id: this.$route.query.gardenId
                }
            });
        },
        // 获取历史详情
        getData (){
            return new Promise((a,b) => {
                this.ajax.post('/api/v1/adam/plants/getPlants', {
                    id: this.$route.query.id
                }).then(r => {
                    this.detail = r.data;
                    this.loading = false;
                    a();
                })
            })
        },
        // 获取采收统计
        getReap (){
            return new Promise((a,b) => {
                this.ajax.post('/api/v1/adam/farm/getFarmRecoveryByPlantsId', {
                    "plantsId": this.$route.query.id
                }).then(r => {
                    this.reap = r.data;
                    a();
                })
            })
        },
        // 获取统计数据
        getStat (){
            return new Promise((a,b) => {
                this.ajax.post('/api/v1/adam/farm/searchfarmUseRecoveryByPlantsId', {
                    "endTime": "",
                    "id": this.$route.query.id,
                    "keyWord": "",
                    "startTime": ""
                }).then(r => {
                    this.farmUseBos = r.data.farmUseBos;
                    this.farmWorkBos = r.data.farmWorkBos;
                    a();
                })
            })
        }
    },
}
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
.main {
    padding: 0 50px;
    .wrap {
        padding: 20px 0;
        border-bottom: 1px solid #e9e9e9;
    }
    .wrap.info {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        .space {
            width: 2px;
            height: 80px;
            margin: 0 50px;
            background: #deedfa;
        }
        .plant {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img {
                width: 80px;
                height: 80px;
                border-radius: 5px;
            }
            div {
                margin-left: 10px;
                p:nth-child(1) {
                    font-size: 16px;
                }
                p:nth-child(n + 2) {
                    font-size: 12px;
                    margin-top: 10px;
                    span {
                        color: #999999;
                    }
                }
            }
        }
        .time {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .line {
                padding: 0 20px;
            }
            .start {
                p:first-child {
                    color: #4069d2;
                    margin-bottom: 10px;
                }
            }
        }
    }
    .t {
        padding: 20px 0;
    }
    .list {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        .table {
            margin-right: 20px;
            width: 360px;
            .tableTitle {
                background: #f5f7f9;
                text-align: center;
                padding: 12px 0;
            }
            .tableItems {
                overflow-y: scroll;
                height: 420px;
            }
            .tableItems::-webkit-scrollbar {
                width: 0px;
            }
            .tableItem {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                border-left: 1px solid #d2e8fd;
                border-right: 1px solid #d2e8fd;
                p {
                    width: 180px;
                    text-align: center;
                    padding: 10px 0;
                    border-bottom: 1px solid #d2e8fd;
                    color: #777777;
                }
                p:first-child {
                    border-right: 1px solid #d2e8fd;
                }
            }
            .tableItem.tableHead {
                background: #e8f2fc;
                p {
                    color: #5a91ff;
                }
            }
            .tableItem.tableAll {
                p {
                    color: #262628;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>
