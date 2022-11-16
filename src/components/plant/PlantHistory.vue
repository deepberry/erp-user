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
                <span style="position: relative; top: 2px; font-size: 15px">历史种植</span>
            </div>
            <div class="main" v-loading="loading">
                <div class="list" v-loading="loading">
                    <div class="item" v-for="(item, index) in list" :key="index" @click="itemClick(item.id)">
                        <div class="head">
                            <div class="left">
                                <img :src="item.image" alt="" />
                                <p>{{ item.categoryTitle }}-{{ item.varietyTitle }}-{{ item.address }}</p>
                            </div>
                        </div>
                        <div class="content">
                            <div class="contentItem">
                                <p><span>面积：</span>{{ item.area }}亩</p>
                                <p><span>产量：</span>{{ item.weightAll }}公斤</p>
                            </div>
                        </div>
                        <div class="btn">
                            <div class="start">
                                <p>{{ item.plantTime }}</p>
                                <p>开始种植</p>
                            </div>
                            <div class="line">
                                <img src="../../assets/img/img-jiantou.png" alt="" />
                            </div>
                            <div class="end">
                                <p>{{ item.endTime }}</p>
                                <p>结束种植</p>
                            </div>
                        </div>
                    </div>
                    <div class="itemSpace" v-for="item in listSpace" :key="item"></div>
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
            note: '',
            list: [],
            listSpace: 2,
            loading: false,
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 返回列表
        back() {
            this.$router.push({
                path: '/erp/plant',
                query: {
                    id: this.$route.query.id
                }
            });
        },
        itemClick (id){
            this.$router.push({
                path: '/erp/plant/history/detail',
                query: {
                    id,
                    gardenId: this.$route.query.id
                }
            })
        },
        // 获取历史记录
        getData (){
            this.loading = true;
            this.ajax.post('/api/v1/adam/plants/getHistoryPlants', {
                id: this.$route.query.id
            }).then(r => {
                this.list = r.data.map(item => {
                    item.plantTime = timer.time('y-m-d', item.plantTime);
                    item.endTime = timer.time('y-m-d', item.endTime);
                    return item;
                })
                this.loading = false;
            })
        }
    },
}
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
.main {
    width: calc(100% - 200px);
    height: calc(100% - 100px);
    overflow-x: hidden;
    overflow-y: auto;
    padding: 20px 100px;

    .list {
        width: calc(100% - 100px);
        padding: 40px 0;
        margin-left: 30px;
        display: flex;
        justify-content: space-between;
        align-content: flex-start;
        flex-wrap: wrap;
        .itemSpace {
            width: 23%;
            border: 1px solid transparent;
            border-radius: 10px;
            overflow: hidden;
            margin-top: 50px;
        }
        .item {
            width: 23%;
            border: 1px solid #e4e4e4;
            border-radius: 10px;
            overflow: hidden;
            margin-top: 50px;
            cursor: pointer;
            .head {
                height: 60px;
                padding: 0 20px;
                background: url("../../assets/img/1.png") no-repeat;
                background-size: cover;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                    }
                    p {
                        margin-left: 10px;
                        color: #232121;
                        font-size: 16px;
                        font-weight: bold;
                    }
                }
            }
            .content {
                padding: 0 20px;
                padding-bottom: 0;
                .contentItem {
                    margin-top: 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    p {
                        color: #333333;
                        span {
                            color: #999999;
                        }
                    }
                }
            }
            .btn {
                width: calc(100% - 40px);
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-top: 1px solid #deedfa;
                margin: 0 20px;
                margin-top: 20px;
                padding: 10px 0;
                div {
                    p:first-child {
                        color: #4069d2;
                        font-size: 12px;
                    }
                    p:last-child {
                        color: #333333;
                        font-size: 14px;
                        margin-top: 10px;
                    }
                }
            }
        }
    }
}
</style>
