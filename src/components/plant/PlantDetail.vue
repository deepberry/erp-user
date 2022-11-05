<template>
    <div class="plantDetail">
        <div class="list">
            <div class="item" v-for="(item, index) in list" :key="index">
                <div class="head">
                    <div class="left">
                        <img :src="item.image" alt="" />
                        <p>{{ item.varietyTitle }}</p>
                    </div>
                    <div class="right">第{{ item.count }}天</div>
                </div>
                <div class="content">
                    <div class="contentItem">
                        <p><span>园区：</span>B区</p>
                        <p><span>品种：</span>{{ item.categoryTitle }}</p>
                    </div>
                    <div class="contentItem">
                        <p><span>面积：</span>{{ item.area }}亩</p>
                        <p>2022.11.01 定值</p>
                    </div>
                </div>
                <div class="btn">
                    <p><i class="erp erpjiekouyunwei"></i> 智能设备</p>
                    <p><i class="erp erprili"></i> 种植任务</p>
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
                        item.count = Math.ceil(item.count / 60 / 60 / 24) + 1;
                        return item;
                    });
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
                p {
                    color: #1c82d7;
                    width: 100%;
                    cursor: pointer;
                    text-align: center;
                    i {
                        margin-right: 3px;
                    }
                }
                p:first-child {
                    border-right: 1px solid #deedfa;
                }
            }
        }
    }
    .pages {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 0;
        .total {
            color: #a0a0a0;
            margin-right: 10px;
        }
    }
}
</style>
