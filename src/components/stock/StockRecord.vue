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
                <span style="position: relative; top: 2px; font-size: 15px">出入库记录</span>
            </div>
            <div class="content">
                <div class="search">
                    <div>
                        <el-input
                            style="width: 360px"
                            v-model="input"
                            placeholder="关键字搜索：农资名称、厂家名称、出入库日期"
                        />
                        <el-button style="margin-left: 10px" type="primary" plain>查询</el-button>
                    </div>
                    <div>
                        <el-button type="primary">出入库统计</el-button>
                    </div>
                </div>
                <div class="list">
                    <div class="item" v-for="item in list" :key="item">
                        <div>
                            <p>已领用退回</p>
                            <p class="add">+1000公斤</p>
                        </div>
                        <div>
                            <p>硝酸复合肥</p>
                        </div>
                        <div>
                            <p>内蒙古xxx肥料有限公司</p>
                            <p>
                                <el-button type="primary" link @click="showDetailBox = true"
                                    >查看详情 <i class="erp erphtmal5icon45"></i
                                ></el-button>
                            </p>
                        </div>
                    </div>
                    <div class="item space" v-for="item in space" :key="item + '-space'"></div>
                </div>
            </div>
        </div>
        <StockRecordDetail v-if="showDetailBox" @close="onCloseDetailBox"></StockRecordDetail>
    </div>
</template>

<script lang="js">
import StockRecordDetail from '@/components/stock/StockRecordDetail.vue';
import timer from "@/utils/timer.js";
export default {
    name: "stockRecord",
    props: ["id"],
    data() {
        return {
            note: '',
            list: 10,
            space: 0,
            showDetailBox: false
        }
    },
    mounted() {
        // list 不能被3整除时补充占位
        this.space = 3 - this.list % 3;
    },
    components: {
        StockRecordDetail
    },
    methods: {
        // 返回列表
        back() {
            this.$router.push("/erp/stock");
        },
        onCloseDetailBox (){
            let timer = setTimeout(() => {
                this.showDetailBox = false;
                clearTimeout(timer);
            }, 500);
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
    .search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        div {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
    }
    .list {
        display: flex;
        justify-content: space-between;
        align-content: flex-start;
        flex-wrap: wrap;
        margin-top: 20px;
        flex-grow: 999;
        .item {
            width: calc(32% - 40px);
            margin: 10px 0;
            box-shadow: 0px 0px 21px 0px #e5ecf2;
            padding: 20px;
            border-radius: 8px;
            div {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            div:nth-child(1) {
                p:first-child {
                    color: rgb(116, 116, 116);
                }
                p.add {
                    color: rgba(61, 201, 71, 1);
                }
                p.miuns {
                    color: rgba(243, 95, 95, 1);
                }
            }
            div:nth-child(2) {
                color: rgba(56, 56, 56, 1);
                margin-top: 5px;
            }
            div:nth-child(3) {
                margin-top: 15px;
                p:first-child {
                    color: rgba(170, 170, 170, 1);
                }
            }
        }
        .item.space {
            visibility: hidden;
        }
    }
}
</style>
