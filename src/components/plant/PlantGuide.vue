<template>
    <el-dialog v-model="showGuide" append-to-body title="种植指导" width="1000px" :before-close="handleClose">
        <div class="main">
            <div class="wrap">
                <div>
                    <div class="box">
                        <div class="boxTitle">生长阶段：</div>
                        <el-select v-model="step" style="width: 370px" placeholder="请选择">
                            <el-option
                                v-for="item in stepList"
                                :key="item.id"
                                :label="item.phaseName"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="box">
                        <div class="boxTitle">参考模型：</div>
                        <div class="swiper2">
                            <div
                                class="swiper-wrapper"
                                :style="{ left: swiperIndex * 370 * -1 + 'px', width: swiperWidth + 'px' }"
                            >
                                <div class="swiper-slide">
                                    <img src="../../assets/img/ds.png" alt="" />
                                </div>
                                <div class="swiper-slide">
                                    <img src="../../assets/img/ds.png" alt="" />
                                </div>
                                <div class="swiper-slide">
                                    <img src="../../assets/img/ds.png" alt="" />
                                </div>
                            </div>
                            <div class="swiper-pagination">
                                <span
                                    @click="swiperIndex = item - 1"
                                    v-for="item in 3"
                                    :key="item"
                                    :class="swiperIndex == item - 1 ? 'active' : ''"
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
                </div>
                <div>
                    <div class="box">
                        <div class="boxTitle">数据对比：</div>
                        <div class="table">
                            <div class="tableItem tableHead">
                                <p>参数名</p>
                                <p>参考值</p>
                                <p>当前值</p>
                            </div>
                            <div class="tableContent">
                                <div class="tableItem">
                                    <p>参数名</p>
                                    <p>参考值</p>
                                    <p>当前值</p>
                                </div>
                                <div class="tableItem">
                                    <p>参数名</p>
                                    <p>参考值</p>
                                    <p>当前值</p>
                                </div>
                                <div class="tableItem">
                                    <p>参数名</p>
                                    <p>参考值</p>
                                    <p>当前值</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wrap wrap2">
                <p class="tips">种植建议：光合积分、积温和株高指标值偏低</p>
            </div>
            <div class="wrap wrap2">
                <div class="box">
                    <div class="wrap2Title">增加有效光照，降低空气温度</div>
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
                <div class="box">
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
            swiperWidth: 370 * 3,
        };
    },
    mounted() {
        this.getGrowthStage();
    },
    methods: {
        handleClose(done) {
            done();
        },
        // 轮播
        swiperRun(v) {
            if (v == 0) {
                if (this.swiperIndex == 0) {
                    this.swiperIndex = 3;
                }
                if (this.swiperIndex > 0) {
                    this.swiperIndex--;
                }
            }
            if (v == 1) {
                if (this.swiperIndex < 3) {
                    this.swiperIndex++;
                }
                if (this.swiperIndex == 3) {
                    this.swiperIndex = 0;
                }
            }
        },
        // 获取生长阶段
        getGrowthStage() {
            this.ajax
                .post("/api/v1/adam/adminGrowModel/getGrowthStage", {
                    id: this.$route.query.id,
                })
                .then((r) => {
                    this.stepList = r.data;
                });
        },
    },
};
</script>

<style lang="less" scoped>
.main {
    position: relative;
    top: -20px;
    .wrap {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
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
                width: 400px;
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
    .wrap2 {
        width: calc(100% - 80px);
        margin-left: 80px;
        margin-top: 20px;
        .tips {
            width: 100%;
            padding-top: 20px;
            border-top: 1px solid rgba(0, 0, 0, 0.09);
            color: #f59103;
        }
        .wrap2Title {
            color: #6f9aff;
            margin-top: -10px;
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
