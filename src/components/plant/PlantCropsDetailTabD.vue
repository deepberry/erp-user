<template>
    <div class="d">
        <div class="box">
            <div class="wrap">
                <div class="left">
                    <div class="title">作物现场数据</div>
                    <el-select
                        v-model="sceneSelected"
                        multiple
                        placeholder="请选择属性，可选择多个"
                        style="width: 100%; margin-top: 20px"
                        @change="setHistoryAnalyze"
                    >
                        <el-option
                            v-for="(item, index) in scene"
                            :key="index"
                            :label="item.displayName"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                    <div class="tags">
                        <el-tag
                            style="width: 30%; margin: 5px 1%"
                            size="large"
                            v-for="(item, index) in sceneTags"
                            :key="index"
                            @close="removeTag(index)"
                            closable
                            >{{ item.displayName }}</el-tag
                        >
                    </div>
                </div>
                <div class="right">
                    <div class="title">
                        作物实时数据 <span>（获取更多作物生长环境数据，请联系客服接入相关设备）</span>
                    </div>
                    <div style="margin-top: 20px">环境数据：</div>
                    <div style="width: 100%; overflow-x: auto">
                        <div class="items" :style="{ width: ambient.length * 130 + 'px' }">
                            <div v-for="(item, index) in ambient" :key="index">
                                <p>
                                    <img :src="getIconUrl(item.icon)" alt="" />
                                </p>
                                <p>{{ item.value || "&nbsp;" }}{{ item.unit || "&nbsp;" }}</p>
                                <p>{{ item.displayName || "&nbsp;" }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wrap">
                <div class="left">
                    <div class="title">数据图表</div>
                    <div class="echartBox">
                        <div class="btn">
                            <el-button
                                :type="index === activeCharts ? 'primary' : ''"
                                v-for="(item, index) in chartList"
                                :key="index"
                                @click="setCharts(index)"
                                >{{ item.title }}</el-button
                            >
                        </div>
                        <div class="charts" ref="charts"></div>
                    </div>
                </div>
                <div class="right">
                    <div class="title">农事照片</div>
                    <div class="imgs">
                        <img v-for="(item, index) in imgs" :key="index" :src="item" alt="" />
                        <div v-for="(item, index) in imgSpace" :key="index"></div>
                        <el-empty description="暂无农事照片" style="margin: 0 auto" v-if="imgs.length == 0" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import timer from "@/utils/timer";
import * as signalR from "@microsoft/signalr";
import * as echarts from "echarts";
export default {
    data() {
        return {
            sceneSelected: [],
            scene: [],
            imgs: [],
            plantDetail: {},
            ambient: [],
            activeCharts: 1,
            chartList: [
                {
                    id: 1,
                    title: "昨天",
                    value: 1,
                    diff: 2,
                },
                {
                    id: 2,
                    title: "今天",
                    value: 0,
                    diff: 2,
                },
                {
                    id: 3,
                    title: "最近3天",
                    value: 2,
                    diff: 6,
                },
                {
                    id: 4,
                    title: "最近7天",
                    value: 6,
                    diff: 12,
                },
            ],
            echarts: null,
        };
    },
    watch: {
        $route(v) {
            if (v.query.tab == 4) {
                console.log(4);
            }
        },
    },
    computed: {
        sceneTags() {
            return this.sceneSelected.map((item) => {
                let r = {};
                this.scene.map((i) => {
                    if (item == i.id) r = i;
                });
                return r;
            });
        },
        imgSpace() {
            let r = 0;
            r = 4 - (this.imgs.length % 4);
            return r;
        },
    },
    mounted() {
        let t = this;
        let ajax = async function () {
            t.echarts = echarts.init(t.$refs.charts);
            await t.getData();
            await t.getHistoryAnalyze();
            await t.getGrow();
            t.setCharts(1);
        };
        ajax();
    },
    methods: {
        // 渲染图表
        setCharts(index) {
            this.activeCharts = index;
            this.chartsData(index).then((r) => {
                this.echarts.setOption(r);
            });
        },
        // 处理图表数据
        chartsData(index) {
            return new Promise((a, b) => {
                let token = localStorage.getItem("erp_token");
                let list = [];
                let legend = [];
                let xAxis = [];
                let series = [];
                this.sceneTags.map((item) => {
                    list.push(
                        this.ajax
                            .getUrl(this.urlParse(index, item.dashboardId, item.nodeId, item.id, token))
                            .then((r) => {
                                return r;
                            })
                    );
                });
                Promise.all(list).then((r) => {
                    console.log(r);
                    r.map((item) => {
                        legend.push(item.propertyName);
                        let data = this.clip(item.data);
                        let row = {
                            name: item.propertyName,
                            data: data.map((d) => d[1]),
                            type: "line",
                            smooth: true,
                        };
                        series.push(row);
                        xAxis = data.map((d) => d[0]);
                    });
                    let data = {
                        tooltip: {
                            trigger: "axis",
                            show: true,
                        },
                        legend: {
                            data: legend,
                        },
                        xAxis: {
                            type: "category",
                            data: xAxis,
                        },
                        yAxis: {
                            type: "value",
                        },
                        series: series,
                    };
                    a(data);
                });
            });
        },
        // 修剪数据
        clip(data) {
            console.log(data);
            let r = [];
            let num = this.chartList[this.activeCharts].diff * 10;
            data.map((item, index) => {
                if (index % num == 0) {
                    r.push(item);
                }
            });
            return r;
        },
        // 处理url参数
        urlParse(index, dashboardId, nodeId, propertyId, token) {
            let start = "";
            let stop = timer.time("y-m-d+h:i:s");
            let unix = parseInt(new Date().getTime() / 1000);
            switch (index) {
                case 0:
                    start = timer.time("y-m-d+00:00:00", (unix - 86400) * 1000);
                    break;
                case 1:
                    start = timer.time("y-m-d+00:00:00", unix * 1000);
                    break;
                case 2:
                    start = timer.time("y-m-d+00:00:00", (unix - 86400 * 3) * 1000);
                    break;
                case 3:
                    start = timer.time("y-m-d+00:00:00", (unix - 86400 * 7) * 1000);
                    break;
            }
            let url = `/api/dashboard/${dashboardId}/node/${nodeId}/property/${propertyId}/chart?start=${start}&stop=${stop}&access_token=${token}`;
            return url;
        },
        // 获取作物详情
        getData() {
            return new Promise((a, b) => {
                this.ajax
                    .post("/api/v1/adam/plants/getPlants", {
                        id: this.$route.query.id,
                    })
                    .then((r) => {
                        this.plantDetail = r.data;
                        a();
                    });
            });
        },
        // 获取实时数据
        getGrow() {
            let t = this;
            return new Promise((a, b) => {
                if (t.plantDetail.smartDeviceBoList.length > 0) {
                    const token = localStorage.getItem("erp_token");
                    let connection = new signalR.HubConnectionBuilder()
                        .withUrl(`/hub/node`, {
                            accessTokenFactory: () => token,
                        })
                        .withAutomaticReconnect({
                            nextRetryDelayInMilliseconds: (_retryContext) => {
                                return 5000;
                            },
                        })
                        .build();

                    // 现场数据
                    let sceneList = [];
                    const getData = function (dashboardId, nodeId) {
                        return t.ajax
                            .getUrl(`/api/dashboard/${dashboardId}/node/${nodeId}/properties?access_token=${token}`)
                            .then((r) => {
                                return r.map((item) => {
                                    item.dashboardId = dashboardId;
                                    return item;
                                });
                            });
                    };
                    t.plantDetail.smartDeviceBoList.map((item) => {
                        sceneList.push(getData(item.dashboardId, item.id));
                    });
                    Promise.all(sceneList).then((res) => {
                        let r = [];
                        res.map((item) => {
                            item.map((i) => {
                                r.push(i);
                            });
                        });
                        t.scene = r;
                        a();
                    });

                    // 环境数据
                    let ambientList = [];
                    connection.start().then(() => {
                        t.plantDetail.smartDeviceBoList.map((item) => {
                            ambientList.push(connection.invoke("Subscribe", item.smartDeviceId));
                        });
                        Promise.all(ambientList).then((res) => {
                            if (res && res.length > 0) {
                                res.forEach((item) => {
                                    if (item && item.properties) {
                                        item.properties.forEach((child) => {
                                            t.ambient.push(child);
                                        });
                                    }
                                });
                            }
                        });
                    });
                }
            });
        },
        // 保存已选中的现场数据
        setHistoryAnalyze() {
            this.ajax
                .post("/api/v1/adam/task/saveHistoryAnalyze", {
                    analyzeOption: JSON.stringify(this.sceneSelected),
                    growPlantId: this.$route.query.id,
                })
                .then(() => {
                    this.setCharts(this.activeCharts);
                });
        },
        // 获取已选中的现场数据
        getHistoryAnalyze() {
            return new Promise((a, b) => {
                this.ajax
                    .post("/api/v1/adam/task/getHistoryAnalyze", {
                        growPlantId: this.$route.query.id,
                    })
                    .then((r) => {
                        this.sceneSelected = JSON.parse(r.data.analyzeOption);
                        a();
                    });
            });
        },
        // 获取属性icon地址
        getIconUrl(icon) {
            return `https://cdn.deepberry.cn/img/common/node-props/${icon || "default"}.svg`;
        },
        // 移除已选择的标签
        removeTag(index) {
            this.sceneSelected.splice(index, 1);
        },
        // 获取农事记录照片
        getFarmRecordImg() {
            this.ajax
                .post("/api/v1/adam/task/getFarmRecordImg", {
                    growPlantId: this.$route.query.id,
                })
                .then((r) => {
                    let imgs = [];
                    r.data.map((item) => {
                        item = item.split(",");
                        imgs = [...imgs, ...item];
                    });
                    this.imgs = imgs;
                });
        },
        device() {
            // // 预定义变量
            const socketApiUrl = "https://io.deepberry.cn";
            const cdnUrl = "https://cdn.deepberry.cn";
            const token = localStorage.getItem("erp_token");

            // 初始化
            let connection = new signalR.HubConnectionBuilder()
                .withUrl(`/hub/node`, {
                    accessTokenFactory: () => token,
                })
                .withAutomaticReconnect({
                    nextRetryDelayInMilliseconds: (_retryContext) => {
                        return 5000;
                    },
                })
                .build();

            // 启动
            connection.start().then(() => {
                console.log(this.connection.invoke("Subscribe"));
            });
            let dashboardId = 45;
            let nodeId = 48;
            this.ajax
                .getUrl(`/api/dashboard/${dashboardId}/node/${nodeId}/properties?access_token=${token}`)
                .then((r) => {
                    console.log(r);
                });

            let user = JSON.parse(localStorage.getItem("erp_user"));
            this.ajax.getUrl(`/hub/overview?`).then((r) => {
                console.log(r);
            });
        },
    },
};
</script>

<style lang="less" scoped>
.d {
    width: 100%;
    height: 600px;
    overflow-x: hidden;
    overflow-y: auto;
    .box {
        .wrap {
            padding: 20px 0;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            .title {
                span {
                    color: #1c82d7;
                    font-size: 12px;
                }
            }
            .left {
                width: 50%;
                overflow-x: hidden;
                overflow-y: auto;
                .tags {
                    display: flex;
                    justify-content: flex-start;
                    align-content: flex-start;
                    flex-wrap: wrap;
                    margin-top: 20px;
                }
                .btn {
                    margin-top: 20px;
                }
                .charts {
                    width: 100%;
                    height: 500px;
                    padding-bottom: 30px;
                    margin-top: 20px;
                    pointer-events: auto;
                }
            }
            .right {
                width: 50%;
                margin-left: 100px;
                .imgs {
                    display: flex;
                    justify-content: space-between;
                    align-content: flex-start;
                    flex-wrap: wrap;
                    img {
                        width: calc(23% - 2px);
                        height: 120px;
                        border: 1px solid #f5f5f5;
                        margin-right: 2%;
                        margin-top: 20px;
                        border-radius: 10px;
                    }
                    div {
                        width: 23%;
                        margin-right: 2%;
                    }
                }
                .items {
                    overflow-x: auto;
                    overflow-y: hidden;
                    margin-top: 20px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    div {
                        width: 120px;
                        height: 100px;
                        text-align: center;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        margin-right: 10px;
                        img {
                            width: 25px;
                            margin-top: 10px;
                        }
                        p:nth-child(2) {
                            color: #333333;
                            margin-top: 5px;
                        }
                        p:nth-child(3) {
                            color: #979797;
                            margin-top: 5px;
                        }
                    }
                }
            }
        }
        .wrap:first-child {
            border-bottom: 1px solid #ccc;
        }
    }
}
</style>
