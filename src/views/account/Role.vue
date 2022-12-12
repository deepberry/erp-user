<template>
    <div class="role">
        <div class="group">
            <p
                v-for="(item, index) in groupList"
                @click="groupClick(index)"
                :class="{ active: index == currentGroupIndex }"
                :key="item.id"
            >
                {{ item.name }}
            </p>
        </div>
        <div class="content">
            <el-tabs v-model="activeTab" @tab-click="tabClick">
                <el-tab-pane label="ERP模块权限" name="erp">
                    <AccountRoleErp :id="currentGroupIndex"></AccountRoleErp>
                </el-tab-pane>
                <el-tab-pane label="设备及其他权限" name="device">
                    <AccountRoleDevice></AccountRoleDevice>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script lang="js">
import AccountRoleErp from '@/components/account/AccountRoleErp';
import AccountRoleDevice from '@/components/account/AccountRoleDevice'
export default {
    name: "role",
    components: {
        AccountRoleErp, AccountRoleDevice
    },
    data (){
        return {
            groupList: [
                {
                    name: '管理员',
                    id: 1
                },
                {
                    name: '普通用户',
                    id: 2
                },
            ],
            currentGroupIndex: 0,
            activeTab: 'erp',
            userList: [],
        }
    },
    methods: {
        groupClick (index){
            this.currentGroupIndex = index;
        },
        tabClick (v){

        }
    }
}
</script>

<style lang="less" scoped>
.role {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .group {
        width: 160px;
        height: 100%;
        padding: 0 10px;
        background: #ffffff;
        border-radius: 5px;
        p {
            color: #393939;
            text-indent: 20px;
            padding: 20px 0;
            cursor: pointer;
            border-bottom: 1px solid #f1f0f1;
        }
        p.active {
            color: #1890ff;
        }
    }
    .content {
        width: calc(100% - 270px);
        height: calc(100% - 4px);
        padding: 20px 40px;
        background: #ffffff;
        border-radius: 5px;
        .sss {
            background: red;
        }
    }
}
</style>
