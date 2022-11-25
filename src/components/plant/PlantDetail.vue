<template>
    <div class="plantDetail">
        <el-empty description="暂无数据" v-if="list.length == 0" style="margin-top: 200px" />
        <div class="list" v-loading="loading">
            <div class="item" v-for="(item, index) in list" :key="index">
                <div class="head" @click="itemClick(item.id)">
                    <div class="left">
                        <img :src="item.image" alt="" />
                        <p>{{ item.categoryTitle }}</p>
                    </div>
                    <div class="right">第{{ item.count }}天</div>
                </div>
                <div class="content" @click="itemClick(item.id)">
                    <div class="contentItem">
                        <p><span>棚区：</span>{{ item.address }}</p>
                        <p><span>品种：</span>{{ item.varietyTitle }}</p>
                    </div>
                    <div class="contentItem">
                        <p><span>面积：</span>{{ item.area }}亩</p>
                        <p>{{ item.plantTime }} 定值</p>
                    </div>
                </div>
                <div class="btn">
                    <p v-if="item.smartDevice > 0"><i class="erp erpjiekouyunwei"></i> 智能设备</p>
                    <p @click="itemClick(item.id)">
                        <i class="erp erprili">
                            <span v-if="item.task > 0"></span>
                        </i>
                        种植任务
                    </p>
                </div>
            </div>
            <div class="itemSpace" v-for="item in listSpace" :key="item"></div>
        </div>
    </div>
</template>

<script>
import timer from "@/utils/timer";
export default {
    name: "plantDetail",
    data() {
        return {
            list: [],
            listSpace: 0,
            loading: false,
        };
    },
    mounted() {
        this.getData();
    },
    watch: {
        $route() {
            this.getData();
        },
    },
    methods: {
        // 获取数据
        getData() {
            this.loading = true;
            this.ajax
                .post("/api/v1/adam/garden/details", {
                    id: this.$route.query.id,
                })
                .then((r) => {
                    this.list = r.data.growPlantsBoList.map((item) => {
                        item.count = new Date().getTime() / 1000 - timer.parse(item.plantTime).getTime() / 1000;
                        item.count = Math.ceil(item.count / 60 / 60 / 24);
                        item.plantTime = timer.time("y-m-d", timer.parse(item.plantTime));
                        item.task = false;
                        return item;
                    });
                    this.listSpace = this.list.length % 4 > 0 ? 4 - (this.list.length % 4) : 0;
                    console.log(this.listSpace);
                    this.loading = false;
                    this.getTaskCount();
                });
        },
        // 获取任务列表
        getTaskCount() {
            this.ajax
                .post("/api/v1/adam/task/getTaskCountByUser", {
                    gardenId: this.$route.query.id,
                })
                .then((r) => {
                    this.list = this.list.map((item) => {
                        r.data.map((i) => {
                            if (item.id == i.growPlantId) {
                                item.task = i.count;
                            }
                        });
                        return item;
                    });
                });
        },
        itemClick(id) {
            this.$router.push({
                path: "/erp/plant/crops/detail",
                query: {
                    id,
                    gardenId: this.$route.query.id,
                },
            });
        },
    },
};
</script>

<style lang="less" scoped>
.plantDetail {
    .list {
        width: calc(100% - 360px);
        padding: 40px 0;
        margin-left: 160px;
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
            .head {
                height: 60px;
                padding: 0 20px;
                background: url("../../assets/img/1.png") no-repeat;
                background-size: cover;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
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
                cursor: pointer;
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
                p {
                    color: #1c82d7;
                    width: 100%;
                    cursor: pointer;
                    text-align: center;
                    position: relative;
                    border-right: 1px solid #deedfa;
                    i {
                        margin-right: 3px;
                        position: relative;
                        span {
                            display: inline-block;
                            width: 5px;
                            height: 5px;
                            border-radius: 50%;
                            background: red;
                            position: absolute;
                            top: 0;
                            right: -70px;
                        }
                    }
                }
                p:last-child {
                    border-right: none;
                }
            }
        }
    }
}
</style>
