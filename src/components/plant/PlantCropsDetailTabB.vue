<template>
    <div class="box">
        <div class="status">
            <el-button type="primary">添加农事</el-button>
        </div>
        <el-empty v-if="list.length == 0" description="暂无数据" />
        <div class="items">
            <div class="item" v-for="item in list" :key="item.id">
                <div class="itemBox">{{ item.title }}</div>
                <div class="itemBox">农事时间：{{ item.workTime }}</div>
                <div :class="item.workText ? 'itemBox h' : 'itemBox'">备注：{{ item.workText || "无" }}</div>
                <div class="itemBox s_3">
                    <i class="erp erpxiangyou1"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [],
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 获取种植任务列表
        getData(v) {
            this.currentStatus = v;
            this.ajax
                .post("/api/v1/adam/task/getFarmRecordByPlantsId", {
                    id: this.$route.query.id,
                })
                .then((r) => {
                    this.list = r.data;
                });
        },
    },
};
</script>

<style lang="less" scoped>
.box {
    padding: 0 20px;
    .status {
        width: calc(100% - 40px);
        padding: 10px 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .items {
        height: 500px;
        overflow-y: auto;
    }
    .item {
        width: calc(100% - 80px);
        background: #ffffff;
        box-shadow: 0px 0px 14px 0px #e5ecf2;
        border-radius: 8px;
        margin-top: 20px;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        .itemBox:nth-child(1) {
            width: 20%;
            padding: 5px;
            background: linear-gradient(to right, rgb(226, 236, 248), rgba(226, 236, 248, 0));
        }
        .itemBox:nth-child(2) {
            width: 20%;
        }
        .itemBox:nth-child(3) {
            width: 20%;
            color: #8f8f8f;
        }
        .itemBox:nth-child(4) {
            width: 100px;
            color: #c0c0c0;
        }
        .itemBox.h {
            color: #fe915d;
        }
    }
}
</style>
