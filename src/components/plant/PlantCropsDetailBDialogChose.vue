<template>
    <el-dialog :before-close="onClose" append-to-body v-model="showDetailBox" title="添加农资" width="740px">
        <div class="main">
            <div class="tab">
                <span :class="tab == 0 ? 'active' : ''" @click="tab = 0">选择已领取农资</span>
                <span :class="tab == 1 ? 'active' : ''" @click="tab = 1">手动输入农资信息</span>
            </div>
            <div class="tabbox tab1" v-show="tab == 0">
                <el-empty description="暂无数据" v-if="list.length == 0" />
                <div class="item" v-for="item in list" :key="item.id">
                    <i
                        @click="item.use = !item.use"
                        :class="item.use ? 'erp erpduoxuankuangxuanzhong' : 'erp erpduoxuan-01'"
                    ></i>
                    <div class="itemBox">
                        <div>
                            <span
                                >{{ item.agriculturalBo.title }}
                                <span class="tag">{{ item.agriculturalBo.agriculturalCategory }}</span></span
                            >
                            <span
                                >({{ item.agriculturalBo.agriculturalCount }}{{ item.agriculturalBo.unitweight }}/{{
                                    item.agriculturalBo.unitmeasurement
                                }})</span
                            >
                            <span>{{ item.agriculturalBo.manufacturers }}</span>
                        </div>
                        <div>
                            <span
                                >{{ item.agriculturalUnit }}{{ item.agriculturalBo.unitmeasurement }}（共{{
                                    item.agriculturalCount
                                }}{{ item.agriculturalBo.unitweight }}）</span
                            >
                            <span style="color: #6095fd">库存量</span>
                            <div>
                                使用量：<el-input style="width: 160px" v-model="item.useNum" placeholder="输入数量"
                                    ><template #append>{{ item.agriculturalBo.unitweight }}</template></el-input
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn">
                    <el-button type="primary" plain @click="onClose"
                        >&nbsp;&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;&nbsp;</el-button
                    >
                    <el-button type="primary" @click="chose"
                        >&nbsp;&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;&nbsp;</el-button
                    >
                </div>
            </div>
            <div class="tabbox tab2" v-show="tab == 1">
                <div class="item">
                    <div class="title"><span>*</span> 农资名称：</div>
                    <div class="content">
                        <el-input v-model="title" placeholder="请输入" />
                    </div>
                </div>
                <div class="item">
                    <div class="title"><span>*</span> 农资类型：</div>
                    <div class="content">
                        <div class="contentA">
                            <el-select
                                style="width: 100%"
                                v-model="currentAgriculturalCategory"
                                placeholder="请选择农资类型"
                            >
                                <el-option
                                    v-for="item in agriculturalCategory"
                                    :key="item.id"
                                    :label="item.title"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                        <div v-if="currentAgriculturalCategory == -1" class="contentB">
                            <el-input v-model="diyAgriculturalCategory" placeholder="请输入" />
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="title"><span>*</span> 使用量：</div>
                    <div class="content">
                        <div class="contentA">
                            <el-input v-model="useNum" placeholder="请输入使用量" />
                        </div>
                        <div class="contentB">
                            <el-select style="width: 100%" v-model="currentUnitMeasurement" placeholder="单位">
                                <el-option
                                    v-for="item in unitMeasurement"
                                    :key="item.id"
                                    :label="item.title"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="title">厂家：</div>
                    <div class="content">
                        <el-input v-model="company" placeholder="请输入厂家" />
                    </div>
                </div>
                <div class="btn">
                    <el-button type="primary" plain @click="save(0)">保存并继续添加</el-button>
                    <el-button type="primary" @click="save(1)"
                        >&nbsp;&nbsp;&nbsp;&nbsp;保存&nbsp;&nbsp;&nbsp;&nbsp;</el-button
                    >
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: ["id"],
    emits: ["close", "save", "chose"],
    data() {
        return {
            showDetailBox: true,
            tab: 0,
            list: [],
            title: "",
            agriculturalCategory: [],
            currentAgriculturalCategory: "",
            diyAgriculturalCategory: "",
            unitMeasurement: [],
            currentUnitMeasurement: "",
            useNum: "",
            company: "",
        };
    },
    mounted() {
        this.getAgriculturalUser();
        this.getAgriculturalCategory();
        this.getUnitMeasurement();
    },
    methods: {
        // 选择农资
        chose() {
            let arr = [];
            let err = null;
            this.list.map((item) => {
                if (item.use) {
                    if (item.useNum) arr.push(item);
                    else err = item;
                }
            });
            console.log(arr);
            if (err) {
                this.$message.warning(`请输入[${err.agriculturalBo.title}]的使用数量`);
                return;
            }
            arr = arr.map((item) => {
                return {
                    agriculturalType: item.agriculturalBo.agriculturalCategory,
                    agricultural: item.agriculturalBo.title,
                    agriculturalId: item.id,
                    agriculturalCount: item.useNum,
                    agriculturalUnit: item.agriculturalBo.unitweight,
                    definition: 0,
                    agriculturalUnitId: item.agriculturalBo.unitweightid,
                    isUse: 0,
                    manufacturers: item.agriculturalBo.manufacturers,
                };
            });
            this.$emit("chose", arr);
            this.onClose();
        },
        // 保存自定义农资
        save(v) {
            let data = {
                agricultural: this.title,
                agriculturalId: "",
                agriculturalCount: this.useNum,
                agriculturalUnit: "",
                definition: 1,
                agriculturalUnitId: this.currentUnitMeasurement,
                isUse: 0,
                manufacturers: this.company,
            };
            this.unitMeasurement.map((item) => {
                if (item.id == this.currentUnitMeasurement) {
                    data.agriculturalUnit = item.title;
                }
            });
            if (!data.agricultural) {
                this.$message.warning("请输入农资标题");
                return;
            }
            if (!this.currentAgriculturalCategory) {
                this.$message.warning("请选择农资类型");
                return;
            }
            if (this.currentAgriculturalCategory == -1 && !this.diyAgriculturalCategory) {
                this.$message.warning("请输入农资类型");
                return;
            }
            if (!data.agriculturalCount) {
                this.$message.warning("请输入使用量");
                return;
            }
            if (this.currentAgriculturalCategory == -1) {
                data.agriculturalType = this.diyAgriculturalCategory;
                data.id = "";
            } else {
                data.id = this.currentAgriculturalCategory;
                this.agriculturalCategory.map((item) => {
                    if (item.id == data.id) {
                        data.agriculturalType = item.title;
                    }
                });
            }
            this.$emit("save", data);
            if (v == 1) {
                this.onClose();
            } else {
                this.title = "";
                this.currentAgriculturalCategory = "";
                this.useNum = "";
                this.company = "";
            }
        },
        onClose(params = null) {
            if (typeof params == "function") {
                params = null;
            }
            this.$emit("close", params);
            this.showDetailBox = false;
        },
        // 获取数量单位
        getUnitMeasurement() {
            this.ajax.post("/api/v1/adam/farm/getWeightUnit").then((r) => {
                this.unitMeasurement = r.data;
                this.currentUnitMeasurement = r.data[0].id;
            });
        },
        // 获取农资类型
        getAgriculturalCategory() {
            this.ajax.post("/api/v1/adam/farm/getAgriculturalCategory").then((r) => {
                this.agriculturalCategory = r.data;
                this.agriculturalCategory.unshift({
                    id: -1,
                    title: "自定义",
                });
            });
        },
        // 获取农资列表
        getAgriculturalUser() {
            this.ajax
                .post("/api/v1/adam/farmLand/agriculturalUser-list", {
                    pageNum: 1,
                    pageSize: 100,
                    param: {
                        endTime: "",
                        id: 0,
                        keyWord: "",
                        startTime: "",
                    },
                })
                .then((r) => {
                    this.list = r.data;
                });
        },
    },
};
</script>

<style lang="less" scoped>
.main {
    width: 700px;
    position: relative;
    top: -20px;
    border-top: 1px solid rgb(231, 231, 231);
    .tab {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 30px;
        span {
            width: 50%;
            height: 40px;
            line-height: 40px;
            background: #f4f7ff;
            color: #333333;
            text-align: center;
            cursor: pointer;
        }
        span.active {
            background: #dae6ff;
            color: #3e7cf6;
        }
    }
    .tabbox {
        width: 680px;
        max-height: 500px;
        padding: 10px;
        overflow-y: auto;
    }
    .tab1 {
        .btn {
            margin-top: 20px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
        .item {
            width: 680px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
            cursor: pointer;
            > i {
                width: 40px;
                font-size: 20px;
                color: #aaaaaa;
            }
            > i.erpduoxuankuangxuanzhong {
                color: #3e7cf6;
            }
            .itemBox {
                width: 600px;
                padding: 10px 20px;
                background: #ffffff;
                box-shadow: 0px 0px 21px 0px #e5ecf2;
                border-radius: 8px;
                div {
                    padding: 10px 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    > span {
                        width: 240px;
                        .tag {
                            margin-left: 20px;
                            background: #c3f8c7;
                            color: #2ac726;
                            display: inline-block;
                            padding: 2px 10px;
                            font-size: 12px;
                            border-radius: 3px;
                        }
                    }
                    > span:nth-child(2) {
                        width: 120px;
                    }
                    span:nth-child(3) {
                        text-align: right;
                    }
                }
            }
        }
    }
    .tab2 {
        .btn {
            margin-top: 40px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            .title {
                width: 100px;
                text-align: right;
                span {
                    color: red;
                }
            }
            .content {
                width: 580px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .contentA {
                    width: 100%;
                }
                .contentB {
                    margin-left: 20px;
                    width: 120px;
                }
            }
        }
    }
}
</style>
