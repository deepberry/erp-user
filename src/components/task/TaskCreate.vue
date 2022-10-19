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
            <div v-loading="detailLoading" class="taskDetailInner purchaseDetailBoxInner">ss</div>
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
@import url("@/assets/css/purchase.order.less");
.taskDetailInner {
    position: relative;
    top: -10px;
    padding: 20px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.09);
}
</style>
