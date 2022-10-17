<template>
    <div class="workOrder inner">
        <div class="box">
            <div class="head">
                <span>工单列表</span>
            </div>
            <div class="ctrl">
                <div class="status">
                    <el-badge
                        class="statusItem"
                        :value="item.sup > 0 ? item.sup : ''"
                        @click="selectClick(item.value)"
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
                    <el-button type="primary" class="searchSubmit" :loading="searchLoading">查询</el-button>
                    <el-button type="primary" class="searchCreateNewTask"
                        ><i class="erp erpjiufuqianbaoicon06"></i> 创建任务</el-button
                    >
                </div>
            </div>
            <div class="tableWrap">
                <div class="table">
                    <el-table :data="list" style="width: 100%" size="large" max-height="600px">
                        <el-table-column prop="id" label="工单号" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="title" label="农资名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="type" label="农资类型"></el-table-column>
                        <el-table-column prop="num" label="数量"></el-table-column>
                        <el-table-column prop="status" label="状态"></el-table-column>
                        <el-table-column prop="user" label="申领人"></el-table-column>
                        <el-table-column label="操作" width="260">
                            <template #default="scope">
                                <el-button link type="primary" @click="viewDetail(scope.row.id)">查看详情</el-button>
                                <el-button link type="primary" @click="stock(false, scope.row.id)">一键出库</el-button>
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
    </div>
</template>

<script>
export default {
    name: "workOrder",
    data() {
        return {
            status: [
                // 状态列表
                {
                    title: "全部",
                    value: "",
                    sup: 10,
                },
                {
                    title: "待审核",
                    value: "0",
                    sup: 0,
                },
                {
                    title: "已通过",
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
                    value: "2",
                    sup: 0,
                },
            ],
            currentStatus: "", // 当前选定的状态
            searchKey: "", // 搜索关键词
            searchLoading: false, // 搜索中状态,
            list: [
                // 数据列表
                {
                    id: "1477125",
                    title: "硝酸铵复合肥",
                    type: "化肥",
                    num: 100,
                    status: "已出库",
                    user: "Mins",
                },
                {
                    id: "1477125",
                    title: "硝酸铵复合肥",
                    type: "化肥",
                    num: 100,
                    status: "已出库",
                    user: "Mins",
                },
                {
                    id: "1477125",
                    title: "硝酸铵复合肥",
                    type: "化肥",
                    num: 100,
                    status: "已出库",
                    user: "Mins",
                },
                {
                    id: "1477125",
                    title: "硝酸铵复合肥",
                    type: "化肥",
                    num: 100,
                    status: "已出库",
                    user: "Mins",
                },
            ],
            currentPage: 1,
            pageSize: 100,
            total: 4,
        };
    },
    mounted() {},
};
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
</style>
