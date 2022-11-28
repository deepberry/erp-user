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
                <div class="content">
                    <el-select style="width: 100%" v-model="farmId" placeholder="请选择农事类型">
                        <el-option
                            v-for="item in farmType"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id"
                        ></el-option>
                    </el-select>
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
                    <div class="nzAdd" @click="showChose = true"><i class="erp erpicon_tianjia"></i> 添加农资</div>
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
            @close="closeChose"
        ></PlantCropsDetailBDialogChose>
    </el-dialog>
</template>

<script>
import timer from "@/utils/timer";
import PlantCropsDetailBDialogChose from "@/components/plant/PlantCropsDetailBDialogChose";
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
        };
    },
    mounted() {
        console.log(this.plantName);
        this.getFarmType();
        this.getOperatingType();
        let user = JSON.parse(localStorage.getItem("erp_user"));
        this.workAid = user.id;
        this.workAname = user.name;
        this.workTime = timer.time("y-m-d");
        this.categoryTitle = this.plantName;
    },
    components: {
        PlantCropsDetailBDialogChose,
    },
    methods: {
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
                        arr[list.indexOf(v[i].agricultural)].agriculturalCount += v[i].agriculturalCount;
                    } else {
                        list.push(v[i].agricultural);
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
            let data = {
                categoryTitle: this.categoryTitle,
                farmId: this.farmId,
                farmUseBos: this.farmUseBos,
                workHour: this.workHour,
                image: this.imgs.join(","),
                workText: this.workText,
                workType: this.workType,
                workTime: this.workTime,
                taskId: this.taskId || "",
                workAid: this.workAid,
                plantsId: this.$route.query.id,
            };
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
                    this.imgs.push(r.data.imageUrl);
                    this.uploading = false;
                    this.percentage = 0;
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
    }
    .btn {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
}
</style>
