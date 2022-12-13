<template>
    <div class="IndexMenu">
        <div class="item" v-for="(item, index) in menu" :key="index">
            <div class="itemTitle" @click="itemTitleClick(index)">
                <span class="itemTitleIcon">
                    <i :class="`erp ${item.icon}`"></i>
                </span>
                <span class="itemTitleContent">
                    <span :class="item.son.length == 0 && activeMenuIndex == index ? 'active' : ''">{{
                        item.title
                    }}</span>
                    <i
                        v-if="item.son.length > 0"
                        :class="item.show ? `erp erp31xiala activeIcon` : `erp erp31xiala`"
                    ></i>
                </span>
            </div>
            <el-collapse-transition>
                <div class="itemSons" v-show="item.show">
                    <template v-for="(itemSon, indexSon) in item.son" :key="indexSon">
                        <p
                            @click="itemSonClick(index, indexSon)"
                            :class="activeMenuIndex == index && activeMenuIndexSon == indexSon ? 'active' : ''"
                            v-if="itemSon.show"
                        >
                            {{ itemSon.title }}
                        </p>
                    </template>
                </div>
            </el-collapse-transition>
        </div>
    </div>
</template>

<script>
import menu from "@/data/menu.js";
export default {
    name: "IndexMenu",
    data: function () {
        return {
            menu,
            activeMenuIndex: 0,
            activeMenuIndexSon: 0,
        };
    },
    mounted() {
        // 获取可见菜单列表
        this.ajax.post("/api/v1/adam/adminMenu/getUserMenusList").then((r) => {
            this.$store.commit("setPower", r.data);
            if (this.$store.state.power.parkList) {
                this.menu[0].son[0].show = true;
            }
            if (this.$store.state.power.taskList) {
                this.menu[0].son[1].show = true;
            }
            if (this.$store.state.power.materialsPurchaseList) {
                this.menu[0].son[2].show = true;
            }
            if (this.$store.state.power.materialsStockList) {
                this.menu[0].son[3].show = true;
            }
            if (this.$store.state.power.workOrderList) {
                this.menu[0].son[4].show = true;
            }
            if (this.$store.state.power.statistics) {
                this.menu[0].son[5].show = true;
            }
            if (this.$store.state.power.accountRole) {
                this.menu[1].son[0].show = true;
            }

            // 刷新时菜单高亮
            this.activeMenuIndex = sessionStorage.getItem("erp_menu_current_index") || 0;
            this.menu[this.activeMenuIndex].show = true;
            this.activeMenuIndexSon = sessionStorage.getItem("erp_menu_son_index") || 0;
        });
    },
    methods: {
        // 点击菜单标题，展开子菜单
        itemTitleClick(index) {
            let item = this.menu[index];

            if (item.son.length > 0) {
                // 如果当前有子菜单
                this.menu[index].show = !this.menu[index].show;
            } else {
                // 如果当前没有子菜单
                this.activeMenuIndex = index;
                this.activeMenuIndexSon = 0;
                this.$router.push(item.path);
                sessionStorage.setItem("erp_menu_current_index", index);
                sessionStorage.setItem("erp_menu_son_index", 0);
            }
        },
        // 点击子菜单选项
        itemSonClick(index, indexSon) {
            if (this.activeMenuIndex == index && this.activeMenuIndexSon == indexSon) {
                return;
            }

            // 菜单高亮
            this.activeMenuIndex = index;
            this.activeMenuIndexSon = indexSon;
            sessionStorage.setItem("erp_menu_current_index", index);
            sessionStorage.setItem("erp_menu_son_index", indexSon);

            // 跳转到指定路由
            let path = this.menu[index].son[indexSon].path;
            this.$router.push(path);
        },
    },
};
</script>

<style lang="less" scoped>
@import url("@/assets/css/global.less");
.IndexMenu {
    width: 160px;
    height: calc(100% - 70px);
    padding: 0 25px;
    position: absolute;
    top: 70px;
    left: 0;
    z-index: @indexMenuLayer;
    user-select: none;
    .item {
        width: 160px;
        margin-top: 10px;
        .itemTitle {
            width: 160px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #282828;
            cursor: pointer;
            font-size: 15px;
            i.erp31xiala {
                color: rgba(0, 0, 0, 0.25);
            }
            .itemTitleIcon {
                width: 20px;
                padding: 15px 0 5px 0;
                i {
                    font-size: 14px;
                }
            }
            .itemTitleContent {
                padding: 15px 0 5px 0;
                width: 135px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-top: 1px solid #e4e5e6;
                span.active {
                    color: #1890ff;
                }
                i {
                    transition: all 0.3s;
                }
                i.activeIcon {
                    display: inline-block;
                    transform: rotate(-180deg);
                }
            }
        }
        .itemSons {
            padding-left: 25px;
            p {
                padding: 10px 0;
                cursor: pointer;
            }
            p.active {
                color: #1890ff;
            }
        }
    }
    .item:first-child {
        .itemTitleContent {
            border: none;
        }
    }
}
</style>
