<template>
    <div class="box" v-loading="loading">
        <div class="status">
            <span
                @click="getData(item.v)"
                :class="item.v == currentStatus ? 'active' : ''"
                v-for="item in status"
                :key="item.v"
                >{{ item.k }}</span
            >
        </div>
        <el-empty v-if="list.length == 0" description="暂无数据" />
        <div
            class="item"
            v-for="item in list"
            :key="item.id"
            @click="$store.state.power.farmTaskDetail ? showDialogBox(item.id) : () => {}"
        >
            <div class="itemBox">{{ item.taskContent }}</div>
            <div class="itemBox">截止时间：{{ item.endTime }}</div>
            <div :class="item.opinion ? 'itemBox h' : 'itemBox'">建议：{{ item.opinion || "无" }}</div>
            <div class="itemBox">执行人：{{ item.executors }}</div>
            <div :class="`itemBox s_${item.status}`">{{ item.statusStr }}</div>
        </div>
        <PlantCropsDetailADialog
            @gotob="gotob"
            v-if="showDetailBox"
            :id="currentId"
            @onCloseDetail="onCloseDetail"
        ></PlantCropsDetailADialog>
    </div>
</template>

<script>
import timer from "@/utils/timer";
import PlantCropsDetailADialog from "@/components/plant/PlantCropsDetailADialog";
export default {
    data() {
        return {
            list: [],
            loading: false,
            currentStatus: -1,
            status: [
                {
                    k: "全部",
                    v: -1,
                },
                {
                    k: "待执行",
                    v: 0,
                },
                {
                    k: "待检查",
                    v: 1,
                },
                {
                    k: "合格",
                    v: 2,
                },
                {
                    k: "不合格",
                    v: 3,
                },
            ],
            showDetailBox: false,
            currentId: "",
            showAdd: false,
        };
    },
    mounted() {
        this.getData(-1);
    },
    components: {
        PlantCropsDetailADialog,
    },
    watch: {
        $route(v) {
            if (v.query.tab == 1) {
                this.getData(-1);
            }
        },
    },
    methods: {
        gotob() {
            this.$emit("gotob");
        },
        showDialogBox(id) {
            this.currentId = id;
            this.showDetailBox = true;
        },
        // 关闭详情
        onCloseDetail(params) {
            if (params == 1) {
                this.getData(this.currentStatus);
            }
            let timer = setTimeout(() => {
                this.showDetailBox = false;
                clearTimeout(timer);
            }, 500);
        },
        // 获取种植任务列表
        getData(v) {
            this.loading = true;
            this.currentStatus = v;
            this.ajax
                .post("/api/v1/adam/task/taskList", {
                    pageNum: 1,
                    pageSize: 100,
                    param: {
                        gardenId: this.$route.query.gardenId,
                        growPlantId: this.$route.query.id,
                        keyWord: "",
                        status: this.currentStatus,
                    },
                })
                .then((r) => {
                    this.list = r.data.map((item) => {
                        item.executors = JSON.parse(item.executors)
                            .map((item) => item.name)
                            .join(",");
                        item.endTime = timer.time("y-m-d", item.endTime);
                        switch (item.status) {
                            case 0:
                                item.statusStr = "待执行";
                                break;
                            case 1:
                                item.statusStr = "待检查";
                                break;
                            case 2:
                                item.statusStr = "合格";
                                break;
                            case 3:
                                item.statusStr = "不合格";
                                break;
                        }
                        return item;
                    });
                    this.loading = false;
                });
        },
    },
};
</script>

<style lang="less" scoped>
.box {
    padding: 0 20px;
    .status {
        padding: 10px 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span {
            margin: 0 10px;
            color: #8f8f8f;
            cursor: pointer;
        }
        span.active {
            color: #538dff;
        }
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
        .itemBox:nth-child(5) {
            width: 100px;
        }
        .itemBox.h {
            color: #fe915d;
        }
        .itemBox.s_0 {
            color: #fe915d;
        }
        .itemBox.s_1 {
            color: #538dff;
        }
        .itemBox.s_2 {
            color: #3dc947;
        }
        .itemBox.s_3 {
            color: #f34f26;
        }
    }
}
</style>
