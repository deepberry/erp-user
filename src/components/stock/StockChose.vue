<template>
    <div class="stockChose">
        <el-dialog
            custom-class="stockChose"
            :before-close="onClose"
            append-to-body
            v-model="showChoseBox"
            title="选择平台农资信息"
            width="800px"
        >
            <div class="_import">
                <div class="search">
                    <el-input
                        v-model="searchKey"
                        style="width: 360px"
                        placeholder="关键字搜索：农资类型、农资名称、厂家名称"
                    />
                    <el-button style="margin-left: 10px" type="primary" plain>查询</el-button>
                </div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="title" label="农资名称" />
                    <el-table-column prop="type" label="农资类型" width="150" />
                    <el-table-column prop="company" label="生产厂家" />
                    <el-table-column prop="unit" label="规格" width="150" />
                </el-table>
                <div class="submit">
                    <el-button type="primary">提交</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "stockClose",
    data() {
        return {
            tableData: [],
            showChoseBox: true,
        };
    },
    methods: {
        onClose() {
            this.$emit("closeStockChose", 0);
            this.showChoseBox = false;
        },
    },
};
</script>

<style lang="less" scoped>
.stockChose {
    position: relative;
    top: -20px;
    padding-top: 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.09);
    .search {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 20px;
    }
    .submit {
        margin-top: 20px;
        text-align: right;
    }
}
</style>
