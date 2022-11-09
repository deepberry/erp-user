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
                <div class="wrap">云南张三蓝莓种植基地</div>
                <div class="wrap info">
                    <div class="plant">
                        <img src="../../assets/img/ds.png" alt="" />
                        <div>
                            <p>蓝莓-高从蓝莓-B区</p>
                            <p><span>面积：</span>8亩</p>
                            <p><span>产量：</span>111111公斤</p>
                        </div>
                    </div>
                    <div class="space"></div>
                    <div class="time">
                        <div class="start">
                            <p>2022.11.08</p>
                            <p>开始时间</p>
                        </div>
                        <div class="line">
                            <img src="../../assets/img/img-jiantou.png" alt="" />
                        </div>
                        <div class="start">
                            <p>2022.11.08</p>
                            <p>结束时间</p>
                        </div>
                    </div>
                </div>
                <div class="t">历史种植数据：</div>
                <div class="list">
                    <div class="table">
                        <div class="tableTitle">（采购统计）</div>
                        <div class="tableItem tableHead">
                            <p>采购时间</p>
                            <p>重量</p>
                        </div>
                        <div class="tableItem">
                            <p>2022.11.08</p>
                            <p>2000公斤</p>
                        </div>
                        <div class="tableItem">
                            <p>2022.11.08</p>
                            <p>2000公斤</p>
                        </div>
                        <div class="tableItem">
                            <p>2022.11.08</p>
                            <p>2000公斤</p>
                        </div>
                        <div class="tableItem">
                            <p>2022.11.08</p>
                            <p>2000公斤</p>
                        </div>
                        <div class="tableItem tableAll">
                            <p>合计</p>
                            <p>2000公斤</p>
                        </div>
                    </div>
                    <div class="table">
                        <div class="tableTitle">（采购统计）</div>
                        <div class="tableItem tableHead">
                            <p>采购时间</p>
                            <p>重量</p>
                        </div>
                        <div class="tableItem">
                            <p>2022.11.08</p>
                            <p>2000公斤</p>
                        </div>
                        <div class="tableItem">
                            <p>2022.11.08</p>
                            <p>2000公斤</p>
                        </div>
                        <div class="tableItem">
                            <p>2022.11.08</p>
                            <p>2000公斤</p>
                        </div>
                        <div class="tableItem">
                            <p>2022.11.08</p>
                            <p>2000公斤</p>
                        </div>
                        <div class="tableItem tableAll">
                            <p>合计</p>
                            <p>2000公斤</p>
                        </div>
                    </div>
                    <div class="table">
                        <div class="tableTitle">（采购统计）</div>
                        <div class="tableItem tableHead">
                            <p>采购时间</p>
                            <p>重量</p>
                        </div>
                        <div class="tableItem">
                            <p>2022.11.08</p>
                            <p>2000公斤</p>
                        </div>
                        <div class="tableItem">
                            <p>2022.11.08</p>
                            <p>2000公斤</p>
                        </div>
                        <div class="tableItem">
                            <p>2022.11.08</p>
                            <p>2000公斤</p>
                        </div>
                        <div class="tableItem">
                            <p>2022.11.08</p>
                            <p>2000公斤</p>
                        </div>
                        <div class="tableItem tableAll">
                            <p>合计</p>
                            <p>2000公斤</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import timer from "@/utils/timer.js";
export default {
    name: "stockRecord",
    data() {
        return {
            loading: false,
        }
    },
    mounted() {

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
