<template>
    <div class="stockPut inner">
        <div class="box">
            <div class="head">
                <el-button link type="primary" @click="back"
                    ><i
                        class="erp erpfanhui"
                        style="font-size: 14px; margin-right: 5px; position: relative; top: -1px"
                    ></i>
                    返回</el-button
                >
                <span style="position: relative; top: 2px; font-size: 15px">发起申领</span>
            </div>
            <div class="content">
                <el-button plain type="primary">
                    <i style="font-size: 14px; margin-right: 5px" class="erp erpicon_tianjia"></i> 添加
                </el-button>
                <div class="item">
                    <p class="title">硝酸复合肥</p>
                    <p class="tagBox">
                        <span class="tag">化肥</span>
                    </p>
                    <div class="unit">
                        <p>内蒙古xxx肥料厂</p>
                        <p>（50公斤/袋）</p>
                    </div>
                    <div class="num">
                        <p>出库数量：</p>
                        <el-input style="width: 120px; margin: 0 10px" v-model="input" placeholder="请输入数量" />
                        <p>公斤</p>
                    </div>
                </div>
                <div class="step">
                    <p class="title">审核流程</p>
                    <div>
                        <el-tag closable>张三</el-tag>
                        <i class="erp erpxiangyou1"></i>
                        <el-tag closable>李四</el-tag>
                        <i class="erp erpxiangyou1"></i>
                        <el-button type="primary" style="width: 28px" plain size="small"
                            ><i class="erp erpicon_tianjia"></i
                        ></el-button>
                    </div>
                </div>
                <el-button type="primary" style="margin-top: 20px">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import timer from "@/utils/timer.js";
export default {
    name: "stockPut",
    props: ["id"],
    data() {
        return {
            note: ''
        }
    },
    mounted() {},
    methods: {
        // 返回列表
        back() {
            this.$router.push("/erp/my/product");
        },
    },
}
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
.content {
    width: calc(100% - 200px);
    height: calc(100% - 100px);
    overflow-x: hidden;
    overflow-y: auto;
    padding: 20px 100px;
    .tag {
        background: #c3f8c7;
        color: #000000;
        display: inline-block;
        padding: 2px 10px;
        font-size: 12px;
        border-radius: 3px;
        margin-left: 10px;
    }
    .item {
        width: 400px;
        background: #f4f8fb;
        padding: 20px;
        border-radius: 18px;
        margin: 20px 0;
        p.tagBox {
            padding: 20px 0;
            .tag {
                margin-left: 0;
            }
        }
        .unit {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: rgba(175, 175, 175, 1);
        }
        .num {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 20px;
        }
    }
    .step {
        border-bottom: 1px solid rgba(0, 0, 0, 0.09);
        border-top: 1px solid rgba(0, 0, 0, 0.09);
        padding: 20px;
        div {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 20px;
            i {
                margin: 0 10px;
            }
            i.erpxiangyou1 {
                color: rgba(219, 219, 219, 1);
            }
            i.erpicon_tianjia {
                padding: 10px;
                background: ;
            }
        }
    }
}
</style>
