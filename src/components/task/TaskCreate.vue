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
                <div class="item">
                    <p class="title">操作指导：</p>
                    <div class="upload">
                        <video v-if="video" controls :src="video" alt="" />
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
    </div>
</template>

<script>
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
            uploading: false,
            percentage: 0, // 上传进度
            searchCropLoading: false, // 作物搜索中
            submitting: false,
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
    methods: {
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
            this.ajax
                .upload(
                    "/api/v1/adam/upload",
                    {
                        file,
                    },
                    (num) => {
                        this.percentage = parseInt(num);
                    }
                )
                .then((r) => {
                    this.video = r.data.imageUrl;
                    this.uploading = false;
                    this.percentage = 0;
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
    }
}
.btns {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>
