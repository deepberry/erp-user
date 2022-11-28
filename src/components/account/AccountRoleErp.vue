<template>
    <div class="roleErp" v-loading="loading">
        <div class="box">
            <el-tree
                :props="props"
                ref="tree"
                :data="list"
                node-key="id"
                default-expand-all
                :default-checked-keys="showList"
                show-checkbox
            />
        </div>
        <div class="btn">
            <el-button type="primary" @click="save" :loading="saving">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "roleErp",
    props: ["id"],
    watch: {
        id(v) {
            this.roleId = v;
            this.init(this);
        },
    },
    data() {
        return {
            roleId: 0,
            props: {
                label: "name",
                children: "menuParentBoList",
            },
            list: [],
            loading: false,
            showList: [],
            saving: false,
        };
    },
    mounted() {
        this.init(this);
    },
    methods: {
        init: async function (t) {
            t.loading = true;
            this.list = [];
            this.showList = [];
            let list = await t.getList();
            let user = await t.getUserRole();

            // 合并权限列表
            let show = [];
            list = list.map((i1) => {
                user.map((u1) => {
                    // 一级菜单
                    if (i1.id == u1.id) {
                        i1.menuParentBoList.map((i2) => {
                            // 二级菜单
                            u1.menuParentBoList.map((u2) => {
                                if (i2.id == u2.id) {
                                    i2.menuParentBoList.map((i3) => {
                                        // 三级菜单，合并已选中权限
                                        u2.menuParentBoList.map((u3) => {
                                            if (i3.id == u3.id) {
                                                show.push(i3.id);
                                            }
                                        });
                                    });
                                }
                            });
                        });
                    }
                });
                return i1;
            });
            t.list = list;
            t.showList = show;
            t.loading = false;
        },
        // 获取菜单列表
        getList() {
            return new Promise((a, b) => {
                this.ajax.post("/api/v1/adam/adminMenu/getMenuList").then((r) => {
                    let data = r.data.map((item) => {
                        item.menuParentBoList = item.menuParentBoList.map((i) => {
                            i.menuParentBoList = i.menuBoList;
                            return i;
                        });
                        return item;
                    });
                    a(data);
                });
            });
        },
        // 获取当前用户的权限
        getUserRole() {
            return new Promise((a, b) => {
                this.ajax
                    .post("/api/v1/adam/adminMenu/getUserMenuList", {
                        roleId: this.roleId,
                    })
                    .then((r) => {
                        let data = r.data.map((item) => {
                            item.menuParentBoList = item.menuParentBoList.map((i) => {
                                i.menuParentBoList = i.menuBoList;
                                return i;
                            });
                            return item;
                        });
                        a(data);
                    });
            });
        },
        // 保存
        save() {
            this.saving = true;
            this.ajax
                .post("/api/v1/adam/adminMenu/saveUserMenu", {
                    menuIds: this.$refs.tree.getCheckedKeys().join(","),
                    roleId: this.roleId,
                })
                .then((r) => {
                    this.saving = false;
                    this.$message.success("保存成功");
                });
        },
    },
};
</script>

<style lang="less" scoped>
.roleErp {
    width: 100%;
    height: 700px;
    .box {
        width: 100%;
        height: 600px;
        overflow: auto;
    }
    .btn {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
    }
}
</style>
