<template>
    <div class="stockRecordDetail">
        <el-dialog
            custom-class="stockRecordDetail"
            :before-close="onClose"
            append-to-body
            v-model="showDetailBox"
            title="详情"
            width="600px"
        >
            <div v-loading="detailLoading" class="stockRecordDetailInner">
                <div>
                    <p>硝酸复合肥</p>
                    <p class="add">+1000公斤</p>
                </div>
                <div>
                    <p>
                        <span class="tag">化肥</span>
                    </p>
                    <p></p>
                </div>
                <div class="item">
                    <p>内蒙古xxx肥料有限公司</p>
                    <p class="unit">规格：50公斤/袋</p>
                </div>
                <div class="item">
                    <p>出入库类型：</p>
                    <p>已领用退回</p>
                </div>
                <div class="item">
                    <p>出入库时间：</p>
                    <p>2022.10.17</p>
                </div>
                <div class="item">
                    <p>操作时间：</p>
                    <p>2022.10.17 14:40</p>
                </div>
                <div class="item">
                    <p>操作人：</p>
                    <p>张三</p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "stockRecordDetail",
    props: ["id"],
    data() {
        return {
            showDetailBox: true, // 是否显示详情弹窗
        };
    },
    mounted() {},
    methods: {
        onClose() {
            this.$emit("close", 0);
            this.showDetailBox = false;
        },
    },
};
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
.stockRecordDetailInner {
    position: relative;
    top: -10px;
    padding: 10px 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.09);
    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        p.unit {
            color: rgba(156, 156, 156, 1);
        }
        p.add {
            color: rgba(61, 201, 71, 1);
        }
        p.miuns {
            color: rgba(243, 95, 95, 1);
        }
        span {
            background: #c3f8c7;
            color: #000000;
            display: inline-block;
            padding: 5px 10px;
            font-size: 12px;
            border-radius: 3px;
        }
    }
    div.item {
        padding: 20px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.09);
        color: rgba(0, 0, 0, 0.85);
    }
}
</style>
