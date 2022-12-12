<template>
    <el-dialog v-model="showGuide" append-to-body title="种植指导" width="500px" :before-close="handleClose">
        <div class="main">
            <div class="left">
                <div class="box">
                    <div class="boxTitle">生长阶段：</div>
                    <div class="boxTitle">
                        <el-select
                            v-model="currentStep"
                            @change="stepRun"
                            placeholder="请选择阶段"
                            style="width: 370px"
                        >
                            <el-option
                                v-for="item in stepList"
                                :key="item.id"
                                :label="item.phaseName"
                                :value="item.id"
                            />
                        </el-select>
                    </div>
                </div>
                <div class="box">
                    <el-empty style="width: 450px" v-if="stepList.length == 0" description="暂无数据" />
                    <div class="swiper2" v-if="stepList.length > 0">
                        <div
                            class="swiper-wrapper"
                            :style="{ left: swiperIndex * 450 * -1 + 'px', width: swiperWidth + 'px' }"
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
                    <div class="boxTitle">数据对比：</div>
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
                                <p :style="{ color: item.color }">
                                    {{ item.nowValue || "--" }} <i v-if="item.nowValue" :class="item.icon"></i>
                                </p>
                            </div>
                            <el-empty style="width: 450px" v-if="tableData.length == 0" description="暂无数据" />
                        </div>
                    </div>
                </div>
                <div class="box" style="margin-top: 20px">
                    <div class="boxTitle">
                        <p>种植建议</p>
                        <div style="color: #6f9aff">{{ text }}</div>
                    </div>
                    <div class="video">
                        <el-empty style="width: 450px" v-if="guide.length == 0" description="暂无数据" />
                        <div class="videoItem" v-for="item in guide" :key="item.id">
                            <video v-if="item.isVideo" controls :src="item.video"></video>
                            <img v-if="!item.isVideo" :src="item.video" alt="" />
                            <p>{{ item.title }}</p>
                            <div class="videoTips">
                                <span>{{ item.text }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right"></div>
        </div>
    </el-dialog>
</template>

<script>
const iourl = process.env["NODE_ENV"] == "development" ? "" : "https://io.deepberry.cn";
import * as signalR from "@microsoft/signalr";
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
            device: [],
            currentStep: "",
            growthStageList: [],
            selectedStageId: "",
            guide: [], // 操作指导
        };
    },
    computed: {
        swiperWidth() {
            return 450 * this.stepList.length;
        },
        tableData() {
            let r = this.stepList[this.swiperIndex] ? this.stepList[this.swiperIndex].growPlantModelDetailBos : [];
            r = r.map((item) => {
                if (item.nowValue > item.maxValue) {
                    item.icon = "erp erppiangao";
                    item.color = "red";
                }
                if (item.nowValue < item.leastValue) {
                    item.icon = "erp erppiandi";
                    item.color = "green";
                }
                return item;
            });
            return r;
        },
        text() {
            return this.stepList[this.swiperIndex] ? this.stepList[this.swiperIndex].suggestion : "";
        },
    },
    watch: {
        swiperIndex() {
            this.getGuide();
            if (this.stepList.length > 0) {
                this.currentStep = this.stepList[this.swiperIndex].id;
            }
        },
    },
    mounted() {
        let t = this;
        let ajax = async function () {
            await t.getDetail();
            await t.getReady();
            await t.getGrowthStage();
            await t.getGuide();
        };
        ajax();
    },
    methods: {
        stepRun(v) {
            this.stepList.map((item, index) => {
                if (item.id == v) {
                    this.swiperIndex = index;
                }
            });
        },
        handleClose(done) {
            done();
        },
        // 获取参数数据
        getReady() {
            let t = this;
            return new Promise((a, b) => {
                if (t.plantDetail.smartDeviceBoList.length > 0) {
                    const token = localStorage.getItem("erp_token") || localStorage.getItem("TOKEN_TITAN");
                    let connection = new signalR.HubConnectionBuilder()
                        .withUrl(`${iourl}/hub/node`, {
                            accessTokenFactory: () => token,
                        })
                        .withAutomaticReconnect({
                            nextRetryDelayInMilliseconds: (_retryContext) => {
                                return 5000;
                            },
                        })
                        .build();

                    let list = [];
                    connection.start().then(() => {
                        t.plantDetail.smartDeviceBoList.map((item) => {
                            list.push(connection.invoke("Subscribe", item.smartDeviceId));
                        });
                        Promise.all(list).then((res) => {
                            if (res && res.length > 0) {
                                res.forEach((item) => {
                                    if (item && item.properties) {
                                        item.properties.forEach((child) => {
                                            t.device.push(child);
                                        });
                                    }
                                });
                            }
                            a();
                        });
                    });
                } else {
                    a();
                }
            });
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
                        device: this.device,
                    })
                    .then((r) => {
                        if (!r.data) return;
                        this.stepList = r.data;
                        this.growthStageList = r.data.map((item, index) => {
                            if (item.isIn == 1) {
                                this.swiperIndex = index;
                            }
                            if (this.stepList.length > 0) {
                                this.currentStep = this.stepList[this.swiperIndex].id;
                            }
                            // text重新赋值
                            item.suggestion = item.text;
                            item.text = item.phaseName;
                            item.value = item.id;
                            return item;
                        });
                        this.selectedStageId = this.growthStageList[0] && this.growthStageList[0].id;
                        console.log(this.stepList);
                        a();
                    });
            });
        },
        // 农事操作指导
        getGuide() {
            let t = this;
            return new Promise((a, b) => {
                let plantModelId;
                let text;
                if (t.growthStageList[t.swiperIndex]) {
                    plantModelId = t.growthStageList[t.swiperIndex].growModelId;
                    text = t.growthStageList[t.swiperIndex].suggestion;
                }
                t.ajax
                    .post("/api/v1/adam/farm/getPlantOperationGuidanceList", {
                        id: plantModelId,
                        text,
                    })
                    .then((r) => {
                        this.guide = r.data.map((item) => {
                            item.isVideo = item.video.split(".").pop() == "mp4" ? true : false;
                            return item;
                        });
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
    max-height: 600px;
    overflow-x: hidden;
    overflow-y: auto;
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
                width: 450px;
                height: 240px;
                position: relative;
                overflow: hidden;
                .swiper-wrapper {
                    width: 450px;
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
                    width: 450px;
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
            width: 450px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-top: 10px;
            .videoItem {
                width: 220px;
                video {
                    width: 220px;
                    height: 140px;
                    border-radius: 5px;
                }
                p {
                    padding: 10px 0;
                }
                div {
                    width: 180px;
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
    .right {
        width: 49%;
    }
}
</style>
