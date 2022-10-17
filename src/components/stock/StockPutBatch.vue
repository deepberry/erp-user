<template>
    <div class="StockPutBatch">
        <el-dialog
            custom-class="StockPutBatch"
            :before-close="onClose"
            append-to-body
            v-model="showBatchBox"
            title="批量入库"
            width="700px"
        >
            <div v-loading="detailLoading" class="StockPutBatchInner">
                <div class="box">
                    <el-button @click="showChose = true" type="primary" plain>
                        <i class="erp erpicon_tianjia" style="margin-right: 5px"></i>添加</el-button
                    >
                </div>
                <div class="box">
                    <div class="boxItem">
                        <p><span>*</span>入库类型：</p>
                        <el-select
                            style="width: calc(100% - 80px)"
                            v-model="value"
                            class="m-2"
                            placeholder="请选择入库类型"
                        >
                            <el-option label="item.label" value="item.value" />
                            <el-option label="item.label" value="item.value" />
                            <el-option label="item.label" value="item.value" />
                        </el-select>
                    </div>
                    <div class="boxItem">
                        <p><span>*</span>入库时间：</p>
                        <el-date-picker
                            style="width: calc(100% - 80px)"
                            v-model="value1"
                            type="datetime"
                            placeholder="请选择时间"
                        />
                    </div>
                    <div class="boxItem">
                        <p><span>*</span>退回人：</p>
                        <el-input style="width: calc(100% - 80px)" v-model="input" placeholder="请输入退回人" />
                    </div>
                </div>
                <div class="box">
                    <p class="title"><span class="must">*</span> 单据、凭证、照片：</p>
                    <div class="pics">
                        <div class="img">
                            <img src="../../assets/img/ds.png" alt="" />
                            <i class="erp erpguanbi"></i>
                        </div>
                        <div class="img">
                            <img src="../../assets/img/ds.png" alt="" />
                            <i class="erp erpguanbi"></i>
                        </div>
                        <div class="upload">
                            <p><i class="erp erpshangchuan"></i></p>
                            <p>点击上传单据、凭证、照片</p>
                        </div>
                    </div>
                </div>
                <div class="box">
                    <p class="title">备注：</p>
                    <el-input v-model="note" :rows="5" type="textarea" placeholder="输入备注内容" />
                </div>
                <div class="submit">
                    <el-button type="primary">提交</el-button>
                </div>
            </div>
        </el-dialog>
        <StockChose v-if="showChose" @closeStockChose="closeStockChose"></StockChose>
    </div>
</template>

<script>
import StockChose from "@/components/stock/StockChose";
export default {
    name: "StockPutBatch",
    props: ["id"],
    data() {
        return {
            showBatchBox: true, // 是否显示详情弹窗
            showChose: false,
        };
    },
    components: {
        StockChose,
    },
    mounted() {},
    methods: {
        onClose() {
            this.$emit("closeBatch", 0);
            this.showBatchBox = false;
        },
        closeStockChose() {
            let timer = setTimeout(() => {
                this.showChose = false;
                clearTimeout(timer);
            }, 500);
        },
    },
};
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
.StockPutBatchInner {
    position: relative;
    top: -10px;
    padding-bottom: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.09);
    .box {
        padding: 15px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.09);
        .boxItem {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 10px 0;
            > p {
                width: 80px;
                span {
                    color: red;
                }
            }
        }
        .must {
            color: red;
        }
        .info {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 10px 0;
            p {
                width: 300px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .tag {
                    background: #c3f8c7;
                    color: #000000;
                    display: inline-block;
                    padding: 2px 10px;
                    font-size: 12px;
                    border-radius: 3px;
                    margin-left: 10px;
                }
            }
        }
        .title {
            padding-bottom: 10px;
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
                p {
                    width: 100%;
                    text-align: center;
                    padding: 5px 0;
                    i {
                        font-size: 22px;
                    }
                }
            }
        }
    }
    .submit {
        text-align: right;
        padding-top: 20px;
    }
}
</style>
