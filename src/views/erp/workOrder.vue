<template>
    <div class="workOrder inner">
        <div class="box">
            <div class="head">
                <span class="active">工单列表</span>
            </div>
            <div class="ctrl">
                <div class="status">
                    <el-badge
                        class="statusItem"
                        :value="item.sup > 0 ? item.sup : ''"
                        @click="changeStatus(item)"
                        v-for="item in status"
                        :key="item.value"
                    >
                        <el-button :type="currentStatus == item.value ? 'primary' : ''" link>{{
                            item.title
                        }}</el-button>
                    </el-badge>
                </div>
                <div class="search">
                    <el-input
                        v-model="searchKey"
                        class="searchInput"
                        placeholder="关键词搜索：农资类型、农资名称..."
                    ></el-input>
                    <el-button type="primary" class="searchSubmit" @click="getData">查询</el-button>
                </div>
            </div>
            <div class="tableWrap">
                <div class="table">
                    <el-table size="large" :data="list" v-loading="loading" style="width: 100%" max-height="600px">
                        <el-table-column prop="orderUuid" label="工单号" show-overflow-tooltip></el-table-column>
                        <el-table-column label="农资名称" show-overflow-tooltip>
                            <template #default="scope">
                                <span v-for="(item, index) in scope.row.totalCount" :key="index"
                                    >{{ item.variety }} <br
                                /></span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="type" label="农资类型">
                            <template #default="scope">
                                <span v-for="(item, index) in scope.row.totalCount" :key="index"
                                    >{{ item.title }} <br
                                /></span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="num" label="数量">
                            <template #default="scope">
                                <span v-for="(item, index) in scope.row.totalCount" :key="index"
                                    >{{ item.agriculturalCos }} {{ item.unitweight }} <br
                                /></span>
                            </template>
                        </el-table-column>
                        <el-table-column label="状态">
                            <template #default="scope">
                                <span :style="{ color: scope.row.orderStatusColor }">{{ scope.row.orderStatus }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="userName" label="申领人"></el-table-column>
                        <el-table-column label="操作" width="260">
                            <template #default="scope">
                                <el-button
                                    link
                                    type="primary"
                                    @click="showDetail(scope.row.id)"
                                    v-if="$store.state.power.workOrderDetail"
                                    >查看详情</el-button
                                >
                                <el-button
                                    link
                                    type="primary"
                                    @click="out(scope.row.id)"
                                    v-if="$store.state.power.simpleMaterialsOut"
                                    >一键出库</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pages" v-if="list.length > 0">
                        <span class="total">共 {{ total }} 条</span>
                        <el-pagination
                            v-model:currentPage="currentPage"
                            background
                            @current-change="getData"
                            layout="prev, pager, next, jumper"
                            :total="total"
                        />
                    </div>
                </div>
            </div>
        </div>
        <WorkOrderDetail v-if="showDetailBox" :id="currentDetailId" @onCloseDetail="onCloseDetail"></WorkOrderDetail>
    </div>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";
import WorkOrderDetail from "@/components/workOrder/WorkOrderDetail.vue";
export default {
    name: "workOrder",
    data() {
        return {
            status: [
                // 状态列表
                {
                    title: "全部",
                    value: "-1",
                    sup: 0,
                },
                {
                    title: "待审核",
                    value: "0",
                    sup: 0,
                },
                {
                    title: "待出库",
                    value: "1",
                    sup: 0,
                },
                {
                    title: "不通过",
                    value: "2",
                    sup: 0,
                },
                {
                    title: "已出库",
                    value: "3",
                    sup: 0,
                },
            ],
            currentStatus: "-1", // 当前选定的状态
            searchKey: "", // 搜索关键词
            loading: false,
            list: [],
            currentPage: 1,
            pageSize: 100,
            total: 0,
            showDetailBox: false, // 是否显示详情弹窗
            currentDetailId: "", // 查看详情的ID
        };
    },
    components: {
        WorkOrderDetail,
    },
    mounted() {
        const ajax = async () => {
            await this.getData();
            await this.getStatus_0();
        };
        ajax();
    },
    methods: {
        // 获取数据
        getData() {
            return new Promise((a, b) => {
                this.loading = true;
                this.ajax
                    .post("/api/v1/adam/workOrder/workOrder-list", {
                        pageNum: this.currentPage,
                        pageSize: 10,
                        param: {
                            keyWord: this.searchKey,
                            orderStatus: this.currentStatus,
                        },
                    })
                    .then((r) => {
                        this.loading = false;
                        this.list = r.data.map((item) => {
                            let status = "";
                            let color = "";
                            switch (item.orderStatus) {
                                case 0:
                                    status = "待审核";
                                    color = "#EC2626";
                                    break;
                                case 1:
                                    status = "待出库";
                                    color = "#0DD71C";
                                    break;
                                case 2:
                                    status = "不通过";
                                    color = "#1890FF";
                                    break;
                                case 3:
                                    status = "已出库";
                                    color = "#A8A8A8";
                                    break;
                            }
                            item.orderStatus = status;
                            item.orderStatusColor = color;
                            return item;
                        });
                        this.total = r.total;
                        a();
                    });
            });
        },
        // 获取待审核的数量
        getStatus_0() {
            return new Promise((a, b) => {
                this.ajax
                    .post("/api/v1/adam/workOrder/workOrder-list", {
                        pageNum: this.currentPage,
                        pageSize: 10,
                        param: {
                            keyWord: this.searchKey,
                            orderStatus: 0,
                        },
                    })
                    .then((r) => {
                        this.status[1].sup = r.total;
                        a();
                    });
            });
        },
        changeStatus(item) {
            this.currentStatus = item.value;
            this.getData();
        },
        // 打开详情
        showDetail(id) {
            console.log(this.showDetailBox);
            this.currentDetailId = id;
            this.showDetailBox = true;
        },
        // 关闭详情
        onCloseDetail(v) {
            if (v == 1) {
                this.getData();
            }
            let timer = setTimeout(() => {
                this.showDetailBox = false;
                clearTimeout(timer);
            }, 500);
        },
        // 出库
        out(id) {
            ElMessageBox.confirm(
                "农资名称：史丹利复合肥、金克拉复合肥、金克拉复合肥、金克拉复合肥、金克拉复合肥、百草枯2号 <br> 确定要出库吗？",
                "一键出库",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    dangerouslyUseHTMLString: true,
                }
            )
                .then(() => {
                    ElMessage({
                        type: "success",
                        message: "Delete completed",
                    });
                })
                .catch(() => {
                    ElMessage({
                        type: "info",
                        message: "Delete canceled",
                    });
                });
        },
    },
};
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
</style>
