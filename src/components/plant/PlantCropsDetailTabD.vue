<template>
    <div class="d">
        <div class="box">
            <div class="wrap">
                <div class="left">
                    <div class="title">作物现场数据</div>
                    <el-select
                        v-model="sceneSelected"
                        multiple
                        placeholder="请选择节点，可选择多个"
                        style="width: 100%; margin-top: 20px"
                        @change="setHistoryAnalyze"
                    >
                        <el-option
                            v-for="(item, index) in scene"
                            :key="index"
                            :label="item.gardenName + '-' + item.displayName"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
                <div class="right">
                    <div class="title" style="position: relative; top: -20px">
                        <div>作物实时数据 <span>（获取更多作物生长环境数据，请联系客服接入相关设备）</span></div>
                        <el-select
                            v-model="ambientSelected"
                            multiple
                            collapse-tags
                            placeholder="请选择节点"
                            style="width: 280px; margin-top: 20px; position: relative; top: -8px"
                        >
                            <el-option
                                v-for="(item, index) in tempList"
                                :key="index"
                                :label="item.gardenName + '-' + item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                    <div style="width: 100%; overflow-x: auto; position: relative; top: -35px">
                        <el-empty description="暂无环境数据" style="margin: 0 auto" v-if="ambient.length == 0" />
                        <div class="items" :style="{ width: ambientSelectedArray.length * 130 + 'px' }">
                            <div v-for="(item, index) in ambientSelectedArray" :key="index">
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
                    <div class="echartBox" v-if="sceneTags.length > 0">
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
                    <el-empty description="暂无图表数据" style="margin: 0 auto" v-if="sceneTags.length == 0" />
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
const iourl = process.env["NODE_ENV"] == "development" ? "" : "https://io.deepberry.cn";
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
            ambientSelected: [],
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
            tempList: [],
            tempListSon: [],
        };
    },
    watch: {
        $route(v) {
            console.log(v);
            if (v.query.tab == 4) {
                let t = this;
                let ajax = async function () {
                    await t.getData();
                    await t.getGrow();
                    await t.getHistoryAnalyze();
                    if (t.sceneSelected.length > 0) {
                        t.setCharts();
                    }
                    t.getFarmRecordImg();
                };
                ajax();
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
        ambientSelectedArray() {
            let data = [];
            this.ambientSelected.map((item) => {
                this.tempList.map((i) => {
                    if (item == i.id) {
                        data = [...i.properties, ...data];
                    }
                });
            });
            return data;
        },
        imgSpace() {
            let r = 0;
            r = 4 - (this.imgs.length % 4);
            return r;
        },
    },
    methods: {
        // 渲染图表
        setCharts(index = -1) {
            if (index > -1) this.activeCharts = index;
            this.chartsData(this.activeCharts).then((r) => {
                let ec = echarts.init(this.$refs.charts);
                ec.clear();
                ec.setOption(r);
                console.log(r);
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
                    r.map((item) => {
                        item.data = item.data || [];
                        legend.push(item.propertyName);
                        let data = this.clip(item.data);
                        let row = {
                            name: item.propertyName,
                            data: data.map((d) => d[1]),
                            type: "line",
                            // smooth: true,
                            // areaStyle: {},
                        };
                        series.push(row);
                        if (xAxis.length == 0) {
                            xAxis = data.map((d) => {
                                return this.activeCharts > 1 ? timer.time("m-d", d[0]) : timer.time("h:i", d[0]);
                            });
                        }
                        console.log(xAxis);
                    });
                    let data = {
                        tooltip: {
                            trigger: "axis",
                            show: true,
                            triggerOn: "mousemove",
                        },
                        legend: {
                            data: legend,
                        },
                        xAxis: {
                            type: "category",
                            data: xAxis,
                            // axisLabel: {
                            //     interval: 0,
                            //     rotate: 45
                            // }
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
            let r = [];
            let num = this.chartList[this.activeCharts].diff;
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
                    stop = timer.time("y-m-d+23:59:59", (unix - 86400) * 1000);
                    break;
                case 1:
                    start = timer.time("y-m-d+00:00:00", unix * 1000);
                    break;
                case 2:
                    start = timer.time("y-m-d+00:00:00", (unix - 86400 * 2) * 1000);
                    break;
                case 3:
                    start = timer.time("y-m-d+00:00:00", (unix - 86400 * 6) * 1000);
                    break;
            }
            let url = `${iourl}/api/dashboard/${dashboardId}/node/${nodeId}/property/${propertyId}/chart?start=${start}&stop=${stop}&access_token=${token}`;
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
                        r.data.smartDeviceBoList = r.data.smartDeviceBoList || [];
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
                        .withUrl(`${iourl}/hub/node`, {
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
                            .getUrl(
                                `${iourl}/api/dashboard/${dashboardId}/node/${nodeId}/properties?access_token=${token}`
                            )
                            .then((r) => {
                                return r.map((item) => {
                                    item.dashboardId = dashboardId;
                                    return item;
                                });
                            });
                    };
                    let sceneNames = [];
                    t.plantDetail.smartDeviceBoList.map((item) => {
                        if (item.title) {
                            sceneNames.push(item.title.split("-")[0]);
                        }
                        sceneList.push(getData(item.dashboardId, item.smartDeviceId));
                    });
                    Promise.all(sceneList).then((res) => {
                        let r = [];
                        res.map((item, index) => {
                            item.gardenName = sceneNames[index];
                            item.map((i) => {
                                i.gardenName = item.gardenName;
                                r.push(i);
                            });
                        });
                        t.scene = r;
                        a();
                    });

                    // 环境数据
                    let ambientList = [];
                    connection.start().then(() => {
                        let names = [];
                        t.plantDetail.smartDeviceBoList.map((item) => {
                            if (item.title) {
                                names.push(item.title.split("-")[0]);
                            }
                            ambientList.push(connection.invoke("Subscribe", item.smartDeviceId));
                        });
                        Promise.all(ambientList).then((res) => {
                            if (res && res.length > 0) {
                                console.log(res);
                                this.tempList = res.map((item, index) => {
                                    item.gardenName = names[index];
                                    if (item && item.properties) {
                                        item.properties.map((child) => {
                                            child.gardenName = item.gardenName;
                                            t.ambient.push(child);
                                        });
                                    }
                                    return item;
                                });
                                t.ambientSelected = [res[0].id];
                            }
                        });
                    });
                } else {
                    a();
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
                    this.getHistoryAnalyze().then(() => {
                        this.setCharts();
                    });
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
                        if (JSON.parse(r.data.analyzeOption) && JSON.parse(r.data.analyzeOption).length > 0) {
                            this.sceneSelected = JSON.parse(r.data.analyzeOption);
                        } else {
                            this.sceneSelected = this.scene.slice(0, 3).map((item) => {
                                return item.id;
                            });
                        }
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
            this.setHistoryAnalyze();
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
                display: flex;
                justify-content: space-between;
                align-items: center;
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
