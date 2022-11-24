<template>
    <el-dialog v-model="dialogVisible" :title="title" width="1200px" :before-close="handleClose" append-to-body>
        <div class="btn">
            <el-button type="primary" size="small" @click="isEdit = !isEdit">{{ isEdit ? "保存" : "编辑" }}</el-button>
            <el-button type="primary" plain size="small">删除</el-button>
        </div>
        <div class="form">
            <div class="item">
                <p class="title">种植植物：</p>
                <div class="content">
                    <el-input :disabled="!isEdit" v-model="form.varietyName" placeholder="请输入种植植物" />
                </div>
            </div>
            <div class="item">
                <p class="title">农事类型：</p>
                <div class="content">
                    <el-select
                        :disabled="!isEdit"
                        style="width: 100%"
                        v-model="form.title"
                        placeholder="请选择农事类型"
                    >
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
                <p class="title">使用农资：</p>
                <div class="content nz">
                    <p v-for="item in form.farmUseBos" :key="item.id">
                        <span>{{ item.agricultural }}</span>
                        <span class="tag">
                            <span>{{ item.agriculturalType }}</span>
                        </span>
                        <span>{{ item.agriculturalCount }}{{ item.agriculturalUnit }}</span>
                    </p>
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
                <div class="content">
                    <img class="pics" v-for="(item, index) in form.image" :key="index" :src="item" alt="" />
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
                <div class="content hj">
                    <div class="huanjing">
                        <img src="../../assets/img/hj/icon-wendu.png" alt="" />
                        <p>0℃</p>
                        <p>空气温度</p>
                    </div>
                    <div class="huanjing">
                        <img src="../../assets/img/hj/icon-wendu.png" alt="" />
                        <p>0 μmol/㎡·s</p>
                        <p>光合有效辐射</p>
                    </div>
                    <div class="huanjing">
                        <img src="../../assets/img/hj/icon-wendu.png" alt="" />
                        <p>0 uS/cm</p>
                        <p>土壤EC</p>
                    </div>
                    <div class="huanjing">
                        <img src="../../assets/img/hj/icon-wendu.png" alt="" />
                        <p>0%</p>
                        <p>土壤含水量</p>
                    </div>
                    <div class="huanjing">
                        <img src="../../assets/img/hj/icon-wendu.png" alt="" />
                        <p>0%</p>
                        <p>空气相对湿度</p>
                    </div>
                    <div class="huanjing">
                        <img src="../../assets/img/hj/icon-wendu.png" alt="" />
                        <p>0 cm</p>
                        <p>株高</p>
                    </div>
                    <div class="huanjing">
                        <img src="../../assets/img/hj/icon-wendu.png" alt="" />
                        <p>0 c㎡</p>
                        <p>叶面积</p>
                    </div>
                    <div class="huanjing">
                        <img src="../../assets/img/hj/icon-wendu.png" alt="" />
                        <p>0 g</p>
                        <p>单株重量</p>
                    </div>
                </div>
            </div>
            <div class="item">
                <p class="title">作物现场照片：</p>
                <div class="content">
                    <img src="../../assets/img/ds.png" alt="" />
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: ["title", "id"],
    data() {
        return {
            dialogVisible: true,
            searchKey: "",
            list: [],
            form: {},
            farmType: [],
            operatingType: [],
            isEdit: false,
        };
    },
    mounted() {
        let t = this;
        let ajax = async function () {
            await t.getData();
            await t.getFarmType();
            await t.getOperatingType();
        };
        ajax();
    },
    methods: {
        handleClose() {
            this.dialogVisible = false;
            this.$emit("close");
        },
        detail() {
            if (this.title == "农资使用统计") {
                this.$message.warning("dsdsdsds");
            }
        },
        // 获取详情
        getData() {
            return new Promise((a, b) => {
                this.ajax.post("/api/v1/adam/farm/getFarmRecordById", { id: this.id }).then((r) => {
                    r.data.image = r.data.image.split(",");
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
                    r.data.map((item) => {
                        if (item.title == this.form.title) {
                            this.form.title = item.id;
                        }
                    });
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
    border-top: 1px solid rgb(228, 228, 228);
    border-bottom: 1px solid rgb(228, 228, 228);
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
        width: 560px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-top: 20px;
        .title {
            width: 100px;
            text-align: right;
            line-height: 30px;
        }
        .content {
            width: 460px;
            img.pics {
                width: 150px;
                height: 90px;
                border-radius: 5px;
                margin-right: 10px;
            }
        }
        .hj {
            width: 1000px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
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
