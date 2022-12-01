<template>
    <el-dialog v-model="showGuide" append-to-body title="种植指导" width="1000px" :before-close="handleClose">
        <div class="main">
            <div class="left">
                <div class="box">
                    <div class="boxTitle">生长阶段：</div>
                    <div class="boxTitle">{{ stepList[swiperIndex] && stepList[swiperIndex].phaseName }}</div>
                </div>
                <div class="box">
                    <div class="boxTitle">参考模型：</div>
                    <div class="swiper2">
                        <div
                            class="swiper-wrapper"
                            :style="{ left: swiperIndex * 370 * -1 + 'px', width: swiperWidth + 'px' }"
                        >
                            <div class="swiper-slide" v-for="(item, index) in stepList" :key="index">
                                <img :src="item.image" alt="" />
                            </div>
                        </div>
                        <div class="swiper-pagination">
                            <span
                                @click="swiperIndex = index"
                                v-for="(item, index) in stepList"
                                :key="index"
                                :class="swiperIndex == index ? 'active' : ''"
                            ></span>
                        </div>
                        <div class="swiper-button-prev" @click="swiperRun(0)">
                            <i class="erp erpxiangyou1"></i>
                        </div>
                        <div class="swiper-button-next" @click="swiperRun(1)">
                            <i class="erp erpxiangyou1"></i>
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="boxTitle">
                        数据对比：<span style="color: #f59103; margin-left: 10px; text-decoration: underline"
                            >种植建议：光合积分、积温和株高指标值偏低</span
                        >
                    </div>
                </div>
                <div class="box">
                    <div class="table">
                        <div class="tableItem tableHead">
                            <p>参数名</p>
                            <p>参考值</p>
                            <p>当前值</p>
                        </div>
                        <div class="tableContent">
                            <div class="tableItem" v-for="(item, index) in tableData" :key="index">
                                <p>{{ item.parameterName }}</p>
                                <p>{{ item.leastValue }}-{{ item.maxValue }}{{ item.unit }}</p>
                                <p>{{ item.nowValue || "--" }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="box">
                    <div class="wrap2Title">农事操作指导</div>
                    <div class="wrap2Title" style="margin-top: 30px; color: #6f9aff">增加有效光照，降低空气湿度</div>
                    <div class="video">
                        <div class="videoItem">
                            <video controls src="../../assets/video/movie.mp4"></video>
                            <p>LED增加有效光照</p>
                            <div class="videoTips">
                                <span>#有效光合</span>
                                <span>#增加光照</span>
                                <span>#LED</span>
                                <span>#补光</span>
                            </div>
                        </div>
                        <div class="videoItem">
                            <video controls src="../../assets/video/movie.mp4"></video>
                            <p>LED增加有效光照</p>
                            <div class="videoTips">
                                <span>#有效光合</span>
                                <span>#增加光照</span>
                                <span>#LED</span>
                                <span>#补光</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box" style="margin-top: 40px">
                    <div class="wrap2Title">病虫害防治指导：</div>
                    <div class="video">
                        <div class="videoItem">
                            <video controls src="../../assets/video/movie.mp4"></video>
                            <p>LED增加有效光照</p>
                            <div class="videoTips">
                                <span>#有效光合</span>
                                <span>#增加光照</span>
                                <span>#LED</span>
                                <span>#补光</span>
                            </div>
                        </div>
                        <div class="videoItem">
                            <video controls src="../../assets/video/movie.mp4"></video>
                            <p>LED增加有效光照</p>
                            <div class="videoTips">
                                <span>#有效光合</span>
                                <span>#增加光照</span>
                                <span>#LED</span>
                                <span>#补光</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: [],
    data() {
        return {
            showGuide: true,
            step: "",
            stepList: [],
            swiperIndex: 0,
            plantDetail: {},
            getPlantOperationGuidanceListText: "",
            getPlantPreventionGuidanceListText: "",
        };
    },
    computed: {
        swiperWidth() {
            return 370 * this.stepList.length;
        },
        tableData() {
            return this.stepList[this.swiperIndex] ? this.stepList[this.swiperIndex].growPlantModelDetailBos : [];
        },
    },
    mounted() {
        let t = this;
        let ajax = async function () {
            await t.getDetail();
            await t.getGrowthStage();
            await t.getGuide();
        };
        ajax();
    },
    methods: {
        handleClose(done) {
            done();
        },
        // 获取作物详情
        getDetail() {
            return new Promise((a, b) => {
                this.ajax
                    .post("/api/v1/adam/plants/getPlants", {
                        id: this.$route.query.id,
                    })
                    .then((r) => {
                        r.data.smartDeviceBoList = r.data.smartDeviceBoList || [];
                        this.plantDetail = r.data;
                        a();
                    });
            });
        },
        // 轮播
        swiperRun(v) {
            if (v == 0) {
                if (this.swiperIndex == 0) {
                    this.swiperIndex = this.stepList.length;
                }
                if (this.swiperIndex > 0) {
                    this.swiperIndex--;
                }
            }
            if (v == 1) {
                if (this.swiperIndex < this.stepList.length) {
                    this.swiperIndex++;
                }
                if (this.swiperIndex == this.stepList.length) {
                    this.swiperIndex = 0;
                }
            }
        },
        // 获取生长阶段
        getGrowthStage() {
            return new Promise((a, b) => {
                this.ajax
                    .post("/api/v1/adam/farm/getGrowthStageByPlantId", {
                        id: this.$route.query.id,
                        device: [],
                    })
                    .then((r) => {
                        this.stepList = r.data;
                        a();
                    });
            });
        },
        // 农事操作指导
        getGuide() {
            return new Promise((a, b) => {
                this.ajax
                    .post("/api/v1/adam/farm/getPlantOperationGuidanceList", {
                        id: this.$route.query.id,
                        text: this.getPlantOperationGuidanceListText,
                    })
                    .then((r) => {
                        console.log(r);
                        a();
                    });
            });
        },
        // 病虫害防治指导
        getGuide2() {
            return new Promise((a, b) => {
                this.ajax
                    .post("/api/v1/adam/farm/getPlantPreventionGuidanceList", {
                        id: this.$route.query.id,
                        text: this.getPlantPreventionGuidanceListText,
                    })
                    .then((r) => {
                        console.log(r);
                        a();
                    });
            });
        },
    },
};
</script>

<style lang="less" scoped>
.main {
    position: relative;
    top: -20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .left {
        width: 49%;
        .box {
            width: 480px;
            display: flex;
            justify-content: flex-start;
            align-content: flex-start;
            flex-wrap: wrap;
            padding: 10px 0;
            .boxTitle {
                line-height: 30px;
                margin-right: 10px;
            }
            .swiper2 {
                width: 370px;
                height: 240px;
                position: relative;
                overflow: hidden;
                .swiper-wrapper {
                    height: 240px;
                    display: flex;
                    position: absolute;
                    top: 0;
                    transition: all 0.3s;
                }
                .swiper-pagination {
                    width: 100%;
                    height: 20px;
                    position: absolute;
                    bottom: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span {
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        background: rgba(0, 0, 0, 0.3);
                        border-radius: 50%;
                        margin: 0 5px;
                        cursor: pointer;
                    }
                    span.active {
                        background: #ffffff;
                    }
                }
                .swiper-button-prev {
                    position: absolute;
                    top: 100px;
                    left: 5px;
                    i {
                        color: #ffffff;
                        font-size: 30px;
                        cursor: pointer;
                        display: inline-block;
                        transform: rotate(180deg);
                    }
                }
                .swiper-button-next {
                    position: absolute;
                    top: 100px;
                    right: 5px;
                    i {
                        color: #ffffff;
                        font-size: 30px;
                        cursor: pointer;
                        display: inline-block;
                    }
                }
                .swiper {
                    --swiper-theme-color: rgba(255, 255, 255);
                    --swiper-navigation-size: 20px;
                }
                img {
                    width: 370px;
                    height: 240px;
                }
            }
            .table {
                width: 450px;
                .tableItem {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    text-align: center;
                    border-left: 1px solid rgb(231, 231, 231);
                    border-bottom: 1px solid rgb(231, 231, 231);
                    p {
                        width: 100%;
                        padding: 5px 0;
                        border-right: 1px solid rgb(231, 231, 231);
                        font-size: 12px;
                    }
                }
                .tableItem.tableHead {
                    border-top: 1px solid rgb(231, 231, 231);
                    background: #fafafa;
                }
            }
        }
    }
    .right {
        width: 49%;
        .tips {
            width: 100%;
            padding-top: 20px;
            border-top: 1px solid rgba(0, 0, 0, 0.09);
            color: #f59103;
        }
        .wrap2Title {
            color: #3d3d3d;
        }
        .video {
            width: 370px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-top: 10px;
            .videoItem {
                width: 180px;
                video {
                    width: 180px;
                    border-radius: 5px;
                }
                p {
                    padding: 10px 0;
                }
                div {
                    width: 140px;
                    padding: 5px 20px;
                    background: #caf982;
                    display: flex;
                    justify-content: flex-start;
                    align-content: flex-start;
                    flex-wrap: wrap;
                    span {
                        margin: 2px 5px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
}
</style>
