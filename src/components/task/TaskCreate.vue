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
                    <el-select v-model="value" style="width: 650px" class="m-2" placeholder="请选择园区">
                        <el-option label="item.label" value="item.value" />
                        <el-option label="item.label" value="item.value" />
                        <el-option label="item.label" value="item.value" />
                        <el-option label="item.label" value="item.value" />
                    </el-select>
                </div>
                <div class="item">
                    <p class="title">作物：</p>
                    <el-input v-model="input" style="width: 650px" placeholder="请输入作物" />
                </div>
                <div class="item">
                    <p class="title">具体内容：</p>
                    <el-input v-model="input" style="width: 650px" placeholder="请输入内容" />
                </div>
                <div class="item">
                    <p class="title">操作指导：</p>
                    <div class="pics">
                        <div class="img">
                            <img src="../../assets/img/ds.png" alt="" />
                            <i class="erp erpguanbi"></i>
                        </div>
                        <div class="upload">
                            <p><i class="erp erpshangchuan"></i></p>
                            <p>点击上传视频</p>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <p class="title">执行人：</p>
                    <el-input v-model="input" style="width: 650px" placeholder="请输入内容" />
                </div>
                <div class="item">
                    <p class="title">开始时间：</p>
                    <el-date-picker
                        style="width: 650px"
                        v-model="value1"
                        type="date"
                        placeholder="请选择开始时间"
                        :size="size"
                    />
                </div>
                <div class="item">
                    <p class="title">截止时间：</p>
                    <el-date-picker
                        style="width: 650px"
                        v-model="value1"
                        type="date"
                        placeholder="请选择截止时间"
                        :size="size"
                    />
                </div>
            </div>
            <div class="btns">
                <el-button plain>取消</el-button>
                <el-button type="primary">确定</el-button>
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
        };
    },
    mounted() {},
    methods: {
        onClose() {
            this.$emit("onCloseDetail", 0);
            this.showDetailBox = false;
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
        .pics {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            position: relative;
            left: -10px;
            .img {
                width: 140px;
                height: 100px;
                border-radius: 5px;
                position: relative;
                overflow: hidden;
                img {
                    width: 140px;
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
                width: 140px;
                height: 100px;
                border-radius: 5px;
                background: rgba(244, 248, 251, 1);
                display: flex;
                border: 1px solid #e6e6e6;
                justify-content: center;
                align-content: center;
                flex-wrap: wrap;
                font-size: 12px;
                color: rgba(107, 145, 242, 1);
                margin-left: 10px;
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
}
.btns {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>
