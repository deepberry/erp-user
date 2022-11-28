<template>
    <div class="box">
        <div class="status">
            <el-button type="primary" @click="showAdd = true" v-if="$store.state.power.addFarmRecordBtn"
                >添加农事</el-button
            >
        </div>
        <el-empty v-if="list.length == 0" description="暂无数据" />
        <div class="items">
            <div
                class="item"
                v-for="item in list"
                :key="item.id"
                @click="$store.state.power.farmRecordDetail ? itemClick(item.id) : () => {}"
            >
                <div class="itemBox">{{ item.title }}</div>
                <div class="itemBox">农事时间：{{ item.workTime }}</div>
                <div :class="item.workText ? 'itemBox h' : 'itemBox'">备注：{{ item.workText || "无" }}</div>
                <div class="itemBox s_3">
                    <i class="erp erpxiangyou1"></i>
                </div>
            </div>
        </div>
        <PlantCropsDetailCDialogDetail
            v-if="showDetail"
            :title="detailTitle"
            :id="detailId"
            @close="closeDetail"
            @load="getData"
        ></PlantCropsDetailCDialogDetail>
        <PlantCropsDetailBDialog @load="getData" v-if="showAdd" @close="closeAdd"></PlantCropsDetailBDialog>
    </div>
</template>
<script>
import PlantCropsDetailCDialogDetail from "@/components/plant/PlantCropsDetailCDialogDetail";
import PlantCropsDetailBDialog from "@/components/plant/PlantCropsDetailBDialog";
export default {
    props: ["showADialog"],
    data() {
        return {
            list: [],
            showDetail: false,
            detailTitle: "",
            detailId: "",
            showAdd: false,
        };
    },
    mounted() {
        this.getData();
    },
    watch: {
        $route(v) {
            if (v.query.tab == 2) {
                this.getData();
            }
        },
    },
    components: {
        PlantCropsDetailCDialogDetail,
        PlantCropsDetailBDialog,
    },
    methods: {
        itemClick(id) {
            this.detailTitle = "农事记录详情";
            this.detailId = id;
            this.showDetail = true;
        },
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
        closeDetail() {
            setTimeout(() => {
                this.showDetail = false;
            }, 300);
        },
        closeAdd(v = null) {
            if (v == 1) {
                this.getData();
            }
            setTimeout(() => {
                this.showAdd = false;
            }, 300);
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
