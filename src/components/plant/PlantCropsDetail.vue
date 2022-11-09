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
                <span style="position: relative; top: 2px; font-size: 15px">作物详情</span>
            </div>
            <div class="main" v-loading="loading">
                <div class="wrap info">
                    <div class="plant">
                        <img src="../../assets/img/ds.png" alt="" />
                        <div>
                            <p>蓝莓-B区</p>
                            <p><span>品种：</span>高从蓝莓</p>
                            <p><span>天数：</span><i style="color: #4069d2">第5天</i></p>
                        </div>
                    </div>
                    <div class="tips">
                        <div>
                            <el-alert
                                title="光合作用、积温和株高指标值偏低"
                                :closable="false"
                                type="warning"
                                show-icon
                            />
                            &nbsp;
                        </div>
                        <div class="select">
                            <el-button type="primary" style="width: 120px">种植指导</el-button>
                            <el-select v-model="selectValue" style="width: 120px" class="m-2" placeholder="作物管理">
                                <el-option
                                    v-for="(item, index) in selectList"
                                    :key="index"
                                    :label="item"
                                    :value="index"
                                />
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="tabs">
                    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                        <el-tab-pane label="种植任务" name="1">
                            <PlantCropsDetailTabA></PlantCropsDetailTabA>
                        </el-tab-pane>
                        <el-tab-pane label="农事记录" name="2">
                            <PlantCropsDetailTabB></PlantCropsDetailTabB>
                        </el-tab-pane>
                        <el-tab-pane label="农事统计" name="3">
                            <PlantCropsDetailTabC></PlantCropsDetailTabC>
                        </el-tab-pane>
                        <el-tab-pane label="种植分析" name="4">
                            <PlantCropsDetailTabD></PlantCropsDetailTabD>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import timer from "@/utils/timer.js";
import PlantCropsDetailTabA from './PlantCropsDetailTabA';
import PlantCropsDetailTabB from './PlantCropsDetailTabB';
import PlantCropsDetailTabC from './PlantCropsDetailTabC';
import PlantCropsDetailTabD from './PlantCropsDetailTabD';
export default {
    name: "stockRecord",
    data() {
        return {
            loading: false,
            activeName: '1',
            selectValue: '',
            selectList: ['结束种植', '编辑作物', '删除作物']
        }
    },
    mounted() {

    },
    components: {
        PlantCropsDetailTabA, PlantCropsDetailTabB, PlantCropsDetailTabC, PlantCropsDetailTabD
    },
    methods: {
        // 返回列表
        back() {
            this.$router.push({
                path: '/erp/plant/history',
                query: {
                    id: this.$route.query.from
                }
            });
        },
        handleClick (){

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
    .tabs {
        padding: 20px 0;
    }
    .wrap.info {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;

        .plant {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img {
                width: 100px;
                height: 100px;
                border-radius: 5px;
            }
            div {
                height: 100px;
                margin-left: 10px;
                p:nth-child(1) {
                    font-size: 16px;
                }
                p:nth-child(n + 2) {
                    font-size: 12px;
                    margin-top: 20px;
                    span {
                        color: #999999;
                    }
                }
            }
        }
        .tips {
            margin-left: 50px;
            width: 260px;
            height: 100px;
            display: flex;
            justify-content: flex-start;
            align-content: space-between;
            flex-wrap: wrap;
            .select {
                width: 260px;
                display: flex;
                justify-content: space-between;
                align-items: center;
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
            .tableItem {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                border-left: 1px solid #d2e8fd;
                border-right: 1px solid #d2e8fd;
                p {
                    width: 180px;
                    text-align: center;
                    padding: 12px 0;
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
