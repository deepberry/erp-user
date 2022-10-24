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
                    <el-button type="primary" class="searchSubmit" :loading="searchLoading">查询</el-button>
                    <el-button type="primary" class="searchCreateNewTask" @click="showCreateBox = true"
                        ><i class="erp erpjiufuqianbaoicon06"></i> 创建任务</el-button
                    >
                </div>
            </div>
            <div class="tableWrap">
                <div class="table">
                    <el-table :data="list" style="width: 100%" size="large" max-height="600px" v-loading="loading">
                        <el-table-column prop="id" label="任务单号" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="title" label="所属棚区" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="type" label="执行人"></el-table-column>
                        <el-table-column prop="num" label="任务内容"></el-table-column>
                        <el-table-column prop="status" label="状态"></el-table-column>
                        <el-table-column label="操作" width="260">
                            <template #default="scope">
                                <el-button link type="primary" @click="showDetail(scope.row.id)">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pages" v-if="list.length > 0">
                        <span class="total">共 {{ total }} 条</span>
                        <el-pagination
                            v-model:currentPage="currentPage"
                            v-model:page-size="pageSize"
                            :page-sizes="[100, 200, 300, 400]"
                            background
                            layout="prev, pager, next, jumper"
                            :total="total"
                        />
                    </div>
                </div>
            </div>
        </div>
        <TaskDetail v-if="showDetailBox" @onCloseDetail="onCloseDetail"></TaskDetail>
        <TaskCreate v-if="showCreateBox" @onCloseDetail="onCloseCreate"></TaskCreate>
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
            pageSize: 20,
            total: 4,
            showDetailBox: false, // 是否显示详情弹窗
            showCreateBox: false,
        };
    },
    components: {
        TaskDetail,
        TaskCreate,
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 切换状态
        statusClick(v) {
            if (this.currentStatus == v) return;
            this.currentStatus = v;
            this.getData();
        },
        // 获取数据
        getData() {
            this.loading = true;
            this.ajax
                .post("/api/v1/adam/task/taskList", {
                    pageNum: 0,
                    pageSize: 0,
                    param: {
                        gardenId: 0,
                        growPlantId: 0,
                        status: this.currentStatus,
                    },
                })
                .then((r) => {
                    console.log(r);
                    this.list = r.data;
                    this.loading = false;
                });
        },
        // 打开详情
        showDetail(id) {
            console.log(this.showDetailBox);
            this.showDetailBox = true;
        },
        // 关闭详情
        onCloseDetail() {
            let timer = setTimeout(() => {
                this.showDetailBox = false;
                clearTimeout(timer);
            }, 500);
        },
        // 创建任务弹窗关闭时
        onCloseCreate() {
            let timer = setTimeout(() => {
                this.showCreateBox = false;
                this.getData();
                clearTimeout(timer);
            }, 500);
        },
    },
};
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
</style>
