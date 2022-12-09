<template>
    <div class="stockPut inner">
        <div class="box">
            <div class="head">
                <el-button link type="primary" @click="back">
                    <i
                        class="erp erpfanhui"
                        style="font-size: 14px; margin-right: 5px; position: relative; top: -1px"
                    ></i>
                    返回
                </el-button>
                <span style="position: relative; top: 2px; font-size: 15px">作物详情</span>
            </div>
            <div class="main" v-loading="loading">
                <div class="wrap info">
                    <div class="plant">
                        <img :src="detail.image" alt="" />
                        <div>
                            <p>{{ detail.categoryTitle }}-{{ detail.address }}</p>
                            <p><span>品种：</span>{{ detail.varietyTitle }}</p>
                            <p>
                                <span>天数：</span><i style="color: #4069d2">第{{ detail.count }}天</i>
                            </p>
                        </div>
                    </div>
                    <div class="tips">
                        <div>
                            <el-alert v-if="proposal" :title="proposal" :closable="false" type="warning" show-icon />
                            &nbsp;
                        </div>
                        <div class="select">
                            <el-button
                                type="primary"
                                style="width: 120px"
                                v-if="$store.state.power.workingHoursBtn"
                                @click="showGuide = true"
                                >种植指导</el-button
                            >
                            <el-select
                                v-model="selectValue"
                                style="width: 120px"
                                class="m-2"
                                placeholder="作物管理"
                                @change="selectChange"
                            >
                                <el-option
                                    v-for="(item, index) in selectList"
                                    :key="index"
                                    :label="item"
                                    :value="item"
                                />
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="tabs">
                    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
                        <el-tab-pane label="种植任务" name="1" v-if="$store.state.power.farmTaskList">
                            <PlantCropsDetailTabA @gotob="gotob"></PlantCropsDetailTabA>
                        </el-tab-pane>
                        <el-tab-pane label="农事记录" name="2" v-if="$store.state.power.farmRecordList">
                            <PlantCropsDetailTabB :plantName="plantName"></PlantCropsDetailTabB>
                        </el-tab-pane>
                        <el-tab-pane label="农事统计" name="3" v-if="$store.state.power.farmStatistics">
                            <PlantCropsDetailTabC></PlantCropsDetailTabC>
                        </el-tab-pane>
                        <el-tab-pane label="种植分析" name="4" v-if="showTabD">
                            <PlantCropsDetailTabD></PlantCropsDetailTabD>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
        <PlantGuide v-if="showGuide" @close="closeGuide"></PlantGuide>
        <PlantAddCrops
            :isEdit="true"
            :id="editCropsId"
            v-if="showAddCropsBox"
            @onCloseAdd="onCloseAddCrops"
        ></PlantAddCrops>
    </div>
</template>

<script lang="js">
const iourl = process.env["NODE_ENV"] == "development" ? "" : "https://io.deepberry.cn";
import * as signalR from '@microsoft/signalr';
import timer from "@/utils/timer.js";
import PlantCropsDetailTabA from './PlantCropsDetailTabA';
import PlantCropsDetailTabB from './PlantCropsDetailTabB';
import PlantCropsDetailTabC from './PlantCropsDetailTabC';
import PlantCropsDetailTabD from './PlantCropsDetailTabD';
import PlantGuide from '@/components/plant/PlantGuide';
import PlantAddCrops from "@/components/plant/PlantAddCrops";
export default {
    name: "stockRecord",
    data() {
        return {
            loading: false,
            activeName: '1',
            selectValue: '',
            selectList: [],
            detail: {},
            showGuide: false,
            editCropsId: '',
            showAddCropsBox: false,
            plantName: '',
            showTabD: false,
            proposal: '',
            device: [],
            growthStageList: [],
            selectedStageId: "",
            guide: [], // 操作指导
        }
    },
    mounted() {
        let t = this;
        let ajax = async function (){
            t.loading = true;
            await t.getData();
            await t.getProposal();
            await t.getGrowthStage();
            t.loading = false;
        }
        ajax();

        // 计算tabd是否显示
        let interval = setInterval(() => {
            if(!this.$store.state.power.loading) {
                let query = JSON.parse(JSON.stringify(this.$route.query));
                query.tab = 1;
                this.$router.push({
                    path: this.$route.path,
                    query
                })
                t.showTabD = true;
                if(this.$store.state.power.stopPlantBtn){
                    this.selectList.push('结束种植')
                }
                if(this.$store.state.power.editPlantBtn){
                    this.selectList.push('编辑作物')
                }
                if(this.$store.state.power.delPlantBtn){
                    this.selectList.push('删除作物')
                }
                clearInterval(interval);
            }
        }, 200);

    },
    components: {
        PlantCropsDetailTabA, PlantCropsDetailTabB, PlantCropsDetailTabC, PlantCropsDetailTabD, PlantGuide, PlantAddCrops
    },
    methods: {
        // 获取环境建议
        getProposal (){
            let t = this;
            return new Promise((a, b) => {
                if (t.detail.smartDeviceBoList.length > 0) {
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

                    let list = [];
                    connection.start().then(() => {
                        t.detail.smartDeviceBoList.map((item) => {
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
        // 获取生长阶段
        getGrowthStage() {
            return new Promise((a, b) => {
                this.ajax
                    .post("/api/v1/adam/farm/getGrowthStageByPlantId", {
                        id: this.$route.query.id,
                        device: this.device,
                    })
                    .then((r) => {
                        if (!r.data){
                            a();
                            return;
                        }
                        this.stepList = r.data;
                        this.growthStageList = r.data.map((item) => {
                            if(item.isIn == 1){
                                this.proposal = item.text;
                            }
                            // text重新赋值
                            item.suggestion = item.text;
                            item.text = item.phaseName;
                            item.value = item.id;
                            return item;
                        });
                        this.selectedStageId = this.growthStageList[0] && this.growthStageList[0].id;
                        a();
                    });
            });
        },
        // 去执行
        gotob (){
            this.showADialog = true;
        },
        onCloseAddCrops(params) {
            if (params == 1) {
                // 通过触发路由刷新数据
                this.getData();
            }
            this.selectValue = '';
            setTimeout(() => {
                this.showAddCropsBox = false;
            }, 500);
        },
        // 操作作物
        selectChange (){
            // 结束种植
            if(this.selectValue == '结束种植'){
                this.ajax.post('/api/v1/adam/plants/end', {
                    id: this.$route.query.id
                }).then(r => {
                    this.$message.success('操作成功');
                    this.$router.push({
                        path: '/erp/plant',
                        query: {
                            gardenId: this.$route.query.gardenId
                        }
                    })
                })
            }

            // 编辑作物
            if(this.selectValue == '编辑作物'){
                this.showAddCropsBox = true;
                this.editCropsId = this.$route.query.id;
            }
            // 删除作物
            if(this.selectValue == '删除作物'){
                this.ajax.post('/api/v1/adam/plants/deletePlants', {
                    id: this.$route.query.id
                }).then(r => {
                    this.$message.success('删除成功');
                    this.$router.push({
                        path: '/erp/plant',
                        query: {
                            gardenId: this.$route.query.gardenId
                        }
                    })
                })
            }
        },
        // 返回列表
        back() {
            this.$router.push({
                path: '/erp/plant',
                query: {
                    gardenId: this.$route.query.gardenId
                }
            });
        },
        handleClick (v){
            let query = JSON.parse(JSON.stringify(this.$route.query));
            query.tab = v;
            this.$router.push({
                path: this.$route.path,
                query
            })
        },
        // 关闭种植指导
        closeGuide (){
            setTimeout(() => {
                this.showGuide = false;
            }, 500);
        },
        // 获取作物详情
        getData (){
            return new Promise((a,b) => {
                this.ajax.post('/api/v1/adam/plants/getPlants', {
                    id: this.$route.query.id
                }).then(r => {
                    r.data.count = new Date().getTime() / 1000 - timer.parse(r.data.plantTime).getTime() / 1000;
                    r.data.count = Math.ceil(r.data.count / 60 / 60 / 24);
                    r.data.smartDeviceBoList = r.data.smartDeviceBoList || [];
                    this.detail = r.data;
                    this.plantName = r.data.categoryTitle + '-' + r.data.address;
                    a();
                })
            })
        }
    },
}
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
.main {
    padding: 0 50px;
    .wrap {
        padding: 20px 0;
        border-bottom: 1px solid #e9e9e9;
    }
    .tabs {
        padding: 20px 0;
    }
    .wrap.info {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;

        .plant {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img {
                width: 100px;
                height: 100px;
                border-radius: 5px;
            }
            div {
                height: 100px;
                margin-left: 10px;
                p:nth-child(1) {
                    font-size: 16px;
                }
                p:nth-child(n + 2) {
                    font-size: 12px;
                    margin-top: 20px;
                    span {
                        color: #999999;
                    }
                }
            }
        }
        .tips {
            margin-left: 50px;
            width: 260px;
            height: 100px;
            display: flex;
            justify-content: flex-start;
            align-content: space-between;
            flex-wrap: wrap;
            .select {
                width: 260px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
    .t {
        padding: 20px 0;
    }
    .list {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        .table {
            margin-right: 20px;
            width: 360px;
            .tableTitle {
                background: #f5f7f9;
                text-align: center;
                padding: 12px 0;
            }
            .tableItem {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                border-left: 1px solid #d2e8fd;
                border-right: 1px solid #d2e8fd;
                p {
                    width: 180px;
                    text-align: center;
                    padding: 12px 0;
                    border-bottom: 1px solid #d2e8fd;
                    color: #777777;
                }
                p:first-child {
                    border-right: 1px solid #d2e8fd;
                }
            }
            .tableItem.tableHead {
                background: #e8f2fc;
                p {
                    color: #5a91ff;
                }
            }
            .tableItem.tableAll {
                p {
                    color: #262628;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>
