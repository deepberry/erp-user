<template>
    <el-dialog :before-close="onClose" append-to-body v-model="showDetailBox" title="添加农资" width="740px">
        <div class="main">
            <div class="tab">
                <span :class="tab == 0 ? 'active' : ''" @click="tab = 0">选择已领取农资</span>
                <span :class="tab == 1 ? 'active' : ''" @click="tab = 1">手动输入农资信息</span>
            </div>
            <div class="tabbox tab1" v-show="tab == 0">
                <div class="item">
                    <i class="erp erpduoxuan-01"></i>
                    <div class="itemBox">
                        <div>
                            <span>硝酸复合肥 <span class="tag">化肥</span></span>
                            <span>(20公斤/包)</span>
                            <span>内蒙古xxxx有限公司</span>
                        </div>
                        <div>
                            <span>20袋（共1000公斤）</span>
                            <span style="color: #6095fd">使用量</span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div class="btn">
                    <el-button type="primary" plain>&nbsp;&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                    <el-button type="primary">&nbsp;&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                </div>
            </div>
            <div class="tabbox tab2" v-show="tab == 1">
                <div class="item">
                    <div class="title"><span>*</span> 作业方式：</div>
                    <div class="content">
                        <el-select style="width: 100%" v-model="value" placeholder="请选择作业方式">
                            <el-option label="sdssd" value="asdas"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <div class="title"><span>*</span> 农资类型：</div>
                    <div class="content">
                        <div class="contentA">
                            <el-select style="width: 100%" v-model="value" placeholder="请选择农资类型">
                                <el-option label="sdssd" value="asdas"></el-option>
                            </el-select>
                        </div>
                        <div class="contentB">
                            <el-input v-model="input" placeholder="请输入" />
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="title"><span>*</span> 使用量：</div>
                    <div class="content">
                        <div class="contentA">
                            <el-input v-model="input" placeholder="请输入使用量" />
                        </div>
                        <div class="contentB">
                            <el-select style="width: 100%" v-model="value" placeholder="请选择单位">
                                <el-option label="sdssd" value="asdas"></el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="title">厂家：</div>
                    <div class="content">
                        <el-input v-model="input" placeholder="请输入厂家" />
                    </div>
                </div>
                <div class="btn">
                    <el-button type="primary" plain>保存并继续添加</el-button>
                    <el-button type="primary">&nbsp;&nbsp;&nbsp;&nbsp;保存&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: ["id"],
    data() {
        return {
            showDetailBox: true,
            tab: 0,
        };
    },
    mounted() {},
    methods: {
        onClose(params = null) {
            if (typeof params == "function") {
                params = null;
            }
            this.$emit("onCloseDetail", params);
            this.showDetailBox = false;
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
                    width: 440px;
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
