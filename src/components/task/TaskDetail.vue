<template>
    <div class="taskDetail purchaseDetailBox">
        <el-dialog
            custom-class="taskDetail purchaseDetailBox"
            :before-close="onClose"
            append-to-body
            v-model="showDetailBox"
            title="任务详情"
            width="700px"
        >
            <div v-loading="detailLoading" class="taskDetailInner purchaseDetailBoxInner">
                <!-- 此处状态图标临时引用，后期修改为动态图片 -->
                <img
                    class="statusImg"
                    v-if="detail.status == 0"
                    src="../../assets/img/task-detail-status/0.png"
                    alt=""
                />
                <img
                    class="statusImg"
                    v-if="detail.status == 1"
                    src="../../assets/img/task-detail-status/1.png"
                    alt=""
                />
                <img
                    class="statusImg"
                    v-if="detail.status == 2"
                    src="../../assets/img/task-detail-status/2.png"
                    alt=""
                />
                <img
                    class="statusImg"
                    v-if="detail.status == 3"
                    src="../../assets/img/task-detail-status/3.png"
                    alt=""
                />
                <div class="id wrap">任务单号：RW{{ detail.id }}</div>
                <div class="create wrap">
                    <div>任务创建</div>
                    <div>
                        <p>创建人：{{ detail.createUserName }}</p>
                        <p>创建时间：{{ detail.createTime }}</p>
                    </div>
                    <div>任务内容</div>
                    <div class="taskContent">
                        <div>
                            <p>园区：{{ detail.gardenTitle }}</p>
                            <p>作物：{{ detail.growPlantTitle }}-{{ detail.address }}</p>
                        </div>
                        <div>
                            <p>内容：{{ detail.taskContent }}</p>
                            <div>
                                <p>操作视频：</p>
                                <video
                                    v-if="detail.reWire"
                                    controls
                                    @click="view(detail.reWire)"
                                    :src="detail.reWire"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div class="nz">
                        <div class="title">需用农资：</div>
                        <div class="nzlist">
                            <div style="position: relative; top: 5px">
                                <span v-if="detail.agricultural && detail.agricultural.length <= 0">暂无数据</span>
                            </div>
                            <div class="nzitem" v-for="item in detail.agricultural" :key="item.id">
                                <p>
                                    <span class="tag">{{ item.agriculturalType }}</span>
                                </p>
                                <p>{{ item.agricultural }}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>
                            指定执行人：<span style="margin: 0 5px" v-for="item in detail.executors" :key="item.id">{{
                                item.name
                            }}</span>
                        </p>
                    </div>
                    <div>开始时间：{{ detail.startTime }}</div>
                    <div>截止时间：{{ detail.endTime }}</div>
                </div>
                <div class="todo wrap" v-if="detail.status != 0">
                    <div>任务执行</div>
                    <div>执行提交时间：{{ detail.farmRecordBo.workTime }}</div>
                    <div>执行提交人：{{ detail.farmRecordBo.userName }}</div>
                    <div class="todoContent" @click="showDetailClick">
                        <div>
                            <p class="a">{{ detail.farmRecordBo.title }}</p>
                            <p>{{ detail.farmRecordBo.workTime }}</p>
                        </div>
                        <div>
                            <p class="u" v-for="item in detail.farmRecordBo.farmUseBos" :key="item.id">
                                {{ item.agricultural }} &nbsp;&nbsp;&nbsp;&nbsp;
                                {{ item.agriculturalCount }}
                                {{ item.agriculturalUnit }}
                            </p>
                        </div>
                        <div>
                            <p>{{ detail.farmRecordBo.workText || "无备注" }}</p>
                            <p>{{ detail.farmRecordBo.userName }}</p>
                        </div>
                    </div>
                </div>
                <div class="todo wrap" v-if="detail.status > 1 && $store.state.power.checkTaskBtn">
                    <div>任务检查</div>
                    <div>检查结果：{{ [0, 0, "合格", "不合格", "打回"][detail.status] }}</div>
                    <div>检查意见：</div>
                    <div class="todoContent">
                        <div style="display: block">{{ detail.opinion }}</div>
                    </div>
                </div>
                <el-button
                    @click="showTextArea = true"
                    v-if="!showTextArea && detail.status == 1"
                    type="primary"
                    link
                    style="margin-top: 20px"
                >
                    <i class="erp erptianxie" style="margin-right: 5px; font-size: 12px"></i> 填写检查意见</el-button
                >
                <div class="form wrap" v-if="showTextArea">
                    <div>填写检查意见</div>
                    <div>
                        <div>
                            是否合格：
                            <el-radio-group v-model="isPass" class="ml-4">
                                <el-radio label="2">合格</el-radio>
                                <el-radio label="3">不合格</el-radio>
                                <el-radio label="4">打回</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="formTextarea">
                        <p>意见建议：</p>
                        <el-input v-model="textarea" :rows="5" type="textarea" placeholder="输入检查意见" />
                    </div>
                </div>
                <div class="btns" v-if="showTextArea">
                    <el-button type="primary" plain @click="showTextArea = false">取消</el-button>
                    <el-button type="primary" @click="submitCheck" :loading="submitting">确定</el-button>
                </div>
                <div class="btns">
                    <el-button type="primary" plain @click="delTask">删除任务</el-button>
                </div>
            </div>
        </el-dialog>
        <PlantCropsDetailCDialogDetail
            v-if="showDetail"
            :title="detailTitle"
            :id="detailId"
            @close="closeDetail"
            @load="getData"
        ></PlantCropsDetailCDialogDetail>
    </div>
</template>

<script>
import PlantCropsDetailCDialogDetail from "@/components/plant/PlantCropsDetailCDialogDetail";
import timer from "@/utils/timer";
export default {
    name: "taskDetail",
    props: ["id"],
    data() {
        return {
            detailLoading: false,
            showDetailBox: true, // 是否显示详情弹窗
            detail: {
                farmRecordBo: {
                    farmUseBos: [],
                },
            },
            showTextArea: false,
            textarea: "",
            isPass: "2",
            submitting: false,
            showDetail: false,
            detailTitle: "",
            detailId: "",
        };
    },
    components: {
        PlantCropsDetailCDialogDetail,
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 删除任务
        delTask() {
            this.ajax
                .post("/api/v1/adam/task/deleteTask", {
                    taskId: this.detail.id,
                })
                .then((r) => {
                    this.$message.success("删除成功");
                    this.onClose(1);
                });
        },
        showDetailClick(id) {
            this.detailTitle = "农事记录详情";
            this.detailId = this.detail.farmRecordBo.id;
            this.showDetail = true;
        },
        // 图片预览
        view(src) {
            window.open(src);
        },
        closeDetail() {
            setTimeout(() => {
                this.showDetail = false;
            }, 300);
        },
        getData() {
            this.detailLoading = true;
            this.ajax
                .post("/api/v1/adam/task/taskDetail", {
                    taskId: this.id,
                })
                .then((r) => {
                    this.detailLoading = false;
                    r.data.startTime = timer.time("y-m-d h:i:s", r.data.startTime);
                    r.data.endTime = timer.time("y-m-d h:i:s", r.data.endTime);
                    r.data.createTime = timer.time("y-m-d h:i:s", r.data.createTime);
                    r.data.executors = JSON.parse(r.data.executors);
                    r.data.farmRecordBo = r.data.farmRecordBo || { farmUseBos: {} };
                    r.data.farmRecordBo.farmUseBos = r.data.farmRecordBo.farmUseBos || {};
                    r.data.agricultural = r.data.agricultural ? JSON.parse(r.data.agricultural) : [];

                    r.data.agricultural = r.data.agricultural.map((item) => {
                        if (!item.agriculturalType && !item.agricultural) {
                            item.agricultural = item.agriculturalBo.title;
                            item.agriculturalType = item.agriculturalBo.agriculturalCategory;
                        }
                        return item;
                    });
                    this.detail = r.data;
                });
        },
        onClose(params = null) {
            if (typeof params == "function") {
                params = null;
            }
            this.$emit("onCloseDetail", params);
            this.showDetailBox = false;
        },
        submitCheck() {
            this.submitting = true;
            this.ajax
                .post("/api/v1/adam/task/taskCheck", {
                    checkStatus: this.isPass,
                    taskId: this.id,
                    taskOpinion: this.textarea,
                })
                .then((r) => {
                    this.submitting = false;
                    this.$message.success("提交成功");
                    this.onClose(1);
                });
        },
    },
};
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
@import url("@/assets/css/purchase.order.less");
.taskDetailInner {
    position: relative;
    top: -10px;
    padding: 20px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.09);
    .statusImg {
        position: absolute;
        top: 0px;
        right: 50px;
    }
    .wrap {
        padding: 20px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.09);
        > div {
            padding: 10px 0;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            p {
                width: 50%;
                text-align: left;
            }
        }
    }
    .create {
        .taskContent {
            background: rgba(244, 248, 251, 1);
            padding: 8px;
            display: block;
            > div {
                padding: 8px 0;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                > div {
                    width: 50%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    p {
                        width: auto;
                    }
                    video {
                        width: 200px;
                        height: 130px;
                        margin-left: 10px;
                        border-radius: 10px;
                    }
                }
            }
        }
        .nz {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            margin-top: 5px;
            .nzlist {
                width: 570px;
                position: relative;
                top: -5px;
                .nzitem {
                    width: 100%;
                    border: 1px solid rgb(236, 236, 236);
                    padding: 7px 10px;
                    margin-bottom: 3px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    font-size: 13px;
                    > p {
                        width: 100%;
                        font-size: 12px;
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
            }
        }
    }
    .id {
        padding-top: 0px;
    }
    .todo {
        .todoContent {
            cursor: pointer;
            display: block;
            padding: 8px;
            background: rgba(244, 248, 251, 1);
            > div {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                flex-wrap: wrap;
                padding: 5px 0;
                p {
                    width: auto;
                    color: rgba(166, 166, 166, 1);
                }
                p.a {
                    color: rgba(80, 80, 80, 1);
                }
                p.b {
                    color: rgba(232, 161, 69, 1);
                }
                p.u {
                    width: 100%;
                    color: rgba(232, 161, 69, 1);
                }
            }
        }
    }
    .form {
        > div {
            padding: 5px 0;
        }
        .formTextarea {
            margin-top: 5px;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            p {
                width: 85px;
            }
        }
    }
    .btns {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 20px;
    }
}
</style>
