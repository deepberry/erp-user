<template>
    <el-dialog v-model="dialogVisible" :title="title" width="580px" :before-close="handleClose" append-to-body>
        <div class="btn">
            <el-button type="primary" @click="editButton" v-if="$store.state.power.editFarmRecordBtn">{{
                isEdit ? "保存" : "编辑"
            }}</el-button>
            <el-button type="primary" plain @click="del" v-if="$store.state.power.delFarmRecordBtn">{{
                isEdit ? "取消" : "删除"
            }}</el-button>
        </div>
        <div class="form">
            <div class="item">
                <p class="title">种植植物：</p>
                <div class="content">
                    <p class="text">{{ form.categoryTitle + "-" + form.address }}</p>
                </div>
            </div>
            <div class="item">
                <p class="title">农事类型：</p>
                <div class="content" style="display: flex">
                    <el-select
                        :disabled="!isEdit"
                        style="width: 100%"
                        v-model="form.farmId"
                        placeholder="请选择农事类型"
                    >
                        <el-option
                            v-for="item in farmType"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                    <el-input
                        style="width: 140px; margin-left: 10px"
                        v-if="form.farmId == 15"
                        v-model="form.title"
                        placeholder="请输入"
                    ></el-input>
                </div>
            </div>
            <div class="item" style="margin-top: 5px" v-if="form.farmId == 16">
                <p class="title"></p>
                <div class="content nz">
                    <div
                        class="nzItem"
                        v-for="(item, index) in form.farmDetailBo.farmDetailListChongBoList"
                        :key="item.id"
                    >
                        <div class="nzBox" :style="{ width: isEdit ? '400px' : '438px' }">
                            <span>
                                <span class="tag">{{ item.title }}</span>
                            </span>
                            <span>虫子</span>
                            <span>{{ item.count }}只</span>
                        </div>
                        <i class="erp erpshanchu" v-if="isEdit" @click="removePests(index, 1)"></i>
                    </div>
                    <div
                        class="nzItem"
                        v-for="(item, index) in form.farmDetailBo.farmDetailListTianBoList"
                        :key="item.id"
                    >
                        <div class="nzBox" :style="{ width: isEdit ? '400px' : '438px' }">
                            <span>
                                <span class="tag">{{ item.title }}</span>
                            </span>
                            <span>天敌</span>
                            <span>{{ item.count }}只</span>
                        </div>
                        <i class="erp erpshanchu" v-if="isEdit" @click="removePests(index, 0)"></i>
                    </div>
                    <div class="nzAdd" @click="addPests(1)" v-if="isEdit && form.title != '采摘'">
                        <i class="erp erpicon_tianjia"></i> 添加虫子
                    </div>
                    <div
                        class="nzAdd"
                        style="border-top: 1px solid rgba(0, 0, 0, 0.05)"
                        @click="addPests(0)"
                        v-if="isEdit && form.title != '采摘'"
                    >
                        <i class="erp erpicon_tianjia"></i> 添加天敌
                    </div>
                </div>
            </div>
            <div class="item" style="margin-top: 5px" v-if="form.farmId == 17">
                <p class="title"></p>
                <div class="content nz">
                    <div class="nzItem">
                        <div class="nzBox" v-if="!isEdit" style="width: 438px">
                            <span>观测点：{{ form.farmDetailBo.title }}</span>
                            <span>{{ form.farmDetailBo.farmDetailListGrowBoList[0].title }}厘米</span>
                            <span>{{ form.farmDetailBo.farmDetailListGrowBoList[0].count }}个节点</span>
                        </div>
                        <div class="nzBox" v-if="isEdit">
                            <el-input
                                v-model="form.farmDetailBo.title"
                                placeholder="监测点"
                                style="width: 35%"
                            ></el-input>
                            <el-input
                                style="width: 35%"
                                v-model="form.farmDetailBo.farmDetailListGrowBoList[0].title"
                                placeholder="株高"
                            >
                                <template #append>厘米</template>
                            </el-input>
                            <el-input
                                style="width: 30%"
                                v-model="form.farmDetailBo.farmDetailListGrowBoList[0].count"
                                placeholder="节点数"
                            >
                                <template #append>个</template>
                            </el-input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="item" v-if="form.farmId == 13">
                <p class="title">采摘重量：</p>
                <div class="content">
                    <el-input :disabled="!isEdit" v-model="form.pickCount" placeholder="输入采摘重量">
                        <template #append>公斤</template>
                    </el-input>
                </div>
            </div>
            <div class="item">
                <p class="title">使用农资：</p>
                <div class="content" v-if="form.farmUseBos.length == 0 && !isEdit">
                    <p class="text">暂无数据</p>
                </div>
                <div class="content nz" v-if="form.farmUseBos.length > 0 || isEdit">
                    <div class="nzItem" v-for="(item, index) in form.farmUseBos" :key="item.id">
                        <div class="nzBox" :style="{ width: isEdit ? '400px' : '438px' }">
                            <span>
                                <span class="tag">{{ item.agriculturalType }}</span>
                            </span>
                            <span>{{ item.agricultural }}</span>
                            <span>{{ item.agriculturalCount }}{{ item.agriculturalUnit }}</span>
                        </div>
                        <i class="erp erpshanchu" v-if="isEdit" @click="removeNz(index)"></i>
                    </div>
                    <div class="nzAdd" @click="showChose = true" v-if="isEdit">
                        <i class="erp erpicon_tianjia"></i> 添加农资
                    </div>
                </div>
            </div>
            <div class="item">
                <p class="title">工时：</p>
                <div class="content">
                    <el-input :disabled="!isEdit" v-model="form.workHour" placeholder="请输入工时" />
                </div>
            </div>
            <div class="item">
                <p class="title">作业方式：</p>
                <div class="content">
                    <el-select
                        :disabled="!isEdit"
                        style="width: 100%"
                        v-model="form.workType"
                        placeholder="请选择作业方式"
                    >
                        <el-option
                            v-for="item in operatingType"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
            </div>
            <div class="item">
                <p class="title">操作时间：</p>
                <div class="content">
                    <el-date-picker
                        :disabled="!isEdit"
                        style="width: 100%"
                        v-model="form.workTime"
                        type="date"
                        placeholder="请选择操作时间"
                    ></el-date-picker>
                </div>
            </div>
            <div class="item">
                <p class="title">操作人：</p>
                <div class="content">
                    <el-input :disabled="!isEdit" v-model="form.userName" placeholder="请输入操作人" />
                </div>
            </div>
            <div class="item">
                <p class="title">农事照片：</p>
                <div class="content" v-if="!isEdit">
                    <img
                        class="picsimg"
                        @click="viewImg(item)"
                        v-for="(item, index) in form.image"
                        :key="index"
                        :src="item"
                        alt=""
                    />
                    <p class="text" v-if="form.image.length == 0">暂无数据</p>
                </div>
                <div class="content" v-if="isEdit">
                    <div class="pics">
                        <div class="img" v-for="(item, imgIndex) in form.image" :key="imgIndex">
                            <img :src="item" alt="" />
                            <i class="erp erpguanbi" @click="removeImg(imgIndex)"></i>
                        </div>
                        <div class="upload" v-if="form.image.length < 2">
                            <input v-if="!uploading" @change="uploadFile" ref="file" type="file" />
                            <p v-if="!uploading"><i class="erp erpshangchuan"></i></p>
                            <p v-if="!uploading">点击上传照片</p>
                            <el-progress v-if="uploading" :width="90" type="circle" :percentage="percentage" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="item itemBig">
                <p class="title">备注：</p>
                <div class="content">
                    <el-input :disabled="!isEdit" v-model="form.workText" placeholder="请输入备注" />
                </div>
            </div>
            <div class="item itemBig">
                <p class="title">环境数据：</p>
                <div class="content hj" style="width: 460px">
                    <div class="hjbox" :style="{ width: `${form.smartDevice.length * 150}px` }">
                        <div class="huanjing" v-for="item in form.smartDevice" :key="item.id">
                            <img :src="getIconUrl(item.icon)" alt="" />
                            <p>{{ item.value || "&nbsp;" }}{{ item.unit || "&nbsp;" }}</p>
                            <p>{{ item.displayName }}</p>
                        </div>
                    </div>
                    <p class="text" v-if="form.smartDevice.length == 0">暂无数据</p>
                </div>
            </div>
            <div class="item itemBig">
                <p class="title">现场照片：</p>
                <div class="content hj" style="width: 460px">
                    <div class="hjbox" :style="{ width: `${imgs.length * 200}px` }" v-if="false">
                        <img class="picsimg" v-for="(item, index) in imgs" :key="index" :src="item" alt="" />
                        <div v-for="(item, index) in imgSpace" :key="index"></div>
                    </div>
                    <p class="text">暂无数据</p>
                </div>
            </div>
        </div>
        <PlantCropsDetailBDialogChose
            @save="save"
            @chose="chose"
            v-if="showChose"
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
import PlantCropsDetailBDialogChose from "@/components/plant/PlantCropsDetailBDialogChose";
import PlantCropsDetailBDialogAddPests from "@/components/plant/PlantCropsDetailBDialogAddPests";
import timer from "@/utils/timer";
export default {
    props: ["title", "id"],
    emits: ["load", "success", "close"],
    data() {
        return {
            dialogVisible: true,
            searchKey: "",
            list: [],
            imgs: [],
            form: {
                image: [],
                farmUseBos: [],
                smartDevice: [],
            },
            farmType: [],
            operatingType: [],
            isEdit: false,
            uploading: false,
            percentage: 0,
            showChose: false,
            showAddPests: false,
            addPestsType: 0,
        };
    },
    components: {
        PlantCropsDetailBDialogChose,
        PlantCropsDetailBDialogAddPests,
    },
    mounted() {
        let t = this;
        let ajax = async function () {
            await t.getData();
            await t.getFarmType();
            await t.getOperatingType();
            await t.getFarmRecordImg();
        };
        ajax();
    },
    computed: {
        imgSpace() {
            let r = 0;
            r = 4 - (this.imgs.length % 4);
            return r;
        },
    },
    methods: {
        // 保存生长观察数据
        saveGrowData() {
            this.isEdit = false;
        },
        // 添加虫子和天敌
        addPests(type) {
            this.showAddPests = true;
            this.addPestsType = type;
        },
        savePests(v) {
            // 病虫害
            if (v.type) {
                this.form.farmDetailBo.farmDetailListChongBoList.push({
                    count: v.num,
                    farmDetailId: 0,
                    title: v.name,
                    type: 0,
                });
            } else {
                // 天敌
                this.form.farmDetailBo.farmDetailListTianBoList.push({
                    count: v.num,
                    farmDetailId: 0,
                    title: v.name,
                    type: 1,
                });
            }
        },
        closePests() {
            let t = setTimeout(() => {
                this.showAddPests = false;
                clearTimeout(t);
            }, 500);
        },
        // 删除虫子和天敌
        removePests(index, type) {
            if (type == 1) {
                this.form.farmDetailBo.farmDetailListChongBoList.splice(index, 1);
            } else {
                this.form.farmDetailBo.farmDetailListTianBoList.splice(index, 1);
            }
        },
        // 查看大图
        viewImg(img) {
            this.$nextTick(() => {
                window.open(img);
            });
        },
        // 获取农事记录照片
        getFarmRecordImg() {
            this.ajax
                .post("/api/v1/adam/task/getFarmRecordImg", {
                    growPlantId: this.$route.query.id,
                })
                .then((r) => {
                    let imgs = [];
                    r.data.images.map((item) => {
                        imgs.push({
                            url: item.image,
                            time: timer.time(item.createTime),
                            gardenTitle: r.data.gardenTitle,
                            address: r.data.address,
                        });
                    });
                    this.imgs = imgs;
                });
        },
        // 保存农资
        editButton() {
            if (this.isEdit) {
                let data = JSON.parse(JSON.stringify(this.form));
                data.smartDevice = JSON.stringify(data.smartDevice);
                data.image = data.image.join(",");
                if (data.farmDetailBo) {
                    if (data.farmId == 16) {
                        data.farmDetailBo.farmType = 0;
                    }
                    if (data.farmId == 17) {
                        data.farmDetailBo.farmType = 1;
                    }
                }
                this.ajax.post("/api/v1/adam/farm/editeFarm", data).then((r) => {
                    if (r.code == 200) {
                        this.$message.success("保存成功");
                        this.isEdit = false;
                        this.$emit("load");
                    } else {
                        this.$message.error(r.message);
                    }
                });
            } else {
                this.isEdit = true;
            }
        },
        closeChose() {
            setTimeout(() => {
                this.showChose = false;
            }, 300);
        },
        // 移除农资项
        removeNz(index) {
            this.form.farmUseBos.splice(index, 1);
        },
        // 获取属性icon地址
        getIconUrl(icon) {
            return `https://cdn.deepberry.cn/img/common/node-props/${icon || "default"}.svg`;
        },
        chose(v) {
            console.log(v);
            let data = [...this.form.farmUseBos, ...v].map((item) => {
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
            this.form.farmUseBos = trans(data);
        },
        // 保存农资
        save(params) {
            this.form.farmUseBos.push(params);
        },
        // 移除图片
        removeImg(index) {
            console.log(index);
            this.form.image.splice(index, 1);
        },
        // 上传图片
        uploadFile() {
            this.uploading = true;
            let file = this.$refs.file.files[0];
            upload(file, `erp/farmingHistory/${file.name}`).then((r) => {
                if (r.url) {
                    this.form.image.push(r.url);
                    this.uploading = false;
                    this.percentage = 0;
                }
            });
        },
        del() {
            if (this.isEdit) {
                this.isEdit = false;
                this.getData();
            } else {
                this.ajax.post("/api/v1/adam/farm/delFarmRecordById", { id: this.id }).then((r) => {
                    if (r.code == 200) {
                        this.$message.success("删除成功");
                        this.handleClose();
                        this.$emit("load");
                    } else {
                        this.$message.error(r.message);
                    }
                });
            }
        },
        handleClose() {
            this.dialogVisible = false;
            this.$emit("close");
        },
        // 获取详情
        getData() {
            return new Promise((a, b) => {
                this.ajax.post("/api/v1/adam/farm/getFarmRecordById", { id: this.id }).then((r) => {
                    r.data.image = r.data.image.length > 0 ? r.data.image.split(",") : [];
                    r.data.smartDevice = JSON.parse(r.data.smartDevice) || [];
                    r.data.farmDetailBo = r.data.farmDetailBo || {
                        farmDetailListChongBoList: [],
                        farmDetailListTianBoList: [],
                        farmDetailListGrowBoList: [],
                    };
                    r.data.farmDetailBo.farmDetailListGrowBoList = r.data.farmDetailBo.farmDetailListGrowBoList || [];
                    r.data.farmDetailBo.farmDetailListGrowBoList = r.data.farmDetailBo.farmDetailListGrowBoList.length
                        ? r.data.farmDetailBo.farmDetailListGrowBoList
                        : [{}];
                    this.form = r.data;
                    a();
                });
            });
        },
        // 获取农事类型
        getFarmType() {
            return new Promise((a, b) => {
                this.ajax.post("/api/v1/adam/farm/getFarmType").then((r) => {
                    this.farmType = r.data;
                    a();
                });
            });
        },
        // 获取作业方式
        getOperatingType() {
            return new Promise((a, b) => {
                this.ajax.post("/api/v1/adam/farm/getOperatingType").then((r) => {
                    this.operatingType = r.data;
                    a();
                });
            });
        },
    },
};
</script>

<style lang="less" scoped>
.btn {
    position: relative;
    top: -20px;
    padding: 10px 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.form {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    position: relative;
    top: -20px;
    .item {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-top: 20px;
        .nzItem {
            width: 460px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .nzBox {
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
        .title {
            width: 70px;
            text-align: right;
            line-height: 30px;
        }
        .content {
            width: 460px;
            img.picsimg {
                width: 180px;
                height: 100px;
                border-radius: 5px;
                margin-right: 10px;
            }
            .text {
                line-height: 30px;
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
        }
        .hj {
            width: 1000px;
            overflow-x: auto;
            overflow-y: hidden;
            .hjbox {
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }
            img.picsimg {
                width: 180px;
                height: 100px;
                border-radius: 5px;
                margin-right: 10px;
            }
            .huanjing {
                width: 120px;
                height: 70px;
                padding: 10px 0;
                margin: 0 5px;
                text-align: center;
                border-radius: 3px;
                border: 1px solid rgb(236, 236, 236);
                img {
                    width: 20px;
                }
                p:nth-child(2) {
                    color: #333333;
                    font-size: 14px;
                    line-height: 30px;
                }
                p:nth-child(3) {
                    color: #979797;
                    font-size: 12px;
                }
            }
        }
        .nz {
            p {
                width: calc(100%-20px);
                display: flex;
                justify-content: flex-start;
                align-items: center;
                border: 1px solid rgba(0, 0, 0, 0.15);
                border-top: 0;
                padding: 6px 10px;
                border-radius: 3px;
                > span:nth-child(1) {
                    width: 45%;
                }
                > span:nth-child(2) {
                    width: 35%;
                    span {
                        background: #c3f8c7;
                        display: inline-block;
                        padding: 2px 10px;
                        font-size: 12px;
                        border-radius: 3px;
                        color: #2ac726;
                    }
                }
                > span:nth-child(3) {
                    margin-left: 10%;
                    width: 20%;
                }
            }
            p:first-child {
                border-top: 1px solid rgba(0, 0, 0, 0.15);
            }
        }
    }
    .itemBig {
        width: 100%;
    }
}
</style>
