<template>
    <el-dialog :before-close="onClose" append-to-body v-model="showDetailBox" title="添加农事" width="700px">
        <div class="form">
            <div class="item">
                <div class="title">种植植物：</div>
                <div class="content">
                    <p class="text">{{ categoryTitle }}</p>
                </div>
            </div>
            <div class="item">
                <div class="title"><span>*</span>农事类型：</div>
                <div class="content f">
                    <el-select style="width: 100%" @change="selectType" v-model="farmId" placeholder="请选择农事类型">
                        <el-option
                            v-for="item in farmType"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                    <el-input
                        style="width: 300px; margin-left: 10px"
                        v-if="showPickCount"
                        v-model="pickCount"
                        :placeholder="pickCountText"
                    >
                        <template v-if="pickCountText == '采摘重量'" #append>公斤</template>
                    </el-input>
                </div>
            </div>
            <div class="item" v-if="showPests">
                <div class="title"></div>
                <div class="content nz">
                    <el-form ref="pests" :model="form" label-width="70px">
                        <el-form-item label="监测点">
                            <el-input v-model="pests.name"></el-input>
                        </el-form-item>
                        <el-form-item label="虫子情况">
                            <div style="width: 540px">
                                <div class="nzItem" v-for="(item, index) in bugsList" :key="index">
                                    <div class="pestsBox">
                                        <span>
                                            <span class="tag">{{ item.name }}</span>
                                        </span>
                                        <span>{{ item.num }}只</span>
                                        <i class="erp erpshanchu" @click="removeBugs(index, 1)"></i>
                                    </div>
                                </div>
                                <div class="nzAdd" style="width: 472px" @click="addPests(1)">
                                    <i class="erp erpicon_tianjia"></i> 添加虫子
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="天敌情况">
                            <div style="width: 540px">
                                <div class="nzItem" v-for="(item, index) in enemyList" :key="index">
                                    <div class="pestsBox">
                                        <span>
                                            <span class="tag">{{ item.name }}</span>
                                        </span>
                                        <span>{{ item.num }}个</span>
                                        <i class="erp erpshanchu" @click="removeBugs(index, 0)"></i>
                                    </div>
                                </div>
                                <div class="nzAdd" style="width: 472px" @click="addPests(0)">
                                    <i class="erp erpicon_tianjia"></i> 添加天敌
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="item" v-if="showGrow">
                <div class="title"></div>
                <div class="content nz">
                    <el-form ref="grow" :model="grow" label-width="70px">
                        <el-form-item label="植株编号">
                            <el-input v-model="grow.listId"></el-input>
                        </el-form-item>
                        <el-form-item label="株高">
                            <el-input v-model="grow.height"><template #append>厘米</template></el-input>
                        </el-form-item>
                        <el-form-item label="节点数">
                            <el-input v-model="grow.num"><template #append>个</template></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="item">
                <div class="title">使用农资：</div>
                <div class="content nz">
                    <div class="nzItem" v-for="(item, index) in farmUseBos" :key="item.id">
                        <div class="nzBox">
                            <span>
                                <span class="tag">{{ item.agriculturalType }}</span>
                            </span>
                            <span>{{ item.agricultural }}</span>
                            <span>{{ item.agriculturalCount }}{{ item.agriculturalUnit }}</span>
                        </div>
                        <i class="erp erpshanchu" @click="removeNz(index)"></i>
                    </div>
                    <div class="nzAdd" @click="addNz"><i class="erp erpicon_tianjia"></i> 添加农资</div>
                </div>
            </div>
            <div class="item">
                <div class="title">工时：</div>
                <div class="content">
                    <el-input v-model="workHour" placeholder="请输入工时">
                        <template #append>小时</template>
                    </el-input>
                </div>
            </div>
            <div class="item">
                <div class="title">农事照片：</div>
                <div class="content">
                    <div class="pics">
                        <div class="img" v-for="(item, imgIndex) in imgs" :key="imgIndex">
                            <img :src="item" alt="" />
                            <i class="erp erpguanbi" @click="removeImg(imgIndex)"></i>
                        </div>
                        <div class="upload" v-if="imgs.length < 2">
                            <input v-if="!uploading" @change="uploadFile" ref="file" type="file" />
                            <p v-if="!uploading"><i class="erp erpshangchuan"></i></p>
                            <p v-if="!uploading">点击上传照片</p>
                            <el-progress v-if="uploading" :width="90" type="circle" :percentage="percentage" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="title">备注：</div>
                <div class="content">
                    <el-input v-model="workText" :rows="5" type="textarea" placeholder="请输入备注内容" />
                </div>
            </div>
            <div class="item">
                <div class="title"></div>
                <div class="content">
                    <div class="showMore" @click="showMore = true" v-if="!showMore">
                        查看更多 <i class="erp erp31xiala"></i>
                    </div>
                </div>
            </div>
            <div class="item" v-if="showMore">
                <div class="title">作业方式：</div>
                <div class="content">
                    <el-select style="width: 100%" v-model="workType" placeholder="请选择作业方式">
                        <el-option
                            v-for="item in operatingType"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
            </div>
            <div class="item" v-if="showMore">
                <div class="title">操作时间：</div>
                <div class="content">
                    <el-date-picker
                        style="width: 100%"
                        v-model="workTime"
                        type="date"
                        placeholder="请选择日期"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                    />
                </div>
            </div>
            <div class="item" v-if="showMore">
                <div class="title">操作人：</div>
                <div class="content">
                    <p class="text">{{ workAname }}</p>
                </div>
            </div>
            <div class="btn">
                <el-button type="primary" plain @click="onClose">取消</el-button>
                <el-button type="primary" @click="submit">保存</el-button>
            </div>
        </div>
        <PlantCropsDetailBDialogChose
            @save="save"
            @chose="chose"
            v-if="showChose"
            :selected="farmUseBos"
            @close="closeChose"
        ></PlantCropsDetailBDialogChose>
        <PlantCropsDetailBDialogAddPests
            v-if="showAddPests"
            :type="addPestsType"
            @close="closePests"
            @save="savePests"
        ></PlantCropsDetailBDialogAddPests>
    </el-dialog>
</template>

<script>
import upload from "@/utils/upload.js";
const iourl = process.env["NODE_ENV"] == "development" ? "" : "https://io.deepberry.cn";
import * as signalR from "@microsoft/signalr";
import timer from "@/utils/timer";
import PlantCropsDetailBDialogChose from "@/components/plant/PlantCropsDetailBDialogChose";
import PlantCropsDetailBDialogAddPests from "@/components/plant/PlantCropsDetailBDialogAddPests";
export default {
    props: ["taskId", "plantName"],
    emits: ["success", "close", "load", "finish"],
    data() {
        return {
            showDetailBox: true,
            uploading: false,
            percentage: 0,
            showMore: false,
            showChose: false,
            farmType: [],
            farmId: "",
            categoryTitle: "",
            farmUseBos: [],
            workHour: "",
            imgs: [],
            workText: "",
            operatingType: [],
            workType: "",
            workTime: "",
            workAid: "",
            workAname: "",
            plantDetail: {},
            device: [],
            pickCount: "", // 采摘重量
            showPickCount: false,
            pickCountText: "",
            showPests: false,
            pests: {}, // 病虫害
            showAddPests: false,
            addPestsType: 1,
            bugsList: [],
            enemyList: [],
            showGrow: false,
            grow: {}, // 生长观察
        };
    },
    mounted() {
        this.getFarmType();
        this.getOperatingType();
        let user = JSON.parse(localStorage.getItem("erp_user"));
        this.workAid = user.id;
        this.workAname = user.name;
        this.workTime = timer.time("y-m-d");
        this.categoryTitle = this.plantName;
        this.getDetail();
    },
    components: {
        PlantCropsDetailBDialogChose,
        PlantCropsDetailBDialogAddPests,
    },
    methods: {
        // 添加虫子和天敌
        addPests(type) {
            this.showAddPests = true;
            this.addPestsType = type;
        },
        removeBugs(index, type) {
            if (type) {
                this.bugsList.splice(index, 1);
            } else {
                this.enemyList.splice(index, 1);
            }
        },
        savePests(v) {
            // 病虫害
            if (v.type) {
                this.bugsList.push({
                    name: v.name,
                    num: v.num,
                });
            } else {
                // 天敌
                this.enemyList.push({
                    name: v.name,
                    num: v.num,
                });
            }
        },
        closePests() {
            let t = setTimeout(() => {
                this.showAddPests = false;
                clearTimeout(t);
            }, 500);
        },
        addNz() {
            this.showChose = true;
        },
        selectType(a) {
            let title = false;
            this.farmType.map((item) => {
                if (item.id == a) {
                    title = item.title;
                }
            });
            this.showPickCount = title == "采摘" || title == "自定义" ? true : false;
            this.showPests = title == "病虫害监测" ? true : false;
            this.showGrow = title == "生长观察" ? true : false;
            if (this.showPickCount) {
                this.pickCountText = title == "采摘" ? "采摘重量" : "输入农事类型";
            }
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
        // 移除农资项
        removeNz(index) {
            this.farmUseBos.splice(index, 1);
        },
        chose(v) {
            console.log(v);
            let data = [...this.farmUseBos, ...v].map((item) => {
                item.agriculturalCount = Number(item.agriculturalCount);
                return item;
            });
            var trans = function (v) {
                var arr = [];
                var list = [];
                for (var i = 0; i < v.length; i++) {
                    if (list.indexOf(v[i].agricultural) > -1) {
                        arr[list.indexOf(v[i].agricultural)].agriculturalCount = v[i].agriculturalCount;
                    } else {
                        list.push(v[i].agricultural);
                        v[i].isUse = 1;
                        arr.push(v[i]);
                    }
                }
                return arr;
            };
            this.farmUseBos = trans(data);
        },
        // 保存农资
        save(params) {
            this.farmUseBos.push(params);
        },
        submit() {
            let t = this;
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
                        t.submitPost(1);
                    });
                });
            } else {
                t.submitPost(0);
            }
        },
        submitPost(device) {
            let farmDetailBo = {};
            if (this.farmId == 16) {
                farmDetailBo.title = this.pests.name;
                farmDetailBo.farmType = 0;
                farmDetailBo.farmDetailListChongBoList = this.bugsList.map((item) => {
                    return {
                        count: item.num,
                        farmDetailId: 0,
                        title: item.name,
                        type: 0,
                    };
                });
                farmDetailBo.farmDetailListTianBoList = this.enemyList.map((item) => {
                    return {
                        count: item.num,
                        farmDetailId: 0,
                        title: item.name,
                        type: 1,
                    };
                });
            }
            if (this.farmId == 17) {
                farmDetailBo.title = this.grow.listId;
                farmDetailBo.farmType = 1;
                farmDetailBo.farmDetailListGrowBoList = [
                    {
                        count: this.grow.num,
                        farmDetailId: 0,
                        title: this.grow.height,
                    },
                ];
            }
            let data = {
                categoryTitle: this.categoryTitle,
                farmId: this.farmId,
                farmUseBos: this.farmUseBos,
                farmDetailBo,
                workHour: this.workHour,
                image: this.imgs.join(","),
                workText: this.workText,
                workType: this.workType,
                workTime: this.workTime + " " + timer.time("h:i:s"),
                taskId: this.taskId || "",
                workAid: this.workAid,
                plantsId: this.$route.query.id,
                title: "",
            };
            if (this.showPickCount) {
                if (this.pickCountText == "采摘重量") {
                    data.title = "采摘";
                    data.pickCount = this.pickCount;
                }
                if (this.pickCountText == "输入农事类型") {
                    data.title = this.pickCount;
                }
            } else {
                this.farmType.map((item) => {
                    if (item.id == this.farmId) {
                        data.title = item.title;
                    }
                });
            }
            if (device) data.smartDevice = JSON.stringify(this.device);
            if (!data.farmId) {
                this.$message.warning("请选择农事类型");
                return;
            }
            this.ajax.post("/api/v1/adam/farm/editeFarm", data).then((r) => {
                if (r.code == 200) {
                    this.$message.success("添加成功");
                    this.onClose(1);
                    if (this.taskId) {
                        this.finishTask();
                    }
                } else {
                    this.$message.error("添加失败，请稍后再试");
                }
            });
        },
        // 完成农事任务
        finishTask() {
            this.ajax
                .post("/api/v1/adam/task/finishTask", {
                    taskId: this.taskId,
                })
                .then((r) => {
                    this.$emit("finish");
                });
        },
        // 获取农事类型
        getFarmType() {
            this.ajax.post("/api/v1/adam/farm/getFarmType").then((r) => {
                this.farmType = r.data;
            });
        },
        // 获取作业方式
        getOperatingType() {
            this.ajax.post("/api/v1/adam/farm/getOperatingType").then((r) => {
                this.operatingType = r.data;
                r.data.map((item) => {
                    if (item.title == "人工") {
                        this.workType = item.id;
                    }
                });
            });
        },
        // 移除图片
        removeImg(index) {
            console.log(index);
            this.imgs.splice(index, 1);
        },
        // 上传图片
        uploadFile() {
            this.uploading = true;
            let file = this.$refs.file.files[0];
            upload(file, `erp/farmingHistory/${file.name}`).then((r) => {
                if (r.url) {
                    this.imgs.push(r.url);
                    this.uploading = false;
                    this.percentage = 0;
                }
            });
        },
        onClose(params = null) {
            if (typeof params == "function") {
                params = null;
            }
            this.$emit("close", params);
            this.showDetailBox = false;
        },
        closeChose() {
            setTimeout(() => {
                this.showChose = false;
            }, 300);
        },
    },
};
</script>

<style lang="less" scoped>
.form {
    width: 660px;
    position: relative;
    top: -20px;
    border-top: 1px solid rgb(231, 231, 231);
    .item {
        width: 660px;
        margin-top: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        .title {
            width: 100px;
            text-align: right;
            line-height: 30px;
            span {
                color: red;
            }
        }
        .content {
            width: 540px;
            .showMore {
                height: 40px;
                text-align: center;
                cursor: pointer;
                background: #f4f8ff;
                color: #538dff;
                line-height: 40px;
                margin-bottom: 20px;
            }
            .nzItem {
                width: 540px;
                display: flex;
                justify-content: space-between;
                .nzBox {
                    width: 480px;
                    border: 1px solid rgb(236, 236, 236);
                    padding: 7px 10px;
                    margin-bottom: 5px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    font-size: 13px;
                    > span {
                        width: 160px;
                        text-align: left;
                    }
                    span.tag {
                        background: #c3f8c7;
                        color: #2ac726;
                        display: inline-block;
                        padding: 2px 10px;
                        font-size: 12px;
                        border-radius: 3px;
                    }
                }
                .pestsBox {
                    width: 450px;
                    border: 1px solid rgb(236, 236, 236);
                    padding: 0px 10px;
                    margin-bottom: 5px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 13px;
                    line-height: normal !important;
                    > span {
                        width: 150px;
                        text-align: left;
                    }
                    > span:last-child {
                        text-align: right;
                    }
                    span.tag {
                        background: #c3f8c7;
                        color: #2ac726;
                        display: inline-block;
                        padding: 2px 10px;
                        font-size: 12px;
                        border-radius: 3px;
                    }
                }
                i {
                    width: 40px;
                    font-size: 20px;
                    color: #538dff;
                    cursor: pointer;
                    line-height: 35px;
                    text-align: center;
                }
            }
            .nzAdd {
                height: 35px;
                color: #538dff;
                line-height: 35px;
                cursor: pointer;
                font-size: 12px;
                text-align: center;
                background: #f4f8ff;
                position: relative;
                top: -5px;
                i {
                    font-size: 13px;
                }
            }
            .pics {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: wrap;
                .img {
                    width: 180px;
                    height: 100px;
                    border-radius: 5px;
                    margin: 0 10px;
                    position: relative;
                    overflow: hidden;
                    img {
                        width: 180px;
                        height: 100px;
                    }
                    i {
                        display: inline-block;
                        font-size: 14px;
                        color: #ffffff;
                        position: absolute;
                        top: 0;
                        right: 0;
                        cursor: pointer;
                        background: rgba(0, 0, 0, 0.5);
                        padding: 5px;
                    }
                }
                .upload {
                    width: 180px;
                    height: 100px;
                    border-radius: 5px;
                    background: rgba(244, 248, 251, 1);
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    flex-wrap: wrap;
                    font-size: 12px;
                    color: rgba(107, 145, 242, 1);
                    cursor: pointer;
                    position: relative;
                    p {
                        width: 100%;
                        text-align: center;
                        padding: 5px 0;
                        i {
                            font-size: 22px;
                        }
                    }
                    input {
                        width: 180px;
                        height: 100px;
                        background: rgba(0, 0, 0, 0.5);
                        position: absolute;
                        top: 0;
                        left: 0;
                        cursor: pointer;
                        opacity: 0;
                    }
                    .el-progress--circle {
                        position: absolute;
                        top: 5px;
                        z-index: 10;
                    }
                }
            }
            p.text {
                line-height: 30px;
            }
        }
        .content.f {
            display: flex;
        }
    }
    .btn {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
}
</style>
