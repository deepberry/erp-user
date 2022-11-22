<template>
    <el-dialog v-model="dialogVisible" :title="title" width="30%" :before-close="handleClose" append-to-body>
        <div class="search">
            <el-input v-model="searchKey" placeholder="关键字搜索：农事类型、农资、备注" />
            <el-button type="primary" style="margin-left: 15px" plain>查询</el-button>
        </div>
        <div class="list">
            <div class="item" :style="{ cursor: title == '农资使用统计' ? 'pointer' : '' }" @click="detail">
                <div class="itemInner">
                    <p class="itemTitle">施肥</p>
                    <p>2022.09.15</p>
                </div>
                <div class="itemInner">
                    <p>备注：这次是施肥</p>
                    <p></p>
                </div>
                <div class="itemInner btm">
                    <div>
                        <p>
                            <span>复合肥5号</span>
                            <span>8000公斤</span>
                        </p>
                        <p>
                            <span>复合肥5号</span>
                            <span>8000公斤</span>
                        </p>
                    </div>
                    <p>张三</p>
                </div>
                <div class="foot" v-if="title == '工时使用统计'">5工时</div>
            </div>
            <div class="item">
                <div class="itemInner">
                    <p class="itemTitle">施肥</p>
                    <p>2022.09.15</p>
                </div>
                <div class="itemInner">
                    <p>备注：这次是施肥</p>
                    <p></p>
                </div>
                <div class="itemInner btm">
                    <div>
                        <p>
                            <span>复合肥5号</span>
                            <span>8000公斤</span>
                        </p>
                        <p>
                            <span>复合肥5号</span>
                            <span>8000公斤</span>
                        </p>
                    </div>
                    <p>张三</p>
                </div>
                <div class="foot" v-if="title == '工时使用统计'">5工时</div>
            </div>
        </div>
        <PlantCropsDetailCDialogDetail
            v-if="showDetail"
            :title="detailTitle"
            :id="detailId"
            @close="closeDetail"
        ></PlantCropsDetailCDialogDetail>
    </el-dialog>
</template>

<script>
import PlantCropsDetailCDialogDetail from "@/components/plant/PlantCropsDetailCDialogDetail";
export default {
    props: ["title", "id"],
    data() {
        return {
            dialogVisible: true,
            searchKey: "",
            list: [],
            showDetail: false,
            detailTitle: "",
            detailId: "",
        };
    },
    components: {
        PlantCropsDetailCDialogDetail,
    },
    methods: {
        handleClose() {
            this.dialogVisible = false;
            this.$emit("close");
        },
        detail() {
            if (this.title == "农资使用统计") {
                this.detailTitle = "施肥详情";
                this.showDetail = true;
            }
        },
        closeDetail() {
            setTimeout(() => {
                this.showDetail = false;
            }, 300);
        },
    },
};
</script>

<style lang="less" scoped>
.search {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    top: -10px;
}
.list {
    width: 100%;
    max-height: 500px;
    overflow-y: auto;
    .item {
        width: calc(100% - 60px);
        padding: 10px 20px;
        margin-top: 15px;
        margin-left: 10px;
        background: #ffffff;
        box-shadow: 0px 0px 15px 0px #e5ecf2;
        border-radius: 8px;
        position: relative;
        padding-bottom: 30px;
        overflow: hidden;
        .itemInner {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            line-height: 30px;
            font-size: 14px;
            .itemTitle {
                font-size: 16px;
            }
        }
        .itemInner.btm {
            margin-top: 10px;
            div {
                width: 70%;
                p {
                    width: 50%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #6397fd;
                }
            }
        }
        .foot {
            text-align: center;
            background: #e7efff;
            position: absolute;
            width: 100%;
            height: 28px;
            line-height: 28px;
            color: #6397fd;
            font-size: 12px;
            left: 0;
            bottom: 0;
        }
    }
}
</style>
