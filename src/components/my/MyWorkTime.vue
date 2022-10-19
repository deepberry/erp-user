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
                <span style="position: relative; top: 2px; font-size: 15px">农资入库</span>
            </div>
            <div class="content">
                <div class="item">
                    <div class="info">
                        <p>
                            <span>硝酸复合肥</span>
                            <span class="tag">化肥</span>
                        </p>
                        <p>内蒙古xx化肥有限公司</p>
                        <p>规格：50公斤/袋</p>
                    </div>
                    <div class="info">
                        <p>库存：20袋 (共1000公斤)</p>
                        <p>
                            <span>出库数量：</span>
                            <el-input size="small" style="width: 70px; margin-right: 10px" v-model="input" />
                            <span>公斤</span>
                        </p>
                        <p>
                            <el-button size="small" type="primary">
                                <i style="font-size: 12px; margin-right: 5px" class="erp erpicon_tianjia"></i> 添加
                            </el-button>
                        </p>
                    </div>
                </div>
                <div class="item log">
                    <p><span class="must">*</span> 出库类型：领用出库</p>
                    <p><span class="must">*</span> 出库时间：2022年10月14日 15:02:11</p>
                    <p><span class="must">*</span> 领取人：法外狂徒张三</p>
                </div>
                <div class="item">
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
                <div class="item">
                    <p class="title">备注：</p>
                    <el-input v-model="note" :rows="5" type="textarea" placeholder="输入备注内容" />
                </div>
                <div class="item">
                    <el-button type="primary">提交</el-button>
                </div>
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
            this.$router.push("/erp/stock");
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
    .item {
        padding: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.09);
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
    .item.log {
        p {
            padding: 10px 0;
        }
    }
    .item:last-child {
        border: none;
    }
}
</style>
