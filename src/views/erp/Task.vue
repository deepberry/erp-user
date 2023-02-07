<template>
    <div class="task inner">
        <div class="box">
            <div class="head">
                <span class="active">任务列表</span>
            </div>
            <div class="ctrl">
                <div class="status">
                    <el-badge
                        class="statusItem"
                        :value="item.sup > 0 ? item.sup : ''"
                        @click="statusClick(item.value)"
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
                        placeholder="关键词搜索：任务内容、检查建议..."
                    ></el-input>
                    <el-button type="primary" class="searchSubmit" @click="getData" :loading="searchLoading"
                        >查询</el-button
                    >
                    <el-button
                        v-if="$store.state.power.createTaskBtn"
                        type="primary"
                        class="searchCreateNewTask"
                        @click="showCreateBox = true"
                        ><i class="erp erpjiufuqianbaoicon06"></i> 创建任务</el-button
                    >
                </div>
            </div>
            <div class="tableWrap">
                <div class="table">
                    <el-table size="large" :data="list" style="width: 100%" max-height="600px" v-loading="loading">
                        <el-table-column label="任务单号" width="150" show-overflow-tooltip>
                            <template #default="scope"> RW{{ scope.row.id }} </template>
                        </el-table-column>
                        <el-table-column label="所属棚区" width="300" show-overflow-tooltip>
                            <template #default="scope">
                                {{ scope.row.gardenTitle }}-{{ scope.row.growPlantTitle }}-{{ scope.row.address }}
                            </template>
                        </el-table-column>
                        <el-table-column label="执行人">
                            <template #default="scope">
                                <p v-for="item in scope.row.executors" :key="item.id">{{ item.name }}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="taskContent" label="任务内容"></el-table-column>
                        <el-table-column label="状态" width="200">
                            <template #default="scope">
                                <span :style="{ color: scope.row.color }">{{ scope.row.statusText }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template #default="scope">
                                <el-button
                                    link
                                    type="primary"
                                    v-if="$store.state.power.taskDetail"
                                    @click="showDetail(scope.row.id)"
                                    >查看详情</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pages" v-if="list.length > 0">
                        <span class="total">共 {{ total }} 条</span>
                        <el-pagination
                            v-model:currentPage="currentPage"
                            v-model:page-size="pageSize"
                            @current-change="getData"
                            background
                            layout="prev, pager, next, jumper"
                            :total="total"
                        />
                    </div>
                </div>
            </div>
        </div>
        <TaskDetail v-if="showDetailBox" :id="currentId" @onCloseDetail="onCloseDetail"></TaskDetail>
        <TaskCreate v-if="showCreateBox" @onCloseCreate="onCloseCreate"></TaskCreate>
    </div>
</template>

<script>
import TaskDetail from "@/components/task/TaskDetail.vue";
import TaskCreate from "@/components/task/TaskCreate.vue";
export default {
    name: "task",
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
                    title: "待执行",
                    value: "0",
                    sup: 0,
                },
                {
                    title: "待检查",
                    value: "1",
                    sup: 0,
                },
                {
                    title: "合格",
                    value: "2",
                    sup: 0,
                },
                {
                    title: "不合格",
                    value: "3",
                    sup: 0,
                },
            ],
            loading: false,
            currentStatus: "-1", // 当前选定的状态
            searchKey: "", // 搜索关键词
            searchLoading: false, // 搜索中状态,
            list: [],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            showDetailBox: false, // 是否显示详情弹窗
            showCreateBox: false,
            currentId: "", // 显示详情的ID
        };
    },
    components: {
        TaskDetail,
        TaskCreate,
    },
    mounted() {
        this.getData();
        this.getStatus_1();
    },
    methods: {
        // 切换状态
        statusClick(v) {
            this.currentStatus = v;
            this.getData();
        },
        // 获取待检查的数据
        getStatus_1() {
            this.ajax
                .post("/api/v1/adam/task/manageTaskList", {
                    pageNum: this.currentPage,
                    pageSize: 10,
                    param: {
                        gardenId: "",
                        growPlantId: "",
                        status: 1,
                        keyWord: "",
                    },
                })
                .then((r) => {
                    this.status[2].sup = r.total;
                });
        },
        // 获取数据
        getData() {
            this.loading = true;
            this.ajax
                .post("/api/v1/adam/task/manageTaskList", {
                    pageNum: this.currentPage,
                    pageSize: 10,
                    param: {
                        gardenId: -1,
                        growPlantId: -1,
                        status: this.currentStatus,
                        keyWord: this.searchKey,
                    },
                })
                .then((r) => {
                    this.list = r.data.map((item) => {
                        item.executors = JSON.parse(item.executors);
                        switch (item.status) {
                            case 0:
                                item.statusText = "待执行";
                                item.color = "#A8A8A8";
                                break;
                            case 1:
                                item.statusText = "待检查";
                                item.color = "#1890FF";
                                break;
                            case 2:
                                item.statusText = "合格";
                                item.color = "#0DD71C";
                                break;
                            case 3:
                                item.statusText = "不合格";
                                item.color = "#FF4949";
                                break;
                            case 4:
                                item.statusText = "打回";
                                item.color = "#FF4949";
                                break;
                        }
                        return item;
                    });
                    this.total = r.total;
                    this.loading = false;
                });
        },
        // 打开详情
        showDetail(id) {
            this.currentId = id;
            this.showDetailBox = true;
        },
        // 关闭详情
        onCloseDetail(params) {
            if (params == 1) {
                this.getData();
            }
            let timer = setTimeout(() => {
                this.showDetailBox = false;
                clearTimeout(timer);
            }, 500);
        },
        // 创建任务弹窗关闭时
        onCloseCreate(params) {
            if (params == 1) {
                this.getData();
            }
            console.log(params);
            let timer = setTimeout(() => {
                this.showCreateBox = false;
                clearTimeout(timer);
            }, 500);
        },
    },
};
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
</style>
