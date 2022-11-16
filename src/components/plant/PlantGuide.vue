<template>
    <el-dialog v-model="showGuide" append-to-body title="种植指导" width="1000px" :before-close="handleClose">
        <div class="main">
            <div class="wrap">
                <div>
                    <div class="box">
                        <div class="boxTitle">生长阶段：</div>
                        <el-select v-model="step" style="width: 370px" placeholder="请选择">
                            <el-option label="00" value="0"></el-option>
                            <el-option label="11" value="1"></el-option>
                            <el-option label="22" value="2"></el-option>
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
                        <el-select v-model="step" placeholder="请选择" size="large">
                            <el-option label="00" value="0"></el-option>
                            <el-option label="11" value="1"></el-option>
                            <el-option label="22" value="2"></el-option>
                        </el-select>
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
            step: "0",
            swiperIndex: 0,
            swiperWidth: 370 * 3,
        };
    },
    mounted() {},
    methods: {
        handleClose(done) {
            done();
        },
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
        }
    }
}
</style>
