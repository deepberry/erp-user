<template>
    <div class="taskDetail purchaseDetailBox">
        <el-dialog
            custom-class="taskDetail purchaseDetailBox"
            :before-close="onClose"
            append-to-body
            v-model="showDetailBox"
            title="创建任务"
            width="700px"
        >
            <div v-loading="detailLoading" class="taskDetailInner purchaseDetailBoxInner">
                <div class="item">
                    <p class="title">园区：</p>
                    <el-select v-model="selectedGarden" style="width: 650px" class="m-2" placeholder="请选择园区">
                        <el-option
                            v-for="(item, gardenIndex) in gardenList"
                            :key="gardenIndex"
                            :label="item.title"
                            :value="item.id"
                        />
                    </el-select>
                </div>
                <div class="item">
                    <p class="title">作物：</p>
                    <el-select
                        v-model="selectedPlant"
                        multiple
                        style="width: 650px"
                        class="m-2"
                        placeholder="请选择作物"
                    >
                        <el-option
                            v-for="(item, plantIndex) in plantList"
                            :key="plantIndex"
                            :label="item.categoryTitle + '-' + item.address"
                            :value="item.id"
                        />
                    </el-select>
                </div>
                <div class="item">
                    <p class="title">具体内容：</p>
                    <el-input v-model="taskContent" style="width: 650px" placeholder="请输入内容" />
                </div>
                <div class="item" style="align-items: flex-start">
                    <p class="title">需用农资：</p>
                    <div class="nz">
                        <div class="nzItem" v-for="(item, index) in farmUseBos" :key="item.id">
                            <div class="nzBox">
                                <span>
                                    <span class="tag">{{ item.agriculturalType }}</span>
                                </span>
                                <span></span>
                                <span>{{ item.agricultural }}</span>
                            </div>
                            <i class="erp erpshanchu" @click="removeNz(index)"></i>
                        </div>
                        <div class="nzAdd" @click="addNz"><i class="erp erpicon_tianjia"></i> 添加农资</div>
                    </div>
                </div>
                <div class="item">
                    <p class="title">操作指导：</p>
                    <div class="upload">
                        <video v-if="video && isVideo" controls :src="video" alt="" />
                        <img v-if="video && !isVideo" controls :src="video" alt="" />
                        <i class="erp erpguanbi" @click="video = ''" v-if="video"></i>
                        <div class="uploadBox" v-if="!video">
                            <input v-if="!uploading" @change="uploadFile" ref="file" type="file" />
                            <p v-if="!uploading"><i class="erp erpshangchuan"></i></p>
                            <p v-if="!uploading">点击上传视频</p>
                            <el-progress v-if="uploading" :width="90" type="circle" :percentage="percentage" />
                        </div>
                    </div>
                </div>
                <div class="item">
                    <p class="title">执行人：</p>
                    <el-select
                        v-model="selectedUser"
                        multiple
                        style="width: 650px"
                        class="m-2"
                        placeholder="请选择执行人"
                    >
                        <el-option
                            v-for="(item, userIndex) in userlist"
                            :key="userIndex"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </div>
                <div class="item">
                    <p class="title">开始时间：</p>
                    <el-date-picker
                        value-format="YYYY-MM-DD"
                        style="width: 650px"
                        v-model="startTime"
                        type="date"
                        placeholder="请选择开始时间"
                    />
                </div>
                <div class="item">
                    <p class="title">截止时间：</p>
                    <el-date-picker
                        style="width: 650px"
                        value-format="YYYY-MM-DD"
                        v-model="endTime"
                        type="date"
                        placeholder="请选择截止时间"
                    />
                </div>
            </div>
            <div class="btns">
                <el-button plain @click="onClose">取消</el-button>
                <el-button type="primary" @click="submit" :loading="submitting">确定</el-button>
            </div>
        </el-dialog>
        <PlantCropsDetailBDialogChose
            @save="save"
            @chose="chose"
            v-if="showChose"
            :selected="farmUseBos"
            @close="closeChose"
            from="createTask"
            neednum="no"
        ></PlantCropsDetailBDialogChose>
    </div>
</template>

<script>
import upload from "../../utils/upload.js";
import mins from "../../utils/mins.js";
import PlantCropsDetailBDialogChose from "@/components/plant/PlantCropsDetailBDialogChose";
export default {
    name: "taskDetail",
    props: ["id"],
    data() {
        return {
            detailLoading: false,
            showDetailBox: true, // 是否显示详情弹窗
            detail: "",
            showTextArea: false,
            textarea: "",
            isPass: "1",
            selectedGarden: "", // 当前选择的园区
            selectedPlant: [], // 当前选择的作物
            selectedUser: [], // 当前选择的人员
            gardenList: [], // 园区列表
            plantList: [], // 作物列表
            userlist: [], // 用户列表
            taskContent: "", // 任务内容
            startTime: "",
            endTime: "",
            video: "",
            isVideo: false,
            uploading: false,
            percentage: 0, // 上传进度
            searchCropLoading: false, // 作物搜索中
            submitting: false,
            showChose: false,
            farmUseBos: [],
            agricultural: [], // 需用农资
        };
    },
    mounted() {
        let t = this;
        let ajax = async function () {
            await t.getGardenList();
            await t.getUserlist();
        };
        ajax();
    },
    watch: {
        selectedGarden() {
            this.plantList = [];
            this.selectedPlant = "";
            this.ajax
                .post("/api/v1/adam/task/getPlantsByGarden", {
                    gardenId: this.selectedGarden,
                })
                .then((r) => {
                    console.log(r.data);
                    this.plantList = r.data;
                });
        },
    },
    components: {
        PlantCropsDetailBDialogChose,
    },
    methods: {
        closeChose() {
            setTimeout(() => {
                this.showChose = false;
            }, 300);
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
        removeNz(index) {
            this.farmUseBos.splice(index, 1);
        },
        // 保存农资
        save(params) {
            this.farmUseBos.push(params);
        },
        addNz() {
            this.showChose = true;
        },
        // 获取园区列表
        getGardenList() {
            return new Promise((a, b) => {
                this.ajax
                    .post("/api/v1/adam/garden/list", {
                        pageNum: 1,
                        pageSize: 100,
                        param: {},
                    })
                    .then((r) => {
                        this.gardenList = r.data;
                        a();
                    });
            });
        },
        // 获取人员列表
        getUserlist() {
            return new Promise((a, b) => {
                this.ajax
                    .post("/api/v1/adam/task/getOrganizationUsers", {
                        pageNum: 1,
                        pageSize: 100,
                        param: {},
                    })
                    .then((r) => {
                        this.userlist = r.data;
                        a();
                    });
            });
        },
        onClose(params = null) {
            if (typeof params == "function") {
                params = null;
            }
            this.$emit("onCloseCreate", params);
            this.showDetailBox = false;
        },
        // 上传视频
        uploadFile() {
            this.uploading = true;
            let file = this.$refs.file.files[0];
            upload(file, `erp/park/${file.name}`).then((r) => {
                if (r.url) {
                    this.isVideo = mins.file.type(r.url) == "img" ? false : true;
                    this.video = r.url;
                    this.uploading = false;
                    this.percentage = 0;
                }
            });
        },
        // 搜索作物
        searchCrop() {},
        // 提交表单
        submit() {
            let gardenTitle = "";
            this.gardenList.map((item) => {
                if (item.id == this.selectedGarden) {
                    gardenTitle = item.title;
                }
            });

            if (!this.selectedGarden) {
                this.$message.warning("请选择园区");
                return;
            }
            if (this.selectedPlant.length == 0) {
                this.$message.warning("请选择作物");
                return;
            }
            if (!this.taskContent) {
                this.$message.warning("请输入具体内容");
                return;
            }
            if (this.selectedUser.length == 0) {
                this.$message.warning("请选择执行人");
                return;
            }
            if (!this.startTime) {
                this.$message.warning("请选择开始时间");
                return;
            }
            if (!this.endTime) {
                this.$message.warning("请选择截止时间");
                return;
            }

            let executors = this.selectedUser.map((item) => {
                let json = {
                    id: "",
                    name: "",
                };
                this.userlist.map((i) => {
                    if (item == i.id) {
                        json.id = i.id;
                        json.name = i.name;
                    }
                });
                return json;
            });
            this.submitting = true;
            let farmUseBos = this.farmUseBos.map((item) => {
                console.log(isNaN(item.agriculturalCount));
                item.agriculturalCount = isNaN(item.agriculturalCount) ? 0 : item.agriculturalCount;
                return {
                    agriculturalBo: {
                        title: item.agricultural,
                        agriculturalCategory: item.agriculturalType,
                        manufacturers: item.manufacturers,
                    },
                };
            });
            this.ajax
                .post("/api/v1/adam/task/createTask", {
                    endTime: this.endTime,
                    executors: JSON.stringify(executors),
                    gardenId: this.selectedGarden,
                    gardenTitle: gardenTitle,
                    growPlants: this.selectedPlant,
                    opinion: "",
                    reWire: this.video,
                    startTime: this.startTime,
                    taskContent: this.taskContent,
                    agricultural: JSON.stringify(farmUseBos),
                })
                .then((r) => {
                    this.submitting = false;
                    if (r.code == 200 && r.data == true) {
                        this.onClose(1);
                        this.showDetailBox = false;
                    } else {
                        this.$message.error(r.message);
                    }
                });
        },
    },
};
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
.taskDetailInner {
    position: relative;
    top: -10px;
    padding: 20px 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.09);
    background: #f4f8fb;
    .item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 10px 0;
        p.title {
            width: 90px;
        }
        .upload {
            width: 180px;
            height: 100px;
            position: relative;
            left: -10px;
            background: #ffffff;
            video {
                width: 180px;
                height: 100px;
                border-radius: 10px;
            }
            .erpguanbi {
                position: absolute;
                top: 0;
                right: 0;
                z-index: 999;
                background: rgba(0, 0, 0, 0.5);
                padding: 5px;
                font-size: 12px;
                border-top-right-radius: 5px;
                color: #ffffff;
                cursor: pointer;
            }
            .uploadBox {
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
        .nz {
            width: 100%;
            position: relative;
            top: -5px;
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
        }
        .nzAdd {
            width: 100%;
            height: 35px;
            color: #538dff;
            line-height: 35px;
            cursor: pointer;
            font-size: 12px;
            text-align: center;
            background: #edf1f8;
            position: relative;
            top: 0px;
            i {
                font-size: 13px;
            }
        }
    }
}
.btns {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>
